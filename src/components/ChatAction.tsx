import { Input } from '@/components/ui/input'
import { Mic, SendIcon, StopCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import RecordRTC from 'recordrtc'
import { motion } from 'framer-motion'
import { useChatStore } from '@/pages/conversation'
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/wav'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'

let rec: any = null
/** 调用open打开录音请求好录音权限* */
const recOpen = function (success: any) {
  // 一般在显示出录音按钮或相关的录音界面时进行此方法调用，后面用户点击开始录音时就能畅通无阻了
  rec = Recorder({
    // 本配置参数请参考下面的文档，有详细介绍
    type: 'wav',
    sampleRate: 16000,
    bitRate: 16, // mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
  })

  rec.open(
    function () {
      success && success()
    },
    function (msg: string, isUserNotAllow: any) {
      // 用户拒绝未授权或不支持
      console.log(`${isUserNotAllow ? 'UserNotAllow，' : ''}无法录音:${msg}`)
    }
  )
}

/** 开始录音* */
function recStart() {
  // 打开了录音后才能进行start、stop调用
  rec.start()
}
export function ChatAction() {
  const addMessage = useChatStore((state) => state.addMessage)
  const [inputText, setInputText] = useState('')

  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const recordRTCRef = useRef<RecordRTC | null>(null)
  const startRecording = async () => {
    const { default: RecordRTC } = await import('recordrtc')
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recordRTC = new RecordRTC(stream, { type: 'audio', mimeType: 'audio/wav' })
        recordRTC.startRecording()
        recordRTCRef.current = recordRTC // 保存 recordRTC 实例到 ref
        setRecording(true)
      })
      .catch((error) => {
        console.error('Failed to access microphone:', error)
      })
  }

  const stopRecording = () => {
    if (recordRTCRef.current) {
      recordRTCRef.current.stopRecording(() => {
        const audioBlob = recordRTCRef.current!.getBlob()
        const url = URL.createObjectURL(audioBlob)
        console.log('录音停止')
        setAudioURL(url)

        const formData = new FormData()

        formData.append('file', audioBlob)

        fetch('/api/gcp_speech_to_text', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((data) => {
            console.log('gcp_speech_to_text', data.response)
            setInputText(data.response)
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error)
          })
        // TODO clsoe
        recordRTCRef.current
      })
      recordRTCRef.current.stopRecording()
      setRecording(false)
    }
  }
  function recStop() {
    rec.stop(
      function (blob: any) {
        setRecording(false)
        rec.close() // 释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
        rec = null

        const formData = new FormData()

        formData.append('file', blob)

        fetch('/api/gcp_speech_to_text', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then((data) => {
            console.log('gcp_speech_to_text', data)
            setInputText(data.transcript)
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error)
          })
      },
      function (msg: string) {
        console.log(`录音失败:${msg}`)
        rec.close() // 可以通过stop方法的第3个参数来自动调用close
        rec = null
      }
    )
  }
  const handleButtonClick = () => {
    if (!recording) {
      recOpen(function () {
        recStart()
        setRecording(true)
      })
    } else {
      recStop()
    }
  }
  const handleSend = () => {
    if (inputText === '') return
    addMessage({
      role: 'user',
      content: inputText,
      value: 'Human',
    })
    setInputText('')
  }
  return (
    <div className="sticky bottom-0 left-0 z-10">
      <div className="flex items-center flex-none w-full gap-2 p-4 space-x-2 bg-white ">
        <div className="relative w-full">
          <Input
            placeholder="Message"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          ></Input>
          <Button
            onClick={handleButtonClick}
            size="icon"
            className="absolute translate-y-1/2 bg-transparent border-none right-2 bottom-1/2 text-slate-400"
          >
            {recording ? (
              <StopCircle width={24} height={24}></StopCircle>
            ) : (
              <Mic width={24} height={24}></Mic>
            )}
          </Button>
        </div>
        <Button disabled={inputText === ''} onClick={handleSend} variant={'outline'}>
          <SendIcon className="text-indigo-600" width={24} height={24}></SendIcon>
        </Button>
      </div>
      {recording && <RecordIng></RecordIng>}
    </div>
  )
}

function RecordIng() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="w-full text-center h-60"
      style={{
        background: 'linear-gradient(135deg, #0B3FF8 0%, #E43AA0 100%)',
      }}
    >
      <div className="pt-12 text-white">Transcribing real time conversation</div>
      <img
        className="m-auto text-center w-36 h-28"
        src="https://s3-alpha-sig.figma.com/img/7567/6b5f/ab48612435c70c1b97a3ef926cf97e69?Expires=1689552000&Signature=Dk8Or-U2lGThbQyzRbs7EEQmqV5FrK22izj16i3FMKaHKmHZJ8JBaM2fnEiJPdXYeIgXVSoCObP8llU4MHM1abWYEyHXqDDLdLh2aCzVM-UoNeozgMYJQFO0mn~MJgtK8fv0ygEfI8GST9e2DzRDCJvSSrJyenuZSRSt75aLArmrMGzDRc3JnoqBtGRY2O-wqxWKL~NjKAPxMJKT7CQbW4pqnUrtCvnv7H~wS-nNSXVx7VoCx-RuQWCmwr8g4JZ5vFfnUzD52UCoOmgoQ35kCrnrgowGFQIYZXyVks1qlzEJeg5WxwYy2jmFbGE5MMthQMV3Wo5IcA1O62bZLBLqwQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        alt=""
      />
    </motion.div>
  )
}

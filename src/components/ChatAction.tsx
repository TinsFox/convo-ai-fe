import { Input } from '@/components/ui/input'
import { Mic, SendIcon, StopCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import RecordRTC from 'recordrtc'
import { motion } from 'framer-motion'
import { useChatStore } from '@/pages/conversation'

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

  const handleButtonClick = () => {
    if (!recording) {
      startRecording()
    } else {
      stopRecording()
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

        {audioURL && (
          <audio
            controls
            src={audioURL}
            style={{
              display: 'none',
            }}
          />
        )}
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

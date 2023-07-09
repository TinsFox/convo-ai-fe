import { Input } from '@/components/ui/input'
import { Mic, SendIcon, StopCircle } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import RecordRTC from 'recordrtc'

export function ChatAction() {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const recordRTCRef = useRef<RecordRTC | null>(null)
  const startRecording = async () => {
    const { default: RecordRTC } = await import('recordrtc')
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recordRTC = new RecordRTC(stream, { type: 'audio' })
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
      })
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
  return (
    <div className="sticky bottom-0 left-0 z-10 flex items-center flex-none w-full gap-2 p-4 space-x-2 bg-white">
      <div className="relative w-full">
        <Input placeholder="Message"></Input>
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
      <SendIcon className="text-indigo-600" width={24} height={24}></SendIcon>
      {audioURL && (
        <div>
          <audio controls src={audioURL} />
        </div>
      )}
    </div>
  )
}

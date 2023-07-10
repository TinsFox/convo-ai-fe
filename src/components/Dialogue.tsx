import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Volume1 } from 'lucide-react'
import React, { useRef } from 'react'

interface IDialogueProps {
  role: 'Convo AI' | 'user'
  content: React.ReactNode
}

export function Dialogue({ role: user, content }: IDialogueProps) {
  let audioRef: HTMLAudioElement
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  const toVoice = () => {
    if (audioRef?.currentTime > 0) {
      audioRef.pause()
      audioRef.load()
      return
    }
    fetch(`/api/tts_path?text=${encodeURIComponent(content as string)}&absolute_path=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('AI返回结果', data)
        const audio = new Audio(data)
        audioRef = audio
        audio.play()
      })
      .catch((error) => console.error(error))
  }

  return (
    <motion.div className="mt-4" variants={itemVariants} initial="closed" animate="open">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-900" onClick={toVoice}>
        {user}
        <Volume1 className="inline-block" width={15} height={15}></Volume1>
      </div>
      <div
        className={clsx('p-3 rounded-md text-left text-sm', {
          'bg-blue-500 text-slate-50': user === 'user',
          'bg-slate-100 text-slate-500': user === 'Convo AI',
        })}
      >
        {content}
      </div>
    </motion.div>
  )
}

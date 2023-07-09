import { Header } from '@/components/Header'
import clsx from 'clsx'
import React from 'react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { motion, Variants } from 'framer-motion'

const ChatAction = dynamic(async () => (await import('@/components/ChatAction')).ChatAction, {
  loading: () => <div>loading...</div>,
})

const mockData: IDialogueProps[] = [
  {
    role: 'Convo AI',
    content: 'Hi! How can we assist you today?',
  },
  {
    role: 'user',
    content: 'I have a phone call I need assistance with',
  },
  {
    role: 'Convo AI',
    content:
      "Sure, I'm here to help! Please provide me with the necessary details about the call, such as the contact's name, purpose of the call, and any specific requirements.",
  },
  {
    role: 'user',
    content:
      'I need to follow up with a client at work for updates. I emailed him three days ago and am still waiting for response. I need the files by the end of this week.',
  },
  {
    role: 'Convo AI',
    content:
      "Absolutely! Here's a dialogue script for your phone call:Phone Call Dialogue:You: Hey [Client's Name], how's it going? I wanted to touch base with you about the email I sent a few days ago. Have you had a chance to check it out and see if there are any updates or info you need from my end?Client: Hey [Your Name]! Sorry for the delay. I've been caught up with other projects. I'll try my best to get you the files by the end of this week, but it might be tight. Is there any chance we can extend the deadline by a day or two?You: No problem at all, [Client's Name]! I totally understand how things can get busy. Thanks for the update. While the original deadline is tight, I can see if we can manage a slight extension. Let me check with the team and see if it's feasible. I'll get back to you shortly. In the meantime, if there's any way you can expedite the process, that would be fantastic. Just keep me posted on your progress. Thanks for your understanding!Remember to adjust the dialogue to match your personal communication style and relationship with the client. This format allows for a more conversational interaction during your phone call.",
  },
]

export default function Conversation() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen overscroll-none">
        <Header></Header>
        <div className="flex-grow">
          <div className="p-4">
            {mockData.map((item, index) => {
              return <Dialogue key={index} role={item.role} content={item.content}></Dialogue>
            })}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Regenerate response</Button>
            <Button variant="outline" className="mt-2">
              I’m ready! Turn on Convo Assist
            </Button>
          </div>
        </div>
        <ChatAction></ChatAction>
      </div>
    </>
  )
}

interface IDialogueProps {
  role: 'Convo AI' | 'user'
  content: React.ReactNode
}

function Dialogue({ role: user, content }: IDialogueProps) {
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  return (
    <motion.div className="mt-4" variants={itemVariants} initial="closed" animate="open">
      <div className="text-sm font-medium text-slate-900">{user}</div>

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

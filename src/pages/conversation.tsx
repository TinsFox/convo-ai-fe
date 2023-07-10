import { Header } from '@/components/Header'

import React from 'react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Loader2 } from 'lucide-react'

const Dialogue = dynamic(async () => (await import('@/components/Dialogue')).Dialogue, {
  ssr: false,
})

const ChatAction = dynamic(async () => (await import('@/components/ChatAction')).ChatAction, {
  loading: () => <div>loading...</div>,
  ssr: false,
})
interface Message {
  role: 'Convo AI' | 'user'
  content: string
  value: 'Human' | 'Assistant'
}

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  fetchMessage: () => void
  fetching: boolean
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [
        {
          role: 'Convo AI',
          content: 'Welcome to the chat!',
          value: 'Assistant',
        },
      ] as Message[],
      fetching: false,
      addMessage: (message) => {
        set((state) => ({ ...state, messages: [...state.messages, message] }))
        get().fetchMessage()
      },
      fetchMessage: async () => {
        set((state) => ({ ...state, fetching: true }))
        const contextArray = get().messages
        let result = ''
        contextArray.forEach((item) => {
          if (item.role === 'Convo AI') {
            result += `Assistant: ${item.content}\\n`
          } else if (item.role === 'user') {
            result += `Human: ${item.content}\\n`
          }
        })
        console.log('上下文', contextArray)
        console.log('参数', result)
        fetch(`/api/chat?human_msg=${encodeURIComponent(result)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('AI返回结果', data.response)
            fetch(
              `/api/tts_path?text=${encodeURIComponent(
                data.response as string
              )}&absolute_path=true`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log('AI返回结果', data)
                const audio = new Audio(data)
                audio.play()
              })
              .catch((error) => console.error(error))

            set((state) => ({
              messages: [
                ...state.messages,
                {
                  role: 'Convo AI',
                  content: data.response,
                  value: 'Assistant',
                },
              ],
              fetching: false,
            }))
          })
          .catch((error) => console.error(error))
      },
    }),
    {
      name: 'convo-ai',
      getStorage: () => localStorage,
    }
  )
)

export default function Conversation() {
  const messages = useChatStore((state) => state.messages)
  const fetchMessage = useChatStore((state) => state.fetchMessage)
  const addMessage = useChatStore((state) => state.addMessage)
  const fetching = useChatStore((state) => state.fetching)
  console.log('fetching', fetching)

  return (
    <div className="relative flex flex-col min-h-screen overscroll-none">
      <Header></Header>
      <div className="flex-grow">
        {messages.length > 0 && (
          <div className="p-4">
            {messages.map((item, index) => {
              return <Dialogue key={index} role={item.role} content={item.content}></Dialogue>
            })}
          </div>
        )}
        {fetching ? (
          <div className="flex flex-col items-center mt-6 text-center md:flex-row md:justify-evenly md:flex-wrap">
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-6 text-center md:flex-row md:justify-evenly md:flex-wrap">
            <Button variant="outline" onClick={fetchMessage}>
              Regenerate response
            </Button>
            <Button
              variant="outline"
              className="mt-4 md:mt-0"
              onClick={() => {
                addMessage({
                  role: 'user',
                  content:
                    "summarize the above conversation and show me the bullet points, results are returned in Markdown format.Just tell me the result, don't reply to others",
                  value: 'Human',
                })
              }}
            >
              Summary
            </Button>
          </div>
        )}
      </div>
      <ChatAction></ChatAction>
    </div>
  )
}

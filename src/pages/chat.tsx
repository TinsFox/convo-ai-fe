import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Message {
  role: string
  content: string
}

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [
        {
          role: 'Convo AI',
          content: 'Welcome to the chat!',
        },
      ] as Message[],
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    }),
    {
      name: 'chat-storage',
      getStorage: () => localStorage,
    }
  )
)

const ChatWindow = () => {
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)
  const [inputText, setInputText] = useState('')

  const handleUserInput = () => {
    if (inputText.trim() !== '') {
      const userMessage: Message = { role: 'user', content: inputText }
      addMessage(userMessage)
      setInputText('')
      const randomResponse = getRandomResponse()
      setTimeout(() => {
        addMessage(randomResponse)
      }, 1000)
    }
  }

  const getRandomResponse = () => {
    const responses = ['Hello!', 'How are you?', 'Nice to meet you!']
    const randomIndex = Math.floor(Math.random() * responses.length)
    return { sender: 'bot', content: responses[randomIndex] }
  }

  useEffect(() => {
    // 欢迎语作为初始消息添加到聊天记录中
    if (messages.length === 0) {
      const welcomeMessage: Message = { role: 'bot', content: 'Welcome to the chat!' }
      addMessage(welcomeMessage)
    }
  }, [messages])
  return (
    <div className="container py-10 mx-auto">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="h-64 mb-4 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${message.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}
            >
              <span className="font-bold">{message.role}: </span>
              {message.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
          />
          <button className="px-4 py-2 text-white bg-blue-500 rounded-r" onClick={handleUserInput}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow

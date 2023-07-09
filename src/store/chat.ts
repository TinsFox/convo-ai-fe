import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Message {
  sender: 'user' | 'bot'
  content: string
}

// 定义 ChatStore 类型
interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  // 添加其他方法和操作函数
  // ...
}
export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    }),
    {
      name: 'chat-storage',
      getStorage: () => localStorage,
    }
  )
)

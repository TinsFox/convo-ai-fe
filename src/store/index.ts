import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 定义 Message 类型
interface Message {
  sender: 'user' | 'bot'
  content: string
}

// 定义 Session 类型
interface Session {
  id: number
  messages: Message[]
}

// 定义 ChatStore 类型
interface ChatStore {
  sessions: Session[]
  currentSessionIndex: number
  globalId: number
  addMessage: (message: Message) => void
  // 添加其他方法和操作函数
  // ...
}

// 创建空的 Session
const createEmptySession = (): Session => ({
  id: 0,
  messages: [],
})

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [createEmptySession()],
      currentSessionIndex: 0,
      globalId: 0,

      addMessage: (message) => {
        const currentSessionIndex = get().currentSessionIndex
        set((state) => {
          const session = state.sessions[currentSessionIndex]
          session.messages.push(message)
          return {
            sessions: [...state.sessions],
          }
        })
      },
    }),
    {
      name: 'chat-storage',
      getStorage: () => localStorage,
    }
  )
)

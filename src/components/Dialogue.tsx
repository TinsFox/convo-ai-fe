import clsx from 'clsx'
import { motion } from 'framer-motion'

interface IDialogueProps {
  role: 'Convo AI' | 'user'
  content: React.ReactNode
}

export function Dialogue({ role: user, content }: IDialogueProps) {
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

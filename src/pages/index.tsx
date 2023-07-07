import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, CalendarClock, PlusCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <h1 className="mt-[72px] text-center text-5xl font-extrabold tracking-tight text-transparent scroll-m-20 lg:text-5xl bg-gradient-to-r from-[#0B3FF8] to-[#E43AA0] bg-clip-text">
        Convo AI
      </h1>
      <Card className="w-[276px] m-auto text-center bg-blue-50 mt-[124px]">
        <CardHeader className="pt-[17px] pb-[6px]">
          <CardTitle className="text-center">
            <PlusCircle
              className="inline-block text-5xl text-slate-900"
              width={40}
              height={40}
            />
          </CardTitle>
          <CardDescription className="text-slate-900 text-base font-medium	">
            New Convo
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-500 text-left mt-[6px] text-sm">
          AI-generate responses, prompts, or suggestions, and summarize key
          points and action items to facilitate conversation
        </CardContent>
      </Card>

      <Card className="w-[276px] m-auto text-center bg-purple-50 mt-8">
        <CardHeader className="pt-[17px] pb-[6px]">
          <CardTitle className="text-center">
            <CalendarClock
              className="inline-block text-5xl text-slate-900"
              width={40}
              height={40}
            />
          </CardTitle>
          <CardDescription className="text-slate-900 text-base font-medium	">
            History
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-500 text-left mt-[6px] text-sm">
          Access to history and summaries of conversations.
        </CardContent>
      </Card>
    </main>
  )
}

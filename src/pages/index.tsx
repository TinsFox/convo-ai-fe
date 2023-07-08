import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarClock, PlusCircle } from 'lucide-react'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={`${inter.className} relative flex flex-col min-h-screen overscroll-none`}>
      <Header></Header>
      <Link href={'/conversation'}>
        <Card className="w-[276px] m-auto text-center bg-blue-50 mt-[124px] h-[226px]">
          <CardHeader className="pt-[17px] pb-[6px]">
            <CardTitle className="text-center">
              <PlusCircle className="inline-block text-5xl text-slate-900" width={40} height={40} />
            </CardTitle>
            <CardDescription className="text-base font-medium text-slate-900">
              New Convo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-500 text-left mt-[6px] text-sm">
            AI-generate responses, prompts, or suggestions, and summarize key points and action
            items to facilitate conversation
          </CardContent>
        </Card>
      </Link>

      <Card className="w-[276px] m-auto text-center bg-purple-50 mt-8 h-[226px]">
        <CardHeader className="pt-[17px] pb-[6px]">
          <CardTitle className="text-center">
            <CalendarClock
              className="inline-block text-5xl text-slate-900"
              width={40}
              height={40}
            />
          </CardTitle>
          <CardDescription className="text-base font-medium text-slate-900 ">
            History
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-500 text-left mt-[6px] text-sm">
          Access to history and summaries of conversations.
        </CardContent>
      </Card>
    </div>
  )
}

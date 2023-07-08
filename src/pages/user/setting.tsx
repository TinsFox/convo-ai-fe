import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Ear, Mail, Mic, PlusSquare, Volume1, Waves } from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
})
export default function Setting() {
  const [email, setEmail] = useState('ai@convo.com')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="min-h-full bg-slate-50">
      <h4 className="pt-[58px] text-xl font-semibold tracking-tight text-center scroll-m-20">
        Settings
      </h4>
      <Form {...form}>
        <form className="mt-12" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label className="ml-[18px] text-slate-500">ACCOUNT</Label>
            <div className="flex items-center mt-2 bg-white">
              <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                <Mail width={16} height={16}></Mail>
                <Label className="ml-2">Email</Label>
              </div>
              <Input
                className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <Separator></Separator>
            <div className="flex items-center bg-white ">
              <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                <PlusSquare width={16} height={16}></PlusSquare>
                <Label className="ml-2">Subscription</Label>
              </div>
              <Input
                className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                disabled
                placeholder="Free"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className="mt-8">
            <Label className="ml-[18px] text-slate-500">SPEECH</Label>
            <div className="flex items-center mt-2 bg-white border-b">
              <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                <Mic width={16} height={16}></Mic>
                <Label className="ml-2">Language</Label>
              </div>
              <Select>
                <SelectTrigger className="w-32 ml-2 border-none">
                  <SelectValue placeholder="Auto-Detect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Auto-Detect</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8">
            <Label className="ml-[18px] text-slate-500">VOICE</Label>
            <Accordion type="multiple" className="w-full mt-2 bg-white">
              <AccordionItem value="item-1">
                <AccordionTrigger className="mr-[18px]">
                  <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Waves width={16} height={16}></Waves>
                    <Label className="ml-2">Speed</Label>
                  </div>
                  <Input
                    className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    defaultValue="card"
                    className="grid grid-cols-6 gap-0 px-2 mx-8 my-2 border-2 rounded-md"
                  >
                    <Label
                      htmlFor="paypal"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                      0.5
                    </Label>
                    <Label
                      htmlFor="paypal"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                      0.75
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="apple" id="apple" className="sr-only" />
                      1.0
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="apple" id="apple" className="sr-only" />
                      1.25
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="apple" id="apple" className="sr-only" />
                      1.5
                    </Label>
                    <Label
                      htmlFor="apple"
                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="apple" id="apple" className="sr-only" />
                      2.0
                    </Label>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger className="mr-[18px]">
                  <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Ear width={16} height={16}></Ear>
                    <Label className="ml-2">Pitch</Label>
                  </div>
                  <Input
                    className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                    disabled
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <Slider defaultValue={[33]} max={100} step={1} className="px-3 my-2" />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1123">
                <AccordionTrigger className="mr-[18px]">
                  <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Volume1 width={16} height={16}></Volume1>
                    <Label className="ml-2">Volume</Label>
                  </div>
                  <Input
                    className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                    disabled
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <Slider defaultValue={[33]} max={100} step={1} className="px-4 my-2" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </form>
      </Form>
    </div>
  )
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Ear, Mail, Mic, PlusSquare, Volume1, Waves } from 'lucide-react'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  subscription: z.string().min(2).max(50),
  language: z.string().min(2).max(50),
  speed: z.string().min(2).max(50),
})
export default function Setting() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'ai@convo.com',
      subscription: 'Free',
      language: 'English',
      speed: '1.25',
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center mt-2 bg-white">
                  <FormLabel className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Mail width={16} height={16}></Mail>
                    <Label className="ml-2">Email</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator></Separator>

            <FormField
              control={form.control}
              name="subscription"
              render={({ field }) => (
                <FormItem className="flex items-center bg-white">
                  <FormLabel className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <PlusSquare width={16} height={16}></PlusSquare>
                    <Label className="ml-2">Subscription</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                      disabled
                      placeholder="Free"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Label className="ml-[18px] text-slate-500">SPEECH</Label>

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex items-center bg-white">
                  <FormLabel className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Mic width={16} height={16}></Mic>
                    <Label className="ml-2">Language</Label>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-32 ml-2 border-none">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">Auto-Detect</SelectItem>
                      <SelectItem value="zh-CN">zh-CN</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    disabled
                    value={form.watch('speed')}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="speed"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl className="p-0">
                          <RadioGroup
                            className="grid grid-cols-7 gap-0 px-2 mx-8 my-2 border-2 rounded-md"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormItem className="flex items-center space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="0.5" className="sr-only" />
                                  0.5
                                </Label>
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="0.75" className="sr-only" />
                                  0.75
                                </Label>
                              </FormControl>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="1" className="sr-only" />1
                                </Label>
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="1.25" />
                                  1.25
                                </Label>
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="1.5" className="sr-only" />
                                  1.5
                                </Label>
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="1.75" className="sr-only" />
                                  1.75
                                </Label>
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Label className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm">
                                  <RadioGroupItem value="2" className="sr-only" />2
                                </Label>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* <AccordionItem value="item-1">
                <AccordionTrigger className="mr-[18px]">
                  <div className="flex items-center flex-1 w-1/3 h-12 ml-4">
                    <Waves width={16} height={16}></Waves>
                    <Label className="ml-2">Speed</Label>
                  </div>
                  <Input
                    className="w-2/3 ml-2 text-right border-none focus-visible:outline-none focus-visible:ring-0"
                    type="email"
                    placeholder="Enter your email"
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    defaultValue="card"
                    className="grid grid-cols-6 gap-0 px-2 mx-8 my-2 border-2 rounded-md"
                  >
                    <Label

                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="paypal"  className="sr-only" />
                      0.5
                    </Label>
                    <Label

                      className="border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary text-slate-900 font-medium text-sm"
                    >
                      <RadioGroupItem value="paypal"  className="sr-only" />
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
              </AccordionItem> */}

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

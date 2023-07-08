import Link from 'next/link'
import { LifeBuoy, LogOut, Settings, User2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <header className="sticky pt-[72px] top-0 transition-colors duration-500 bg-white pb-9 supports-backdrop-blur:bg-white/95 backdrop-blur text-center">
      <Link
        href={'/'}
        className="text-center text-5xl font-extrabold tracking-tight text-transparent scroll-m-20 lg:text-5xl bg-gradient-to-r from-[#0B3FF8] to-[#E43AA0] bg-clip-text"
      >
        Convo AI
      </Link>
      <DropdownSettingMenu className="absolute top-[30px] right-6 bg-blue-50 w-10 h-10 rounded shadow-lg"></DropdownSettingMenu>
    </header>
  )
}
interface DropdownSettingMenuProps {
  className?: string
}
const logout = () => {}
export function DropdownSettingMenu({ className }: DropdownSettingMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline" size={'icon'}>
          <User2 width={20} height={20}></User2>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/user/setting'}>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={'/support'}>
          <DropdownMenuItem>
            <LifeBuoy className="w-4 h-4 mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

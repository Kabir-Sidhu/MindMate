'use client'

import * as React from 'react'
import { Bell, ChevronDown, LogOut, Menu, MessageSquare, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

interface HeaderProps {
  username: string
}

export function Header({ username }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  const handleMenuToggle = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const account = useAccount();
  const {disconnect} = useDisconnect();
  const { connectors, connect, status, error } = useConnect()

  return (
    <header className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleMenuToggle}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">MindMate</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {account.isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={account.address} />
                  <AvatarFallback>{account.address ? account.address.substring(0, 2) : 'A'}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-700">{account.address?.substring(0, 6)}...{account.address?.substring(account.address.length - 4)}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => disconnect()}>
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => connect({ connector: metaMask() })}>Connect Wallet</Button>
        )}
      </div>
    </header>
  )
}
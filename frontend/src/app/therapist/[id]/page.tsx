'use client'

import * as React from 'react'
import { Bell, ChevronDown, LogOut, Menu, MessageSquare, Plus, Search, Send, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/Header'

interface Message {
  user: string
  message: string
}

export default function Component() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const username = 'Tarush'
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  async function sendMessage() {
    if (input.trim() !== '') {
      const message: Message = {
        user: username,
        message: input.trim(),
      }

      setMessages((prevMessages) => [...prevMessages, message])
      setInput('')

      try {
        const response = await fetch('http://localhost:5000/api/therapist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: message.user,
            prompt: message.message,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        const data = await response.json()
        console.log(data)

        const botMessage: Message = {
          user: 'Dr. KSS',
          message: data.response,
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])

        console.log('Message sent successfully:', data)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header username="0xabc"></Header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-64 bg-white p-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-4">
            <Button 
                className="w-full justify-start space-x-2" 
                variant="outline" 
                onClick={() => window.location.reload()}
            >
                <Plus className="h-4 w-4" />
                <span>New Chat</span>
            </Button>
        </div>
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search conversations..."
              className="h-9"
            />
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              All conversations
            </Button>
          </nav>
        </aside>
        <Separator orientation="vertical" />
        <main className={`flex flex-1 flex-col bg-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}>
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-gray-500">No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <Card
                  key={index}
                  className={`mb-4 max-w-[80%] ${
                    message.user === 'Dr. KSS' ? 'mr-auto bg-blue-50' : 'ml-auto bg-green-50'
                  }`}
                >
                  <CardContent className="flex items-start space-x-2 p-3">
                    <Avatar className="h-8 w-8">
                      {message.user === 'Dr. KSS' ? (
                        <AvatarImage src="/chatbot.png" alt="Chatbot Avatar" />
                      ) : (
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{message.user}</p>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </ScrollArea>
          <div className="border-t bg-white p-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon" className="bg-blue-600 text-white hover:bg-blue-700">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
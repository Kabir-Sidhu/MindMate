'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { Header } from '@/components/Header'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="h-screen">
      <Header username="0xabc">
      </Header>
      
    {/* <header className="p-5 flex items-center justify-between bg-gradient-to-r from-[#f4978e] to-[#f08080]">
     <div>Logo</div>
     <section className="flex space-x-5">
       <Link href={"/chat"}>Chat</Link>
       <Link href={"/therapist"}>Therapists</Link>
       <li>Wellness Tasks</li>
       <li>Community</li>
     </section>
     <section>
       {status === "success" ? (
        <div>
          <p>{account?.address}</p>
          <Button onClick={()=>{disconnect()}}>Disconnect</Button>
        </div>
       ) : (<></>)}
     </section>
    </header> */}
    <section className='h-max'>
       {status === "success" ? (
        <div>
          <p>{account?.address}</p>
          <Button onClick={()=>{disconnect()}}>Disconnect</Button>
        </div>
       ) : (<></>)}
     </section>
      <main className='flex flex-col items-center justify-center'>
        {account.isConnected ? (<div className="flex flex-col md:flex-row justify-around items-start p-8 space-y-6 md:space-y-0">
        {/* Chatbot Section */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Chatbot</h2>
          <p className="text-gray-600 mb-4">
            Chat with our friendly AI to get help and resources instantly.
          </p>
          <Link href={"/chat"}><button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg">
            Start Chatting
          </button></Link>
        </div>

        {/* Therapist Section */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-lg font-bold text-blue-600 mb-4">Therapist</h2>
          <p className="text-gray-600 mb-4">
            Explore our network of therapists and schedule an appointment.
          </p>
          <Link href={"/therapist"}><button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg">
            Find a Therapist
          </button></Link>
        </div>
      </div>
) : (
          <div>
            <h1 className="text-2xl font-semibold m-20">Please Connect your wallet to continue</h1>
          </div>
        )}
      </main>
   </div>
  )
}

export default App

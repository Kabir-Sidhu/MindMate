"use client"

import { Button } from "@/components/ui/button";
import { therapistsAbi } from "@/generated";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { metaMask } from "wagmi/connectors";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header"

export default function Therapist(){
  const [ads, setAds] = useState<any>([]);
  const account = useAccount()
  const { connectors, connect, status } = useConnect()
  const { disconnect } = useDisconnect(); 
 
    const { data, isLoading, isError, error} = useReadContract({
      abi: therapistsAbi,
      address: `0x66b961Cd58550048efC75830c78Ae5507a6785A4`,
      functionName: "getAds",
    });

    if(isLoading) return <div className="flex flex-col items-center justify-center"> <CircularProgress /></div>

    if(isError) return <p>There has been an error with the app: {error.message}</p>
    return(
      <>
        <Header username="0xabc"></Header>
        <div className="m-5 font-2xl font-bold">Therapists</div>
        {/* <header className="p-5 flex items-center justify-between bg-[#8dc8e5]">
          <div>
            <Image src={"/WhatsApp Image 2024-11-15 at 23.36.15_9469d949.jpg"} alt="MindMate" width={150} height={150}/>
          </div>
          <section>
            {account.isConnected ? (
             <div>
               <p>{account?.address}</p>
               <Button onClick={()=>{disconnect()}}>Disconnect</Button>
             </div>
            ) : (<></>)}
          </section>
        </header> */}
        {account.isConnected ? (<Link href={`/therapist/${data?.[0]}/payment?amount=${data?.[3]}&name=${data?.[1]}&desc=${data?.[2]}`} className="flex space-x-5 p-5 items-center border-t border-b border-black">
          
         <Avatar />
      <div className="flex flex-col">
      <div>
       <h1 className="font-bold">{data?.[1]}</h1>
       <p className=" text-gray-600">{data?.[0]}</p>
       </div>
         <p>{data?.[2]}</p>
      </div>
        </Link>) : (<Button onClick={()=>{connect({connector: metaMask()})}}>Connect Wallet</Button>)}
      </>
    );
}
"use client"
import { Button } from "@/components/ui/button";
import { therapistsAbi } from "@/generated";
import Image from "next/image"
import { useAccount, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Avatar } from "@mui/material";
import { Header } from "@/components/Header"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Payment(){

    const account = useAccount();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {disconnect} = useDisconnect();
    const {writeContract, data: hash} = useWriteContract();
    const segment = usePathname();
    const searchParams = useSearchParams();
    console.log(segment.split("/")[2].slice(2));
    const waitForTransaction = useWaitForTransactionReceipt({
      hash,
      
    })

   useEffect(()=>{
    if(hash && waitForTransaction.isSuccess){
      router.push(`/therapist/${segment.split("/")[2]}`);
    }else if(waitForTransaction.isError){
      setLoading(false);
    }
   },[hash, waitForTransaction.isSuccess, waitForTransaction.isError, segment]);

    function pay(){
     writeContract({
            abi: therapistsAbi,
            address: "0x66b961Cd58550048efC75830c78Ae5507a6785A4",
            functionName: "bookTherapist",
            args: [
                `0x${segment.split("/")[2].slice(2)}`
            ],
            value: BigInt(searchParams.get("amount") as string)
        });
      setLoading(true);
    }
    return(
       <div>
        <Header username={segment.split("/")[2]}></Header>
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
        <main className="flex items-center flex-col justify-center p-10 space-y-5">
            <Avatar sx={{height: "30vh", width: "14vw"}}/>
            <h1 className="font-bold font-2xl">{searchParams.get("name")}</h1>
            <h1 className="text-gray-500">{segment.split("/")[2]}</h1>
            <h1>{searchParams.get("desc")}</h1>
            <div className="flex items-center space-x-5">
            <h1 className="font-bold">Fee: {Number(searchParams.get("amount") ?? 0) / (10 ** 8)} POL</h1>
            {loading ? <Button className="disabled"><Loader2 className="animate-spin"/>Loading</Button> : <Button onClick={()=>{pay()}}>Pay Now and Chat</Button>}
            </div>
        </main>
       </div>

    )
}
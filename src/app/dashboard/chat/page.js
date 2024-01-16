'use client'
import React from 'react'
import PromptChatView from '../../ui/prompt/PromptChatView'
import { useSearchParams } from 'next/navigation'

export default function page() {
    let searchParams = useSearchParams()
    let d = localStorage.getItem("CURRENTCHAT")
    console.log("Data is chat view is ")
   
    let data = JSON.parse(d)
    console.log(data) // Logs "search"
    // localStorage.setItem("CURRENTCHAT", null)
  return (
    <div className='h-full  overflow-none' style={{height: '100%'}}>
      {
        data && (
            <PromptChatView chatViewVisible={data.chatViewVisible} newChat={data.newChat} chat={data.chat} prompt={data.prompt} />
        )
      }
    </div>
  )
}

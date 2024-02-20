'use client'
import React from 'react'
import PromptChatView from '../../ui/prompt/PromptChatView'
// import { useSearchParams } from 'next/navigation'

export default function Page() {
  // let searchParams = useSearchParams()
  let data = null
  if (typeof localStorage !== 'undefined') {
    let d = localStorage.getItem("CURRENTCHAT")
    console.log("Data is chat view is ")

    data = JSON.parse(d)
    console.log(data) // Logs "search"
  }
  // localStorage.setItem("CURRENTCHAT", null)
  return (
    <div className='h-full  overflow-none' style={{ height: '100%' }}>
      {
        data && (
          <PromptChatView chatViewVisible={data.chatViewVisible} newChat={data.newChat} chat={data.chat} prompt={data.prompt} />
        )
      }
    </div>
  )
}

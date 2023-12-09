import React, {useState} from 'react'
import Image from 'next/image'


const artIcon = "/art.png";

const PromptChatView = (props) => {

    const [messages, setMessages] = useState([{id: 1, message: "Hello", from: "me"}, {id: 2, message: "Hi", from: "gpt"},
    {id: 3, message: "When completing an action (eg posting) a nice banner at top of screen pops up. that's great. but it stays up too long - 3 seconds or so? it often obscures an important part of the screen to nav and you have to wait what feels like a long time for it to go away. this banner shold be 1 second long and then fade ", from: "me"},  {id: 4, message: "When completing an action (eg posting) a nice banner at top of screen pops up. that's great. but it stays up too long - 3 seconds or so? it often obscures an important part of the screen to nav and you have to wait what feels like a long time for it to go away. this banner shold be 1 second long and then fade ", from: "gpt"},
    {id: 5, message: "place holder image appearing when viewing others profiles even if they have a background image", from: "me"},  {id: 6, message: "Hi", from: "gpt"},
    {id: 7, message: "check if there have been any crashes in testflight", from: "me"},  {id: 8, message: "Hi", from: "gpt"},
    {id: 9, message: "check if there have been any crashes in testflight", from: "me"},  {id: 10, message: "When completing an action (eg posting) a nice banner at top of screen pops up. that's great. but it stays up too long - 3 seconds or so? it often obscures an important part of the screen to nav and you have to wait what feels like a long time for it to go away. this banner shold be 1 second long and then fade ", from: "gpt"},
    {id: 11, message: "check if there have been any crashes in testflight", from: "me"}, {id: 12, message: "Hi", from: "gpt"},
    {id: 13, message: "check if there have been any crashes in testflight", from: "me"}, {id: 14, message: "Hi", from: "gpt"},
    {id: 15, message: "check if there have been any crashes in testflight", from: "me"}, {id: 16, message: "Hi", from: "gpt"},
    {id: 17, message: "check if there have been any crashes in testflight", from: "me"}, {id: 18, message: "When completing an action (eg posting) a nice banner at top of screen pops up. that's great. but it stays up too long - 3 seconds or so? it often obscures an important part of the screen to nav and you have to wait what feels like a long time for it to go away. this banner shold be 1 second long and then fade ", from: "gpt"},
    {id: 19, message: "Hello", from: "me"}, {id: 20, message: "Hi", from: "gpt"},
    {id: 21, message: "check if there have been any crashes in testflight", from: "me"}, {id: 22, message: "Hi", from: "gpt"},
    {id: 23, message: "check if there have been any crashes in testflight", from: "me"}, {id: 24, message: "Hi", from: "gpt"},
    {id: 25, message: "check if there have been any crashes in testflight", from: "me"}, {id: 26, message: "Hi", from: "gpt"}])

  return (
    <div className='relative'>
          <div className={`chat-popup ${props.chatViewVisible ? '' : 'hidden'} flex flex-col fixed bottom-0 sm:right-10 right-20 w-full sm:w-4/6 md:w-3/6 lg:w-3/12 xl:w-3/12 z-9 rounded-lg py-4 shadow-lg`} style={{height: '85vh', backgroundColor: '#3f4048'}}>

            <div className="flex flex-col w-full items-center overflow-y-auto mb-10">
                {
                    messages.map((item, index) => {
                        
                            {
                                return(
                                    
                                        <div key={index} className={`flex w-full my-1   ${item.from == "me" ? "justify-center " : "justify-left"}`}>
                                            {
                                                item.from === "me" ?(
                                                    <div className={`flex mx-1 p-4 w-10/12 my-1  rounded-lg border-2 border-white`} key={item.id}>
                                                        <p className='text-white'>{item.message}</p>
                                                    </div>
                                                ):
                                                (
                                                    <IncomingMessage message={item} />
                                                )
                                            }
                                        </div>
                                    
                                )
                            }    
                            
                        
                    })
                }
            </div>

            
            <div className="flex-none bg-gray-300 absolute bottom-0 w-full">
                <textarea type="text" className="w-11/12 border text-black p-2 rounded" placeholder="Type here..." />
            </div>
          </div>
        </div>
  )
}

export default PromptChatView



const IncomingMessage = ({message}) => {

    return(
        <div className={`flex-col w-full my-1 justify-center items-center p-2 bg-appgreen`}>
            <div className={`flex-col mx-1 p-2 w-11/12 my-1`} key={message.id}>
                <div style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                    <Image className=' rounded-full' src={artIcon}
                      objectFit="cover"
                      width="40"
                      height="40"
                    >
                    </Image>
                </div>
                <div className='flex mt-3 ps-3 py-3'>
                    <p className='text-white'>{message.message}</p>
                </div>
                
            </div>
            <div className='mb-3 w-11/12 rounded' style={{backgroundColor: 'white', height: '1px'}}></div>
        </div> 
    )
}
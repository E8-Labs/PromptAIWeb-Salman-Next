import React from 'react'
import styled from 'styled-components'
import moment from 'moment-timezone'
import Image from 'next/image'


const ViewItemIcon = '/viewsicon.svg'
const MessageIcon = '/commenticon.svg'
const LikePromptIcon = '/likeprompticon.png'

function PromptSearchItem(props) {
    const prompt = props.prompt;
    const userImage = ""
    return (

            <div className="flex flex-col h-62  bg-appgreen rounded p-4 cursor:pointer"  key={prompt.id} onClick={()=>{
                props.itemSelected(prompt)
            }}> 
                <div className="flex h-16 ">
                    <div className="">
                        <Image src={prompt.user.profile_image} alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }} />
                    </div>
                    <div className='flex-col ml-2'>
                        <p className="font-bold text-white">{prompt.user.username}</p>
                        <p className="text-sm text-gray-500">{moment(prompt.createdAt, "YYYYMMDD, HH:mm:ss").fromNow(true)} ago.</p>
                    </div>
                </div> {/* Specify the height and color for the top div */}
                <div className="flex-grow ">
                    <h3 className="text-lg text-appgreenlight font-bold mt-2">{prompt.title}</h3>
                    <p className="mt-2 overflow-hidden overflow-ellipsis line-clamp-5">{prompt.description}</p>
                </div> {/* This div will take up all the remaining space */}
                <div className=" flex h-16  justify-end">
                    <div className='flex  w-6/12'> </div>
                <div className=" h-16 flex mt-4  justify-between gap-20">
                    {/* Your icon components for Like, View, Comment go here */}
                    <div className="cardbtn justify-center align-items-center">
                        <img src={LikePromptIcon} alt="Like Icon" />
                        <button>29k</button>
                    </div>
                    <div className="cardbtn">
                        <img src={ViewItemIcon} alt="View Icon" />
                        <button>29k</button>
                    </div>
                    <div className="cardbtn">
                        <img src={MessageIcon} alt="Message Icon" />
                        <button>454</button>
                    </div>
                </div>
                </div> {/* Specify the height and color for the bottom div */}
            </div>
            
            

    )

}

// {/* <div className="flex ml-2 h-16">
//                 <div className="">
//                     <Image src={prompt.user.profile_image} alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }} />
//                 </div>
//                 <div className='flex-col ml-2'>
//                     <p className="font-bold">{prompt.user.username}</p>
//                     <p className="text-sm text-gray-500">3 min ago</p>
//                 </div>
//             </div>

//             <div className='  bg-red flex-grow'>
//                 {/* <div className='flex-col bg-green flex-grow'> */}
                    // <h3 className="text-lg font-bold mt-2">{prompt.title}</h3>
                    // <p className="mt-2 overflow-hidden overflow-ellipsis line-clamp-5">{prompt.description}</p>
//                 {/* </div> */}
//             </div>

//                 {/* Icons for Like, View, Comment */}
                // <div className=" h-16 flex mt-4  justify-between">
                //     {/* Your icon components for Like, View, Comment go here */}
                //     <div className="cardbtn justify-center align-items-center">
                //         <img src={LikePromptIcon} alt="Like Icon" />
                //         <button>29k</button>
                //     </div>
                //     <div className="cardbtn">
                //         <img src={ViewItemIcon} alt="View Icon" />
                //         <button>29k</button>
                //     </div>
                //     <div className="cardbtn">
                //         <img src={MessageIcon} alt="Message Icon" />
                //         <button>454</button>
                //     </div>
                // </div> */}

const Container = styled.div`
    height: 100%;
    // width: 100%;
    display: grid;
    grid-template-rows: 15% 75% 10%;
    // flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #FFFFFF10;
    border-radius: 0.8rem;
    .verticalspacingsmall{
        height: 0.3rem;
    }
    .horizontalspacingvsmall{
        width: 0.5rem;
    }
    h3{
        color: white;
    }
    .userdetails{
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        // padding-top: 0.5rem;
        // background-color: blue;
        vertical-align: middle;
        margin-top: 2rem;
        gap: 0.3rem;
        .detailsdiv{
            display: flex;
            flex-direction: column;
            .timelabel{
                font-size: 10px;
                font-weight: normal;
            }
        }
        img{
            width: 2rem;
            height: 2rem;
            border: 0.1rem solid white;
            border-radius: 1rem;
        }
    }
    .centerdiv{
        display: flex;
        flex-direction: column;
        // grid-template-rows: auto auto;
        word-wrap: break-word;
        justify-content: center;
        align-items: top;
        align-content: top;
        overflow: hidden;
        padding: 1rem;
        background-color: transparent;
        h4{
            
            color: #00C28C;
        }
        p{
            height:80px;
            line-height:20px; /* Height / no. of lines to display */
            overflow:hidden;
            cursor: pointer;
            word-wrap: break-word;
        }

        .cardbtn{
            
            // cursor: pointer;
            vertical-align: middle;
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: row;
            img{
                background-color: transparent;
                cursor: pointer;
            }
            
            button{

                // background-color: red;
                padding: 0.3rem;
                background-color: transparent;
                border: none;
                font-size: 0.8rem;
                cursor: pointer;
                color: red;
                text-align: left;
            }
        }
        
    }
    
    
        
    
`;

export default PromptSearchItem

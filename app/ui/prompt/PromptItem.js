import React from 'react'
import styled from 'styled-components'

import Image from 'next/image'


const ViewItemIcon = '/viewsicon.svg'
const MessageIcon = '/commenticon.svg'

function PromptItem(props) {
    const prompt = props.prompt;
    const userImage = ""
    return (
        <div key={prompt.id} className="bg-appgreen rounded p-4">
      {/* User Image */}
      <div className="relative">
        <Image src={prompt.user.profile_image} alt={""} className="rounded-full w-8 h-8 absolute top-0 left-0" width={40} height={40}  style={{borderRadius: 20}}/>
      </div>
      
      {/* User Info */}
      <div className="ml-10">
        <p className="font-bold">{prompt.user.username}</p>
        <p className="text-sm text-gray-500">3 min ago</p>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mt-2">{prompt.title}</h3>

      {/* Description */}
      <p className="mt-2 overflow-hidden overflow-ellipsis line-clamp-5">{prompt.prompt}</p>

      {/* Icons for Like, View, Comment */}
      <div className="flex mt-4 space-x-4">
        {/* Your icon components for Like, View, Comment go here */}
        <div className="cardbtn">
                <img src={ViewItemIcon}></img>
                <button>29k</button>
            </div>
            <div className="cardbtn">
                <img src={MessageIcon}></img>
                <button>454</button>
            </div>
      </div>
    </div>
      
  )
}

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
        
    }
    .lastdiv{
        display: grid;
        grid-template-columns: 33% 33% 33%;
        // background-color: blue;
        padding-left: 0.5rem;
        margin-bottom: 2rem;
        .cardbtn{
            
            // cursor: pointer;
            vertical-align: middle;
            justify-content: left;
            align-items: center;
            display: flex;
            img{
                background-color: transparent;
            }
            img{
                cursor: pointer;
            }
            button{

                // background-color: red;
                padding: 0.3rem;
                background-color: transparent;
                border: none;
                font-size: 0.8rem;
                cursor: pointer;
                color: white;
                text-align: left;
            }
        }
    }
`;

export default PromptItem

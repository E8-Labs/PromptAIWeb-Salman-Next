import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Icons from '@/app/lib/Icons';
import { Icon, IconButton, Snackbar, Backdrop, CircularProgress } from '@mui/material';
import Image from 'next/image'
// import { poppins, rubik } from '../../../app/'
import moment from 'moment-timezone';

const ViewItemIcon = '/viewsicon.svg'
const MessageIcon = '/commenticon.svg'
const LikePromptIcon = '/likeprompticon.png'
const SavePromptIcon = '/assets/saveprompticon.svg'
import TurnedInIcon from '@mui/icons-material/TurnedIn'; // Save Icon
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';

moment.tz.setDefault('Etc/UTC');

function PromptItem(props) {
    const prompt = props.prompt;

    const [snackBarOpen, setSnackbarOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const userImage = ""



    const handleClose = () => {
        setSnackbarOpen(false)
        setSnackMessage("")
    }

    const getSaveIcon = () => {
        // console.log("Prompt in prompt item view is ", prompt)
        if (!prompt.is_saved) {
            return <TurnedInNotOutlinedIcon style={{ color: 'white' }} />
        }
        else {
            return <TurnedInIcon style={{ color: 'white' }} />
        }
    }


    return (

        <div className="flex flex-col hover:p-3 cursor-pointer h-72 bg-appgreen rounded p-4" key={prompt.id} >
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={4000}
                onClose={handleClose}
                message={snackMessage}
            //   action={action}
            />
            <div className='flex flex-wrap h-56 '>
                <div className="flex h-16 w-full   pt-2 pl-1 justify-between items-center">
                    <div className='flex' onClick={() => {
                        props.profileClicked()
                    }}>
                        <div className="">
                            <Image src={prompt.user.profile_image} alt={""} className="rounded-full w-8 h-auto " width={40} height={40} style={{ borderRadius: 20 }} />
                        </div>
                        <div className='flex-col ml-2'>
                            <p className={`font-bold  text-white  antialiased`} >{prompt.user.username}</p>
                            <p className="text-sm text-gray-500" style={{ fontFamily: 'Rubik', fontWeight: '500', wordWrap: 'break-word' }}>{moment(prompt.createdAt, "YYYYMMDD, HH:mm:ss").fromNow(true)} ago</p>
                        </div>
                    </div>
                    <div className='flex  justify-center item-center'>


                        <IconButton onClick={props.savePromptClicked}>
                            {
                                getSaveIcon()
                            }
                        </IconButton>
                    </div>
                </div> {/* Specify the height and color for the top div */}
                <div className="flex-grow justify-start items-start h-36" onClick={() => {
                    props.itemSelected(prompt)
                }}>
                    <h3 className="text-lg font-bold mt-2  text-appgreenlight">{prompt.title}</h3>
                    <p className="mt-2 overflow-hidden overflow-ellipsis line-clamp-4 text-white">{prompt.description}</p>
                </div>
            </div>
            <div className="h-16 mb-2 justify-center items-center" onClick={() => {

                props.itemSelected(prompt)
            }}>
                <div className=" h-16 flex mt-4 justify-between">
                    {/* Your icon components for Like, View, Comment go here */}
                    <div className="flex flex-col justify-center items-center pb-3">
                        <IconButton className=' p-0'>
                            <Icons.ThumbUpIcon sx={{ color: 'white', width: 20, height: 20 }} />
                        </IconButton>
                        <button className=' text-white'>{prompt.likes}</button>
                    </div>
                    <div className="justify-center items-center">
                        <img src={ViewItemIcon} alt="View Icon" />
                        <button className=' text-white'>{prompt.views}</button>
                    </div>
                    <div className="justify-center items-center">
                        <img src={MessageIcon} alt="Message Icon" />
                        <button className=' text-white'>{prompt.usage}</button>
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

export default PromptItem

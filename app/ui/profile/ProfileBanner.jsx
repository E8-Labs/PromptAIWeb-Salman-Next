import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from 'next/image'

import { Button } from "@mui/material";
// import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
// import banner from '../assets/bannerImage.png'
const bannerImage = '/banner-bg.png'
const editBtnIcon = '/assets/editbtn.svg'
const twitterBtnIcon = '/assets/twitter.svg'
const youtubeBtnIcon = '/assets/youtube.svg'
const globeBtnIcon = '/assets/globe.svg'


export default function ProfileBannerView(props) {
    const user = props.user;

    const fileInputRef = useRef(null);
    const [UserImageError, setUserImageError] = useState('');

    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        // setMenuSelected(event.currentTarget.id)
    };

    function handleFileChangeOpen(event) {
        fileInputRef.current.click();
    }
    const handleFileChange = (event) => {
        setUserImageError('');
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file && file.size <= 2 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result;
                    props.ChangeBannerImage(base64String);
                };
                reader.readAsDataURL(file);
            } else {
                setUserImageError('Please select a file smaller than 2MB.');
            }
        } else {
            setUserImageError('Please select an image file.');
        }
    };
    return (
        <Container className="w-full bg-green" style={{ width: "100%", }}>
            <div className="user-profile-banner" style={{ background: `linear-gradient(180deg,rgba(0,0,0,0) 10.73%,rgba(0,0,0,.575644) 100%,rgba(0,0,0,.78) 78.78%) center/cover,url(${bannerImage}) center/cover` }}>
                {/* <img src={user.bannerImage} className="inner"/> */}
                <button onClick={handleFileChangeOpen} className="edit_banner" htmlFor="edit_banner">
                    <img src={editBtnIcon} alt="" />
                </button>
                <input ref={fileInputRef} onChange={handleFileChange} id="edit_banner" className="file-upload" type="file" accept="image/*" />
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="user_pro  justify-between">
                            <div className="flex">
                            <Link href="#">
                                {user.user.profile_image ?
                                    <Image src={user.user.profile_image} alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }} />
                                    :
                                    <img src="../assets/img/profile-pic.png" alt="" />
                                }
                                @{user.user.username}
                            </Link>
                            <div className="subscribe_btn">
                                <div className="unfollow_btn">
                                    {
                                        // props.UserID != localStorage.getItem('mongodb_userid') ?
                                        // (props.FollowStatus ?
                                        // <Link to="#" onClick={unfollowers_request.bind(this)} >Unfollow</Link>
                                        // :
                                        <Button className='h-8' variant="contained" style={{ backgroundColor: '#00C28C' }} onClick={() => {
                                            console.log("Follow here")
                                        }} >Follow</Button>
                                        // )
                                        // :
                                        // ''
                                    }
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="user_info_wrap">
                                    <div className="unfollow_btn">
                                    </div>
                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        //Show Community
                                    }} >{user.followers} Follower{user.followers > 1 && 's'}</p>

                                    <ul>

                                        <li><Link target="_blank" href={user.instagram_url ? user.instagram_url : '/'}><img src={globeBtnIcon} alt="" /></Link></li>

                                        <li><Link target="_blank" href={user.youtube_url ? user.youtube_url : '/'}><img src={youtubeBtnIcon} alt="" /></Link></li>

                                        <li><Link target="_blank" href={user.tiktok_url ? user.tiktok_url : '/'}><img src={globeBtnIcon} alt="" /></Link></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        {UserImageError ?
                            <p style={{ color: 'red', marginTop: '10px', fontSize: '11px', fontWeight: '400' }}>{UserImageError}</p>
                            :
                            <></>
                        }
                    </div>

                </div>

                {/* <div className="userdetailsdivouter">
                    <div className="userdetailsdiv">
                        <div className="imgdiv">
                            <img src={user.userImage} />
                        </div>
                        <div className="horizontalspacingvsmall"></div>
                        <div className="detailsdiv">
                            <label className='namelabel text-white'>{user.name}</label>
                        </div>
                        <div className="horizontalspacingvsmall"></div>
                        <div className="flex border-2 justify-center items-center" style={{ borderColor: '#00C28C', backgroundColor: '#00C28C10', borderRadius: '13px', height: '34px', width: '84px', padding: '10px' }}>
                            <label className='namelabel ' style={{ color: '#00C28C' }}>Follow</label>
                        </div>
                    </div>

                    <div className="socialbtns row gap-sm-3  me-2">
                        <div className="col-sm-2 menubtn  justify-content-end ms-auto" id="twitter" onClick={handleMenuClick}>
                            <p style={{ fontSize: '15px', fontWeight: 'bold' }}> 2200 followers</p>
                        </div>
                        <div className="col-sm-2 menubtn  justify-content-end ms-auto" id="twitter" onClick={handleMenuClick}>
                            <img src={twitterBtnIcon}></img>
                        </div>
                        <div className="col-sm-2 menubtn " id="youtube" onClick={handleMenuClick}>
                            <img src={youtubeBtnIcon}></img>
                        </div>
                        <div className="col-sm-2 menubtn" id="globe" onClick={handleMenuClick}>
                            <img src={globeBtnIcon}></img>
                        </div>
                    </div>
                </div> */}

            </div>


        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
background-color: transparent;
align-content: center;
// horizontal-align:middle;

    // padding-left: 2rem;
    // padding-right: 2rem;
    height: 8rem;
    width: 80%;
    
    // background-color: red;
    background-image: url("../../assets/bannerImage.png");
    


    

    .topbutton{
        background-color: transparent;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        paddig-right: 1rem;
        .editbtn{
            
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #050A08;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            img{
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }

    .file-upload {
        display: none;
    }

    .user-profile-banner {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10.73%, rgba(0, 0, 0, 0.575644) 100%, rgba(0, 0, 0, 0.78) 78.78%), url(../banner-bg.png);
        border-radius: 31px;
        background-position: center;
        background-size: cover;
        border-radius: 30px;
        padding: 15px 20px;
        display: flex;
        align-items: flex-end;
        height: 165px;
        position: relative;
    }
    .edit_banner {
        position: absolute;
        right: 20px;
        top: 15px;
        background: #050A08;
        line-height: 1;
        padding: 0;
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 28px;
        border-radius: 39px;
    }
    .user-profile-banner .row{
        width: 100%;
    }
    .user_info_wrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .user_pro {
        display: flex;
        align-items: center;
    }
    .user_pro a {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
    }
    .user_pro a img {
        width: 35px;
        border-radius: 100%;
        margin-right: 10px;
    }
    .subscribe_btn a {
        display: inline-block;
        background: rgba(0, 194, 140, 0.1);
        border: 1px solid #00C28C;
        border-radius: 13px;
        padding: 10px 10px;
        transition: .3s;
    }
    .subscribe_btn a:hover{
        background-color: #00C28C;
        color: #fff;
    }
    .subscribe_btn {
        margin-left: 35px;
    }
    .unfollow_btn a {
        display: inline-block;
        background: rgba(0, 194, 140, 0.1);
        border: 1px solid #00C28C;
        border-radius: 8px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #00C28C;
        padding: 6px 15px;
        transition: .3s;
    
    }
    .unfollow_btn a:hover{
        color: #fff;
        background-color: #00C28C;
    }
    .user_info_wrap p {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        margin: 0;
        margin: 0 15px;
    }
    .user_info_wrap p {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
    /* identical to box height */
        color: #FFFFFF;
        margin: 0;
        margin: 0 5px 0 15px;
    }
    .user_info_wrap ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .user_info_wrap ul li {
        display: inline;
        margin-left: 10px;
    }
    .user_info_wrap li a {
        display: inline-block;
    }
    .user_info_wrap li a img {
        height: 25px;
        transition: .3s;
        position: relative;
        transform: scale(1);
    }
    .user_info_wrap li a:hover img {
        transform: scale(1.1);
    }
    /*----------- User Profile Banner Area End  ----------*/
    

    .userdetailsdivouter{
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        vertical-align: middle;
        align-items: center;
        justify-content: space-between;
        .socialbtns{
            // width: 100vw;
            gap: 1.5rem;
            display: flex;
            flex-direction: row;
           
            justify-content: center;
            background-color: transparent;
            
            img2{
                width: 2rem;
                height: 2rem;
                // border-radius: 1.2rem;
                // border: 0.1rem solid white;
                object-fit: cover;
                cursor: pointer;
            }
        }
    }
    .userdetailsdiv{
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        vertical-align: middle;
        align-items: center;
        // justify-content: space-between;
        gap: 0.3rem;
        .detailsdiv{
            vertical-align: middle;
            display: flex;
            flex-direction: row;
            
        }
        img{
            width: 2rem;
            height: 2rem;
            border: 0.1rem solid white;
            border-radius: 1rem;
            vertical-align: middle;
        }
    }


`;
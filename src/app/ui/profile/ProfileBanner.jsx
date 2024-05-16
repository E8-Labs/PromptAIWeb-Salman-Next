import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from 'next/image'

import { Button } from "@mui/material";
import axios from "axios";

import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
const bannerImageAsset = '/banner-bg.png'//'https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_640.jpg'//
const editBtnIcon = '/assets/editbtn.svg'
const twitterBtnIcon = '/assets/twitter.svg'
const tiktokicon = '/assets/tiktok2.png'
const youtubeBtnIcon = '/assets/youtube.svg'
const globeBtnIcon = '/assets/globe.svg'

import ApiPath from "../../lib/ApiPath";


export default function ProfileBannerView(props) {
    const [user, setUser] = useState(props.user);
    const [following, setFollowing] = useState(props.user.user.amIFollowing)
    const [isLoggedInUser, setIsLoggedInUser] = useState(false)
    const [bannerImage, setBannerImage] = useState(bannerImageAsset)

    const [errorMessage, setErrorMessage] = useState("")
    
    // const [bannerFile, setBannerFile] = useState('')
    const fileInputRef = useRef(null);
    const [UserImageError, setUserImageError] = useState('');
    const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //   setOpen(true);
    // };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    useEffect(() => {
        //console.log("User object changed in Banner", user)
        setFollowing(user.user.amIFollowing)
        if (typeof (user.user.banner_image !== 'undefined') && user.user.banner_image != null) {
            setBannerImage(user.user.banner_image)
        }
        setIsLoggedInUser(user.token !== '')

        //console.log("user banner is ", user.token !== '')
    }, [user])


    const handleMenuClick = event => {
        //console.log(event.currentTarget.id);
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
                uploadBanner(file)
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result;
                    // props.ChangeBannerImage(base64String);
                };
                reader.readAsDataURL(file);
            } else {
                setErrorMessage("Please select an image less than 2 MB")
                setOpen(true);
                // setUserImageError('Please select a file');
            }
        } else {
            setErrorMessage("Please select an image")
            setOpen(true);
            // setUserImageError('Please select an image file.');
        }
    };


    const handleFollowAction = () => {
        //
        var u = null
        if (typeof localStorage !== 'undefined') {
            let localData = localStorage.getItem(process.env.REACT_APP_LocalSavedUser);
            u = JSON.parse(localData)
        }
        if (!u) {
            return
        }


        //console.log("Sending follow request to server now", user.user.id)

        const config = {
            headers: {
                "Authorization": "Bearer " + u.token,
            }
        };
        const data = { userid: user.user.id };
        //console.log("Data is ", JSON.stringify(data))
        axios.post(ApiPath.FollowUser, data, config)
            .then(data => {
                //console.log("Follow User response")
                //console.log(data.data)

                if (data.data.status) {
                    let receieved = data.data.data;
                    //console.log("Follow response from server")

                    if (user.user.amIFollowing) {
                        user.user.amIFollowing = false;
                        setFollowing(false)
                    }
                    else {
                        user.user.amIFollowing = true;
                        setFollowing(true)
                    }


                }
                else {

                }
            })
            .catch(error => {
                //console.log(error)
            })
    }

    function uploadBanner(file) {
        //console.log("Uploading Profile Banner ", file)
        // return
        var formdata = new FormData();
        var headers = new Headers()
        let u = null
        if (typeof localStorage !== 'undefined') {
            let localData = localStorage.getItem(process.env.REACT_APP_LocalSavedUser);
            u = JSON.parse(localData)
        }
        if (!u) {
            return
        }
        headers.append("Authorization", `Bearer ${u.token}`)

        formdata.append("image", file);
        const apiOption2 = {
            method: "post",
            body: formdata,
            redirect: 'follow',
            headers: headers,
        }
        // setLoading(true)
        // return
        // setPage("signup")
        fetch(ApiPath.UploadBannerRoute, apiOption2)
            .then(function (res) {
                // setLoading(false)
                return res.json();
            }).then(resJson => {
                // setLoading(false)
                // this.props.clickEvent("stap6");
                if (resJson.status == true) {
                    //console.log("Banner Uploaded", resJson.data)
                    let Manin_data_wrap = resJson.data;
                    let Profile = Manin_data_wrap;
                    u.user = Profile
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem(process.env.REACT_APP_LocalSavedUser, JSON.stringify(u));
                    }
                    //console.log(Profile.banner_image)
                    setBannerImage(Profile.banner_image)
                    //   router.push("/dashboard")
                } else {
                    //   setLoading(false)
                    toast(`Error: ${resJson.message}`);
                    // this.setState({ valid_email_address: "Email address is already registered" });
                    // this.setState({showerror:true , showerrortype : 2 , showerrormessage: "Something wrong with api fields" });
                    // this.error_handaling();
                }
            })
            .catch(error => {
                //console.log("User error " + error)
                toast(`User logged in as ${error}`);
                // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
                // this.error_handaling();
            });
    }


    return (
        <Container className="w-full bg-green" style={{ width: "100%", }}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={errorMessage}
                // action={action}
            />
            <div className="user-profile-banner" style={{ background: `linear-gradient(180deg,rgba(0,0,0,0) 10.73%,rgba(0,0,0,.575644) 100%,rgba(0,0,0,.78) 78.78%) center/cover,url(${bannerImage}) center/cover` }}>
                {/* <img src={user.bannerImage} className="inner"/> */}
                <button onClick={handleFileChangeOpen} className={`absolute right-2 top-2 bg-black line-height-1 p-0 cursor-pointer border-none flex items-center justify-center w-8 h-8 rounded-full ${user.token === "" ? 'hidden' : ''}`} htmlFor="edit_banner">
                    <img className={`${user.token === "" ? '' : ''}`} src={editBtnIcon} alt="" />
                </button>
                <input ref={fileInputRef} onChange={handleFileChange} id="edit_banner" className="file-upload" type="file" accept="image/*" />
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="user_pro  justify-between">
                            <div className="flex justify-center items-center pb-2 pl-2">
                                <Link className="pr-3" href="#">
                                    {user.user.profile_image ?
                                        <Image src={user.user.profile_image} alt={""} className="rounded-full w-8 h-8 " width={40} height={40} style={{ borderRadius: 20 }} />
                                        :
                                        <img src="../assets/img/profile-pic.png" alt="" />
                                    }
                                    @{user.user.username}
                                </Link>

                                {
                                    !isLoggedInUser && (
                                        <Button className={`h-6 ml-4 bg-appgreenlight hover:bg-appgreen text-xs   ${isLoggedInUser ? 'hidden' : ''}`} variant="contained" onClick={() => {
                                            //console.log("Follow here")
                                            handleFollowAction()
                                        }} >{following ? `Unsubscribe` : 'Subscribe'}</Button>
                                    )
                                }
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="user_info_wrap">

                                    <p style={{ cursor: 'pointer' }} onClick={() => {
                                        //Show Community
                                    }} >{user.user.followers} Subscriber{user.user.followers > 1 && 's'}</p>

                                    <ul className="flex gap-2">

                                        {/*social images */}

                                        {user.user.discord_url ? <Link target="_blank" href={user.user.discord_url ? 'http://' + user.user.discord_url : 'http://www.discord.com'}><img src="/discord.png" style={{ height: 'auto', Width: '100%', maxWidth: '40px' }} /></Link> : <></>}
                                        {user.user.web_url ? <Link target="_blank" href={user.user.web_url ? 'http://' + user.user.web_url : 'http://www.google.com'}><img src="/web.png" style={{ height: 'auto', Width: '100%', maxWidth: '40px' }} /></Link> : <></>}
                                        {user.user.youtube_url ? <Link target="_blank" href={user.user.youtube_url ? 'http://' + user.user.youtube_url : 'http://www.youtube.com'}><img src="/youtube.png" style={{ height: 'auto', Width: '100%', maxWidth: '40px' }} /></Link> : <></>}
                                        {user.user.instagram_url ? <Link target="_blank" href={user.user.instagram_url ? 'http://' + user.user.instagram_url : 'http://www.instagram.com'}><img src="/instagram.png" style={{ height: 'auto', Width: '100%', maxWidth: '40px' }} /></Link> : <></>}
                                        {user.user.tiktok_url ? <Link target="_blank" href={user.user.tiktok_url ? 'http://' + user.user.tiktok_url : 'http://www.tiktok.com'}><img src="/tiktok.png" style={{ height: 'auto', Width: '100%', maxWidth: '40px' }} /></Link> : <></>}


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
        // border-radius: 31px;
        background-position: center;
        background-size: cover;
        border-radius: 30px;
        // padding: 5px 5px;
        display: flex;
        align-items: flex-end;
        height: 280px;
        position: relative;
        width: 100%;
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
        margin-left: 0px;
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
import React, { useState, useEffect } from "react";
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

    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        // setMenuSelected(event.currentTarget.id)
    };
    return (
        <Container className="w-full bg-green" style={{ width: "100%", }}>
            <div className="row align-content-center ms-auto banner2 align-self-center" style={{
                width: "100%", backgroundImage: `url(${bannerImage})`, backgroundRepeat: "no-repeat",
                backgroundSize: "cover", background: 'linear-gradient(195deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.58) 66%, rgba(0, 0, 0, 0.78) 100%)'
            }}>
                {/* <img src={user.bannerImage} className="inner"/> */}
                <div className="col-11">

                </div>
                <div className="col justify-content-end bannergrid">
                    <div className="topbutton  justify-content-end">
                        <h1></h1>
                        <div className="editbtn m-2">
                            <img src={editBtnIcon} />
                        </div>
                    </div>
                </div>


                <div className="userdetailsdivouter">
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
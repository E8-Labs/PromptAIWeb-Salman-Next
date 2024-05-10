import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
// import banner from '../assets/bannerImage.png'
import bannerImage from '../../assets/bannerImage.png'
import editBtnIcon from '../../assets/editbtn.svg'
import twitterBtnIcon from '../../assets/twitter.svg'
import youtubeBtnIcon from '../../assets/youtube.svg'
import globeBtnIcon from '../../assets/globe.svg'


export default function ProfileEditView(props){
    const user = props.user;

    const handleMenuClick = event => {
        //console.log(event.currentTarget.id);
        // setMenuSelected(event.currentTarget.id)
      };
    return(
        <Container className="container-fluid text-white">
             <div className="userimagedetails">
                 <div className="imgdiv">
                    <img src={user.userImage} />
                </div>
                <div className="horizontalspacingvsmall"></div>
                <div className="detailsdiv">
                    <label className='namelabel'>{user.name}</label>
                    <label className='timelabel'>{user.lastLogin}</label>
                </div>
            </div>
            
            <div className="userotherdetails">
                <div className="singleinfoitem">
                    <label className='titlelabel'>Name</label>
                    <div className="detailrow">
                        <label>{user.name}</label>
                        <img src={editBtnIcon} />
                    </div>
                </div>

                <div className="singleinfoitem">
                    <label className='titlelabel'>Username</label>
                    <div className="detailrow">
                        <label>{user.name}</label>
                        <img src={editBtnIcon} />
                    </div>
                </div>

                <div className="singleinfoitem">
                    <label className='titlelabel'>Email Address</label>
                    <div className="detailrow">
                        <label>{user.email}</label>
                        <img src={editBtnIcon} />
                    </div>
                </div>

                <div className="singleinfoitem">
                    <label className='titlelabel'>Youtube link</label>
                    <div className="detailrow">
                        <label>{user.youtubeLink}</label>
                        <img src={editBtnIcon} />
                    </div>
                </div>

                <div className="singleinfoitem">
                    <label className='titlelabel'>Twitter link</label>
                    <div className="detailrow">
                        <label>{user.twitterLink}</label>
                        <img src={editBtnIcon} />
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
.userotherdetails{
    width: 20rem;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    vertical-align: middle;
    gap: 2rem;
    .singleinfoitem{
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        justify-content: left;
        align-items: left;
        .titlelabel{
            color: gray;
            font-size: 0.7rem;
        }
        .detailrow{
            width: 20rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

    }
}
.userimagedetails{
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    // padding-top: 0.5rem;
    // background-color: blue;
    vertical-align: middle;
    gap: 0.3rem;
    .detailsdiv{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;
        .timelabel{
            font-size: 10px;
            font-weight: normal;
        }
    }
    img{
        width: 4rem;
        height: 4rem;
        border: 0.1rem solid white;
        border-radius: 2rem;
    }
}

`;
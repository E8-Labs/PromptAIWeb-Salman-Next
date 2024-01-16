import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
// import banner from '../assets/bannerImage.png'
import bannerImage from '../../assets/bannerImage.png'
import editBtnIcon from '../../assets/editbtn.svg'
import twitterBtnIcon from '../../assets/twitter.svg'
import youtubeBtnIcon from '../../assets/youtube.svg'
import globeBtnIcon from '../../assets/globe.svg'


export default function SubscriptionPlan(props){
    const plans = props.plans;

    const handleMenuClick = event => {
        console.log(event.currentTarget.id);
        // setMenuSelected(event.currentTarget.id)
      };
    return(
        <Container className="text-white">
            <div className="userotherdetails">
                {/* {
                    plans.map((plan, index)=>{
                        <div className="singleinfoitem" key={plan.name}>
                            <div className="detailrow">
                                <label className='titlelabel'>{plan.name}</label>
                                <img src={editBtnIcon} />
                            </div>
                            <label>{plan.description}</label>
                    
                        </div>
                    })
                } */}

                        <div className="singleinfoitem border" key={plans[0].name}>
                            <div className="detailrow">
                                <label className='titlelabel'>{plans[0].name}</label>
                                <div className="priceandeditbtn">
                                    <label>{plans[0].price}</label>
                                    <img src={editBtnIcon} />
                                </div>
                            </div>
                            <label>{plans[0].description}</label>
                    
                        </div>

                        <div className="singleinfoitem border"  key={plans[1].name}>
                            <div className="detailrow">
                                <label className='titlelabel'>{plans[1].name}</label>
                                <div className="priceandeditbtn">
                                    <label>{plans[1].price}</label>
                                    <img src={editBtnIcon} />
                                </div>
                            </div>
                            <label>{plans[1].description}</label>
                    
                        </div>

                        <div className="singleinfoitem border" key={plans[2].name}>
                            <div className="detailrow">
                                <label className='titlelabel'>{plans[2].name}</label>
                                <div className="priceandeditbtn">
                                    <label>{plans[2].price}</label>
                                    <img src={editBtnIcon} />
                                </div>
                            </div>
                            <label>{plans[2].description}</label>
                    
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
    width: 22rem;
    height: 25rem;
    overflow: auto;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    vertical-align: middle;
    gap: 2rem;
    .singleinfoitem{
        height: 7rem;
        padding: 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        justify-content: left;
        align-items: left;
        border: 0.1rem solid #00C28C10;
        border-radius: 0.6rem;
        .titlelabel{
            color: #00C28C;
            font-size: 1rem;
        }
        label{
            font-size: 0.7rem;
        }
        .detailrow{
            width: 20rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .priceandeditbtn{
                gap: 0.5rem;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                label{
                    color: #00C28C;
                    font-size: 1rem;
                }
            }
        }

    }
}


`;
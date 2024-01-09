import React, { useState, useEffect, useCallback, Component } from "react";
// import { Link, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
const background = '/banner-bg.png'
const crossIcon = '/assets/cross.svg'
const upload_image = '/assets/upload_image.svg';
// import notpermissionLogo from '../../assets/notpermission.svg'
// import userIcon from '../../assets/user-icon-white.svg'

// import { alignProperty } from "@mui/material/styles/cssUtils";

//Images


class AddEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save Upload image
            email: '',
            file: '',
            imagePreviewUrl: this.props.imagePreviewUrl,
            username:this.props.username,
            website: '',
            youtube: '',
            instagram: '',
            password: '',
            // Fome data erroe
            logo:"",
            valid_logo : "",
            change_logo: 0,// this.props.change_logo,
            valid_username : "", 
        };
        // add form value
        // this.username = React.createRef();
    }

    // Fileupload before privew;
    // changeLogo(e) {
    //     e.preventDefault();
    //     this.setState({ valid_logo: "" });

    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //     }
    
    //     reader.readAsDataURL(file)
    // }
    //
    handleKeyPress(e){
        if(e.target.name == "username"){
            this.setState({ 
                username : e.target.value,
                valid_username: "" 
            });
        }
    }
    //Fome submit function
    Save_company_data(event){
        event.preventDefault();

        let log = false;
       
        if(this.state.imagePreviewUrl == ""){
            this.setState({ valid_logo: "Please upload a profile picture" });
            log = true;
        }     

        if(!this.username.current.value){
            this.setState({ valid_username: "Please enter a company name" });
            log = true;
        }
       
        if(log === true){ 
            return 
        }

        this.state.username = this.username.current.value;
        this.setState({username: this.state.username});
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.username);

        this.props.clickEvent("Team_member_stap3");
    }

    nextBtnClicked(){
        this.props.getEmail(this.state.email)
    }
    handleChange(event){
        event.preventDefault()
        console.log("Email changed " + event.target.value)
        this.setState({
            email: event.target.value
        })
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            //   $imagePreview = (<img src={imagePreviewUrl} />);
            $imagePreview = imagePreviewUrl;
        } else {
            //   $imagePreview = (<img src={upload_image} />);
            $imagePreview = upload_image;
        }
        return (
            <>
            <div className="row align-items-center align-content-start " style={{height: "100%"}}>
                <div className="col-md-12">
                    <div className="row  ms-auto  "  style={{height: "20%"}}> 
                        <div className="col justify-content-end">
                            <img src={crossIcon} alt=""></img>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center mt-sm-5">
                        <div className="  user-profile-image-border d-flex  border-app-primary rounded-circle  align-items-center justify-content-center"  
                            style={{width: "90px", height: "90px"}}>
                            <img className="rounded-circle user-profile-image" src={imagePreviewUrl}  style={{width: "80px", height: "80px"}}/> 
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto singup_input mt-3" >
                            <label className="text-white title2-text fs-5"> What's your email </label>
                        </div>
                    </div>
                    <div className="row row-cols-1 mt-md-5 gap-2  mt-5 d-flex align-items-center justify-content-center">
                        <form className="col-md-12 col-12 mx-2 mx-md-0 d-flex align-items-center justify-content-center">
                            <div className="row align-items-center justify-content-center " style={{minWidth: "100%"}}>
                            <input type="email" id="signuptextform" class="form-control border border-white text-white" placeholder="@email" 
                                style={{background: "transparent", minWidth: "60%", maxWidth: "75%"}} onChange={this.handleChange.bind(this)}/>
                                
                            </div>
                        </form>
                        
                        
                    </div>

                    <div className="row d-flex align-items-end justify-content-center mt-5 " style={{maxHeight:"70%", minHeight: "60%"}}>
                        <div className="col-6  d-flex align-items-center justify-content-center p-md-2 p-0 gap-1 bg-app-primary rounded-pill" onClick={this.nextBtnClicked.bind(this)}>
                            <button className="btn btn-md d-flex align-items-center justify-content-center signinbtn   gap-0">
                              <span className="fs-6 fw-bold text-white ">Next</span>
                            </button>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
        </>
        );
    }
}
export default AddEmail;
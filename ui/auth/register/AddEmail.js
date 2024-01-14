import React, { useState, useEffect, useCallback, Component } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import { CustomTextField } from "@/ui/customcomponents/CustomTextField";
import { Button, Stack, IconButton } from "@mui/material";
import { PageControl } from "@/ui/customcomponents/PageControl";
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
            username: this.props.username,
            website: '',
            youtube: '',
            instagram: '',
            password: '',
            // Fome data erroe
            logo: "",
            valid_logo: "",
            change_logo: 0,// this.props.change_logo,
            valid_username: "",
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
    handleBackButton(event){
        event.preventDefault()
        console.log("Handle back button")
    }
    handleKeyPress(e) {
        if (e.target.name == "username") {
            this.setState({
                username: e.target.value,
                valid_username: ""
            });
        }
    }
    //Fome submit function
    Save_company_data(event) {
        event.preventDefault();

        let log = false;

        if (this.state.imagePreviewUrl == "") {
            this.setState({ valid_logo: "Please upload a profile picture" });
            log = true;
        }

        if (!this.username.current.value) {
            this.setState({ valid_username: "Please enter a company name" });
            log = true;
        }

        if (log === true) {
            return
        }

        this.state.username = this.username.current.value;
        this.setState({ username: this.state.username });
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.username);

        this.props.clickEvent("Team_member_stap3");
    }

    nextBtnClicked() {
        this.props.getEmail(this.state.email)
    }
    handleChange(event) {
        event.preventDefault()
        console.log("Email changed " + event.target.value)
        this.setState({
            email: event.target.value
        })
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            //   $imagePreview = (<img src={imagePreviewUrl} />);
            $imagePreview = imagePreviewUrl;
        } else {
            //   $imagePreview = (<img src={upload_image} />);
            $imagePreview = upload_image;
        }
        return (

            <Stack className='w-full h-full  gap-2' direction={'vertical'} style={{ width: '100%' }}>
                <div className="flex-col flex-grow justify-center justify-center items-center mb-3">
                <Stack className=" flex flex-grow h-12" direction={'row'}>
                        <IconButton onClick={this.handleBackButton.bind(this)}>
                            <ArrowBackIcon sx={{color: 'white'}}/>
                        </IconButton>
                    </Stack>
                    <div className="flex justify-content-center mt-sm-5">
                        <div className="  user-profile-image-border d-flex  border-app-primary rounded-circle  align-items-center justify-content-center"
                            style={{ width: "90px", height: "90px" }}>
                            <img className="rounded-circle user-profile-image" src={imagePreviewUrl} style={{ width: "80px", height: "80px" }} />
                        </div>
                    </div>
                    <div className='flex flex-col  flex-grow gap-2 w-full justify-center items-center mt-3 px-6'>

                        {/* <form className='gap-sm-4 form '> */}

                        {/* <input className='inputtext' type='text' placeholder='Title' name='title' onChange={e => updateFormData({ title: e.target.value })}></input> */}
                        <CustomTextField

                            required
                            id="outlined-required"
                            label="Email"
                            defaultValue=""
                            placeholder='Email'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={this.handleChange.bind(this)}
                        />



                        {/* <Stack direction={'row'} >
                        
                      </Stack> */}
                        <div className="flex flex-grow w-full mt-4 pt-4  justify-between  items-center">
                            <Stack direction={'row'} className='' >
                                <PageControl selectedIndex={1} pages={5} />
                            </Stack>
                            <div class="invisible ">020000000000</div>
                            <Button variant="contained" className="" endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: '#00C28C', padding: 1.5, paddingX: 4, borderRadius: 10, ":hover": {
                                        backgroundColor: "#001812"
                                    }
                                }} onClick={this.nextBtnClicked.bind(this)}>Continue</Button>
                        </div>

                        

                        {/* </form> */}
                    </div>
                </div>

            </Stack>

        );



    }
}
export default AddEmail;
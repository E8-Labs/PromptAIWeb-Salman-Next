import React, { useState, useEffect, Component } from "react";
import { CustomTextField } from "../../customcomponents/CustomTextField";
import { Button, Stack, IconButton } from "@mui/material";
import { PageControl } from "../../customcomponents/PageControl";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const background = '/banner-bg.png'
const crossIcon = '/assets/cross.svg'
const upload_image = '/assets/upload_image.svg';
import { alignProperty } from "@mui/material/styles/cssUtils";
import ApiPath from "@/app/lib/ApiPath";
import axios from "axios";

class AddName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save Upload image
            file: '',
            imagePreviewUrl: this.props.imagePreviewUrl,
            name: '',
            username: this.props.username,
            username_available: "",
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
        this.username = React.createRef();
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
    handleBackButton(event) {
        event.preventDefault()
        console.log("Handle back button")
        this.props.backAction("intro")
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

        // this.state.username = this.username.current.value;
        // this.setState({username: this.state.username});
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.username);

        this.props.clickEvent("Team_member_stap3");
    }

    nextBtnClicked() {
        // if(this.state.username_available === "yes"){
        this.props.getFullName(this.state.name)
        // }

    }
    handleChange(event) {
        event.preventDefault()

        console.log("Name changed " + event.target.value)
        this.setState({
            name: event.target.value
        })

    }

    render() {

        return (

            <Stack className='w-full h-full  gap-2' direction={'vertical'} style={{ width: '100%' }}>
                <div className="flex-col flex-grow justify-center justify-center items-center mb-3">
                    <Stack className=" flex flex-grow h-12" direction={'row'}>
                        <IconButton onClick={this.handleBackButton.bind(this)}>
                            <ArrowBackIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Stack>

                    {/* Code for aligning items in center of card */}
                    <div className="w-full">
                        <CustomTextField

                            required
                            value={this.state.name}
                            id="outlined-required"
                            label="Full name"
                            defaultValue=""
                            placeholder='Full name'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={this.handleChange.bind(this)}
                        />

                        {/* <label className={`text-white text-xs ${this.state.username_available === "no" ? "" : "hidden"}`}>Username not available</label> */}

                        {/* <Stack direction={'row'} >
                        
                      </Stack> */}
                        <div className="flex flex-grow w-full mt-4 pt-4  justify-between  items-center">
                            <Stack direction={'row'} className='' >
                                <PageControl selectedColor={"#00C28C"} selectedIndex={0} pages={6} />
                            </Stack>
                            <div class="invisible ">020000000000</div>

                            <div className="bg-appgreenlight rounded-full p-0">
                                <Button variant="contained" className="" endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        bgcolor: '#00C28C', padding: 1.5, paddingX: 4, borderRadius: 10, ":hover": {
                                            backgroundColor: "#001812"
                                        }
                                    }} onClick={this.nextBtnClicked.bind(this)}>Continue</Button>
                            </div>
                        </div>
                    </div>


                    {/* <div className="flex justify-center rounded-full mt-sm-5">
                        <div className="  user-profile-image-border d-flex border-2  border-appgreenlight rounded-full p-1 items-center justify-center"
                            style={{ width: "90px", height: "90px" }}>
                            <img className="rounded-full user-profile-image" src={imagePreviewUrl} style={{ width: "80px", height: "80px" }} />
                        </div>
                    </div> */}
                    {/*<div className='flex flex-col border-2 border-blue-500 w-full flex-grow gap-2 w-full justify-end items-center mt-3 px-6'>

                        previously it was here facing issue here was that items on slightly right side
                </div>*/}
                    {/* <form className='gap-sm-4 form '> */}

                    {/* <input className='inputtext' type='text' placeholder='Title' name='title' onChange={e => updateFormData({ title: e.target.value })}></input> */}




                    {/* </form> */}

                </div>

            </Stack>

        );
    }
}
export default AddName;
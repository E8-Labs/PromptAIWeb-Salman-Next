import React, { useState, useEffect, useCallback, Component } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
import { CustomTextField } from "../../customcomponents/CustomTextField";
import { Button, Stack, IconButton } from "@mui/material";
import { PageControl } from "../../customcomponents/PageControl";

//Images
import ProfileCropping from './ProfileCropping';
// import { Button } from "@mui/material";
const background = '/banner-bg.png'
const crossIcon = '/assets/cross.svg'
const upload_image = '/assets/upload_image.svg';



class AddProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save Upload image
            file: '',
            imagePreviewUrl: upload_image,//'/assets/profileplaceholder.svg',
            company_name: this.props.Team_Name,
            // Fome data erroe
            logo: "",
            valid_logo: "",
            change_logo: 0,// this.props.change_logo,
            valid_company_name: "",
        };
        // add form value
        this.user_name = React.createRef();
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
    backAction(){
        this.props.backAction("intro")
    }
    handleKeyPress(e) {
        if (e.target.name == "User_Name") {
            this.setState({
                user_name: e.target.value,
                valid_company_name: ""
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

        if (!this.user_name.current.value) {
            this.setState({ valid_company_name: "Please enter a company name" });
            log = true;
        }

        if (log === true) {
            return
        }

        this.state.user_name = this.user_name.current.value;
        this.setState({ user_name: this.state.user_name });
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.user_name);

        this.props.clickEvent("Team_member_stap3");
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    //set_image_after_update
    afterCropImage(data, times) {
        console.log("Image cropped")
        let cropImage = data;
        let first_time = times;
        let filedata = this.dataURLtoFile(cropImage, "changeprofile.png");
        this.setState({ imagePreviewUrl: cropImage, file: filedata, change_logo: first_time });
    }

    nextBtnClicked() {
        if(this.state.imagePreviewUrl === upload_image){
            this.props.getImage(null, this.state.file)
        }
        else{
            this.props.getImage(this.state.imagePreviewUrl, this.state.file)
        }
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

            <div className="flex-col flex-grow justify-center justify-center items-center mb-3 h-full " >
                {/* <div className="col-md-12  "> */}
                <div className="flex-row  ms-auto">
                    <div className="flex-col justify-content-end">
                        <IconButton onClick={this.backAction.bind(this)}>
                            <ArrowBackIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>

                <div className="flex gap-2 mt-5 items-center justify-center px-6 ">
                    <form className="flex-col mx-3 md:mx-0 flex items-center justify-center">
                        <div className="flex-col gap-2 flex align-center justify-center">
                            <h6 className="text-white w-full">Get recognized, add a picture</h6>
                            <div className="flex-col mt-3 fileUpload" style={{ position: "relative", maxWidth: "300px", margin: "auto" }}>
                                <div className="upload_image bg-gray-500" style={{ margin: '0 auto', borderRadius: '50%', width: '100px', height: '100px', backgroundSize: 'cover', backgroundImage: `url(${$imagePreview})` }}></div>
                            </div>
                            <div className="flex flex-col justify-center items-center  pt-2">
                                {/* <Button>Upload Picture</Button> */}
                                <label className="text-app-primary title2-text text-base cursor-pointer" htmlFor='input-file'> Upload Picture </label>
                            </div>
                            <ProfileCropping change_logo={this.state.change_logo} edit_data={false} afterCropImage={this.afterCropImage.bind(this)} />
                        </div>
                    </form>
                </div>

                <div className="flex flex-grow w-full mt-4 pt-4 px-6  justify-between  items-center">
                    <Stack direction={'row'} className='' >
                        <PageControl selectedColor={"#00C28C"} selectedIndex={1} pages={5} />
                    </Stack>
                    <div class="invisible ">020000000000</div>
                    <div className="bg-appgreenlight rounded-full p-0">
                        <Button variant="contained"  endIcon={<ArrowForwardIcon />}
                            sx={{
                                bgcolor: '#00C28C', padding: 1.5, paddingX: 4, borderRadius: 10, ":hover": {
                                    backgroundColor: "#001812"
                                }
                            }} onClick={this.nextBtnClicked.bind(this)}>Continue
                        </Button>
                    </div>

                </div>



                {/* </div> */}

            </div>

        );
    }
}
export default AddProfilePicture;
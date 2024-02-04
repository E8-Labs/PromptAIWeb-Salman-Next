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


class AddSocialLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save Upload image
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
        // this.setState({ username: this.state.username });
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.username);

        this.props.clickEvent("Team_member_stap3");
    }

    handleChangeWeb(event) {
        event.preventDefault()
        console.log("Web changed " + event.target.value)
        this.setState({
            website: event.target.value
        })
    }

    handleBackButton(event){
        event.preventDefault()
        console.log("Handle back button")
        this.props.backAction("username")
    }

    handleChangeInsta(event) {
        event.preventDefault()
        console.log("Insta changed " + event.target.value)
        this.setState({
            instagram: event.target.value
        })
    }

    handleChangeYoutube(event) {
        event.preventDefault()
        console.log("Youtube changed " + event.target.value)
        this.setState({
            youtube: event.target.value
        })
    }

    nextBtnClicked() {
        this.props.getSocialLinks(this.state.website, this.state.instagram, this.state.youtube)
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
            <>
                <div className="felx flex-col " style={{ height: "100%" }}>
                    <Stack className=" flex flex-grow h-12" direction={'row'}>
                        <IconButton onClick={this.handleBackButton.bind(this)}>
                            <ArrowBackIcon sx={{color: 'white'}}/>
                        </IconButton>
                    </Stack>
                    <div className="flex justify-center rounded-full mt-sm-5">
                        <div className="  user-profile-image-border d-flex border-2  border-appgreenlight rounded-full p-1 items-center justify-center"
                            style={{ width: "90px", height: "90px" }}>
                            <img className="rounded-full user-profile-image" src={imagePreviewUrl} style={{ width: "80px", height: "80px" }} />
                        </div>
                    </div>
                    <div className="flex flex-col  flex-grow gap-2 w-full justify-center items-center mt-3 px-6">

                        <CustomTextField

                            required
                            id="outlined-required"
                            label="Website"
                            defaultValue=""
                            placeholder='Web Url'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={this.handleChangeInsta.bind(this)}
                        />
                        <CustomTextField

                            required
                            id="outlined-required"
                            label="Youtube Url"
                            defaultValue=""
                            placeholder='Youtube Url'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={this.handleChangeYoutube.bind(this)}
                        />
                        <CustomTextField

                            required
                            id="outlined-required"
                            label="Insta Url"
                            defaultValue=""
                            placeholder='Insta Url'
                            sx={{ "label": { color: "gray" }, width: '100%' }}
                            onChange={this.handleChangeInsta.bind(this)}
                        />

                        <div className="flex flex-grow w-full mt-4 pt-4  justify-between  items-center">
                            <Stack direction={'row'} className='' >
                                <PageControl selectedColor={"#00C28C"} selectedIndex={3} pages={5} />
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
                </div>
            </>
        );
    }
}
export default AddSocialLinks;
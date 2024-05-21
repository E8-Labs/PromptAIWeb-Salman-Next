import React, { useEffect, useState, useRef } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomTextField } from "../../customcomponents/CustomTextField";
import { Button, Stack, IconButton } from "@mui/material";
import { PageControl } from "../../customcomponents/PageControl";
import ApiPath from "@/app/lib/ApiPath";
const upload_image = '/assets/upload_image.svg';

const AddEmail = (props) => {
    const [email, setEmail] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(props.imagePreviewUrl);
    const [username, setUsername] = useState(props.username);
    const [validLogo, setValidLogo] = useState("");
    const [validUsername, setValidUsername] = useState("");

    //test code for email validation
    const [saveemail, setSaveemail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [emailNotExists, setEmailNotExists] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => {
        console.log('Email savedis', saveemail)
    })

    useEffect(() => {
        if (saveemail) {
            // Clear the previous timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Set a new timer
            timerRef.current = setTimeout(() => {
                checkEmailExistence(saveemail);
            }, 500);

            // Cleanup function to clear the timer when component unmounts
            return () => clearTimeout(timerRef.current);
        }
    }, [saveemail]);

    const checkEmailExistence = async () => {
        try {
            // const ApiUrl = "https://www.blindcircle.com:444/prompt/api/users/check_email"
            const response = await fetch(ApiPath.CheckEmailAvailable, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": saveemail })
            });
            if (response.ok) {
                let data = await response.json();
                if (data.isAvailable === true) {
                    console.log('Data recieved from api is', data)
                    // setEmailExists(true);
                    setEmailNotExists(false);
                } else if (data.isAvailable === false) {
                    // setEmailExists(false);
                    setEmailNotExists(true);
                    console.log('Email doesnot exists')
                }
            } else {
                console.warn('Api is not working')
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const handleBackButton = (event) => {
        event.preventDefault();
        props.backAction("profile_image");
    };

    const handleKeyPress = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
            setValidUsername("");
        }
    };

    const saveCompanyData = (event) => {
        event.preventDefault();

        let log = false;

        if (!imagePreviewUrl) {
            setValidLogo("Please upload a profile picture");
            log = true;
        }

        if (!username) {
            setValidUsername("Please enter a company name");
            log = true;
        }

        if (log) {
            return;
        }

        props.savedata(null, imagePreviewUrl, username);
        props.clickEvent("Team_member_stap3");
    };

    const nextBtnClicked = () => {
        props.getEmail(email);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
        setSaveemail(event.target.value);
        // console.log('Email in input is', event.target.value)
    };

    return (
        <Stack className='w-full h-full gap-2' direction={'vertical'} style={{ width: '100%' }}>
            <div className="flex-col flex-grow justify-center items-center mb-3">
                <Stack className="flex flex-grow h-12" direction={'row'}>
                    <IconButton onClick={handleBackButton}>
                        <ArrowBackIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Stack>
                <div className="flex justify-center rounded-full mt-sm-5">
                    <div className="user-profile-image-border d-flex border-2 border-appgreenlight rounded-full p-1 items-center justify-center"
                        style={{ width: "90px", height: "90px" }}>
                        <img className="rounded-full user-profile-image" src={imagePreviewUrl} style={{ width: "80px", height: "80px" }} />
                    </div>
                </div>
                <div className='flex flex-col flex-grow gap-2 w-full justify-center items-center mt-3 px-6'>
                    <CustomTextField
                        required
                        value={email}
                        id="outlined-required"
                        label="Email"
                        placeholder='Email'
                        sx={{ "label": { color: "gray" }, width: '100%' }}
                        onChange={handleChange}
                    />

                    {/*<div>{emailExists && <div style={{ color: 'white' }}>Email is Available</div>}</div>*/}
                    {emailNotExists && <div style={{ color: 'red' }}>Email not available</div>}

                    <div className="flex flex-grow w-full mt-4 pt-4 justify-between items-center">
                        <Stack direction={'row'}>
                            <PageControl selectedColor={"#00C28C"} selectedIndex={2} pages={6} />
                        </Stack>
                        <div className="invisible">020000000000</div>
                        <div className="bg-appgreenlight rounded-full p-0">
                            <Button variant="contained" endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: '#00C28C', padding: 1.5, paddingX: 4, borderRadius: 10, ":hover": {
                                        backgroundColor: "#001812"
                                    }
                                }} onClick={nextBtnClicked}>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Stack>
    );
};

export default AddEmail;

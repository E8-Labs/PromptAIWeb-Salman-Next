"use client";

import { IconButton, CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { ToastContainer } from "react-toastify";

import { CustomTextField } from "components/CustomTextField";

type LoginAIProps = {
  goBack(step: string): void;
  getEmailPassword(email: string, password: string): void;
};

function LoginAI({ goBack, getEmailPassword }: LoginAIProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleBackButton(event: React.MouseEvent) {
    event.preventDefault();
    console.log("Handle back button");
    goBack("intro");
  }
  function nextBtnClicked() {
    // setLoading(true)
    getEmailPassword(email, password);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    console.log("Email changed " + event.target.value);
    setEmail(event.target.value);
  }
  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    console.log("Password changed " + event.target.value);
    setPassword(event.target.value);
  }

  return (
    <div className="flex-col flex-grow w-full h-full justify-center items-center mb-3">
      <div className="flex flex-grow h-12 w-full  items-center justify-between mb-6">
        <IconButton onClick={handleBackButton}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </IconButton>
        <div className="flex-grow flex items-center justify-center">
          <h3 className="text-white">Login</h3>
        </div>
        <IconButton className="invisible ..." onClick={handleBackButton}>
          <ArrowBackIcon sx={{ color: "transparent" }} />
        </IconButton>
      </div>

      <div className="flex flex-col flex-grow gap-6 w-full justify-center items-center mt-6 px-6">
        <CustomTextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          placeholder="Email"
          sx={{ label: { color: "gray" }, width: "100%" }}
          onChange={handleChange}
        />

        <CustomTextField
          type="password"
          required
          id="outlined-required"
          label="Password"
          defaultValue=""
          placeholder="Password"
          sx={{ label: { color: "gray" }, width: "100%" }}
          onChange={handleChangePassword}
        />

        <div className="flex-col flex  w-full  justify-center items-center ">
          <div className="bg-appgreenlight rounded-full p-0">
            <LoadingButton
              loading={loading || false}
              loadingIndicator={
                <CircularProgress color="inherit" size={16} sx={{ color: "white" }} />
              }
              variant="contained"
              className=""
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#00C28C",
                padding: 1.5,
                paddingX: 4,
                borderRadius: 10,
                ":hover": {
                  backgroundColor: "#001812",
                },
              }}
              onClick={nextBtnClicked}
            >
              Login
            </LoadingButton>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default LoginAI;

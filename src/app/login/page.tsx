import { CircularProgress, IconButton } from "@mui/material";
import { ToastContainer } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { HOME_SLIDES } from "@/utils/constants";
import { CustomTextField } from "@/components/CustomTextField";

export default function Page() {
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
    <div
      className="h-full w-full flex flex-col"
      style={{
        backgroundImage: 'url("../background-desktop.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black rounded m-auto items-center justify-center flex flex-row h-2/5 w-3/5  shadow-lg">
        <div className="flex-grow flex flex-col justify-center gap-6 rounded px-6 py-10 md:w-2/4 h-40vh md:px-20 h-[70vh] bg-appgreen">
          <Carousel className="flex-grow flex h-[50vh]">
            <CarouselContent>
              {HOME_SLIDES.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="h-screen gap-8 flex-col flex-grow">
                    <h2 className="text-xl font-bold text-white">{slide.heading}</h2>
                    <p className="text-white">{slide.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex-grow flex items-center justify-center h-[70vh] p-1 md:w-2/4 md:py-12 bg-black">
          <div className=" flex items-center h-full w-full p-2 justify-center ">
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// TODO: Replace the following with ShadCN and Tailwind
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { Storage } from "@/services";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { HOME_SLIDES } from "@/utils/constants";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = React.useState("intro");
  // const [file, setFile] = useState("");
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [website, setWebsite] = useState("");
  // const [youtube, setYoutube] = useState("");
  // const [instagram, setInstagram] = useState("");
  // const [password, setPassword] = useState("");
  // const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [index, setIndex] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  React.useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_LocalSavedUser || "");

    if (user) {
      router.push("/dashboard");
    }
  }, []);

  //functions
  function signinBtnTapped() {
    setPage("login");
  }
  function registerBtnTapped() {
    setPage("profile_image");
  }
  function getImage(imageUrl, file) {
    console.log("Image picked " + imageUrl);
    if (imageUrl === null) {
      toast(`Add Profile Picture`);
    } else {
      setPage("email");
      setFile(file);
      setImagePreviewUrl(imageUrl);
    }
  }
  function getUsername(username) {
    console.log("Username added " + username);
    if (username === null || username === "") {
      toast(`Add username`);
      return;
    }
    setPage("social_links");
    setUsername(username);
  }

  function getEmail(email) {
    console.log("email added " + email);
    if (email === null || email === "") {
      toast(`Add email`);
      return;
    }
    setPage("username");
    setEmail(email);
  }

  function backAction(screen) {
    setPage(screen);
  }

  function getPassword(password) {
    console.log("Password added " + password);
    if (password === null || password === "") {
      toast(`Add username`);
      return;
    }
    setPassword(password);

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("name", username);
    formdata.append("youtube", youtube);
    formdata.append("website", website);
    formdata.append("instagram", instagram);
    formdata.append("image", file);
    const apiOption2 = {
      method: "post",
      body: formdata,
      redirect: "follow",
    };
    setLoading(true);
    // return
    // setPage("signup")
    fetch(API_PATH.RegisterRoute, apiOption2)
      .then(function (res) {
        setLoading(false);
        return res.json();
      })
      .then((resJson) => {
        setLoading(false);
        // this.props.clickEvent("stap6");
        if (resJson.status == true) {
          console.log("User created", resJson.data);
          let Manin_data_wrap = resJson.data;
          let Profile = Manin_data_wrap.user;
          let profile_img = Profile.image_url;
          Storage.set(process.env.REACT_APP_LocalSavedUser, JSON.stringify(Manin_data_wrap));
          console.log(Profile.image_url);
          router.push("/dashboard");
        } else {
          setLoading(false);
          toast(`Error: ${resJson.message}`);
          // this.setState({ valid_email_address: "Email address is already registered" });
          // this.setState({showerror:true , showerrortype : 2 , showerrormessage: "Something wrong with api fields" });
          // this.error_handaling();
        }
      })
      .catch((error) => {
        console.log("User error " + error);
        toast(`User logged in as ${error}`);
        // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
        // this.error_handaling();
      });
  }

  //login here
  function getEmailPassword(email, password) {
    if (email === null || email === "") {
      toast(`Add email`);
      return;
    }
    if (password === null || password === "") {
      toast(`Add password`);
      return;
    }
    const apiParams = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      redirect: "follow",
    };
    console.log("Loging user");
    setLoading(true);
    fetch(API_PATH.LoginRoute, apiParams)
      .then(function (res) {
        setLoading(false);
        return res.json();
      })
      .then((resJson) => {
        setLoading(false);
        // this.props.clickEvent("stap6");
        if (resJson.status == true) {
          console.log("User Logged in");
          toast(`Success: User logged in`);
          let Manin_data_wrap = resJson.data;
          let Profile = Manin_data_wrap.user;
          let profile_img = Profile.image_url;
          localStorage.setItem(
            process.env.REACT_APP_LocalSavedUser,
            JSON.stringify(Manin_data_wrap),
          );
          console.log(Profile.image_url);
          router.push("/dashboard");
          // const navigate = this.props.navigate;
          // navigate("/prompts")
        } else {
          console.log("Error login ", resJson.message);
          toast(`Error: ${resJson.message}`);
          // this.setState({ valid_email_address: "Email address is already registered" });
          // this.setState({showerror:true , showerrortype : 2 , showerrormessage: "Something wrong with api fields" });
          // this.error_handaling();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("User error " + error);
        toast(`Error: ${error}`);
        // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
        // this.error_handaling();
      });
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
            <div className="flex w-full h-full justify-center items-center">
              <div className="flex-col flex gap-6 flex-grow h-full space-y-20 justify-center items-center">
                <div className="flex-col gap-4 my-6">
                  <div className="flex-grow  flex justify-center mx-auto p-0">
                    <Image className="" src="/chatgpt.svg" width={60} height={60} alt="Logo" />
                  </div>
                  <div className="flex-row flex justify-center gap-2">
                    <h3 className="text-white text-right">Sign in with</h3>
                    <h3 className="text-start" style={{ color: "var(--app-primary)" }}>
                      Open AI
                    </h3>
                  </div>
                </div>
                <div className="bg-appgreenlight rounded-full p-0">
                  <Button
                    variant="contained"
                    // TODO: tailwind ONLY
                    sx={{
                      padding: 1.5,
                      paddingX: 3,
                      borderRadius: 8,
                      ":hover": {
                        bgcolor: "#001812",
                      },
                    }}
                    href="/login"
                  >
                    Sign In with OpenAI
                  </Button>
                </div>
                <div className="row my-5">
                  <div className="flex items-center justify-center p-md-2 p-0 gap-1">
                    <span className="mb-20 text-white">
                      Dont have an account?{" "}
                      <Link href={"/"} onClick={registerBtnTapped} className="font-semibold">
                        Sign up now
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* TODO: LOGIN PAGE */}
            {/* {page === "login" && (
                <LoginAI
                  backAction={backAction}
                  loading={loading}
                  getEmailPassword={getEmailPassword}
                />
              )} */}
            {/* TODO: SIGN UP FLOW/FORM */}
            {/* {page === "email" && (
                <AddEmail
                  backAction={backAction}
                  getEmail={getEmail}
                  imagePreviewUrl={imagePreviewUrl}
                />
                // <div> Hello there email </div>
              )}
              {page === "profile_image" && (
                <AddProfilePicture backAction={backAction} className="h-full" getImage={getImage} />
              )}
              {page === "username" && (
                <AddUsername
                  backAction={backAction}
                  imagePreviewUrl={imagePreviewUrl}
                  getUsername={getUsername}
                />
              )}
              {page === "social_links" && (
                <AddSocialLinks
                  backAction={backAction}
                  imagePreviewUrl={imagePreviewUrl}
                  username={username}
                  getSocialLinks={getSocialLinks}
                />
              )}
              {page === "password" && (
                <AddPassword
                  backAction={backAction}
                  loading={loading}
                  imagePreviewUrl={imagePreviewUrl}
                  username={username}
                  getPassword={getPassword}
                />
              )} */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

// @ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
// import AcmeLogo from '@/app/ui/acme-logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import styles from '@/app/ui/home.module.css'
import { lusitana, poppins } from '@/app/ui/fonts';

import Image from 'next/image';


import Link from 'next/link';

import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";


// own css files here
// import "..";

// import crossIcon from '../../assets/cross.svg'
import ChatGptLogin from "@/app/ui/auth/ChatGptLogin";
import NotificationPermission from './ui/auth/register/NotificationPermission';
import AddProfilePicture from './ui/auth/register/AddProfilePicture';
import AddUsername from './ui/auth/register/AddUsername';
// impprt Ad
import AddPassword from './ui/auth/register/AddPassword';
import AddEmail from './ui/auth/register/AddEmail';
import LoginAI from "@/app/ui/auth/LoginAI";

import ApiPath from "@/app/lib/ApiPath";
import AddSocialLinks from './ui/auth/register/AddSocialLinks';

const sliderContent = [
  {
    id: "1",
    heading: 'Prompt',
    description: 'Empowering creators and users to harness the power of AI through our AI prompt marketplace.',
  },
  {
    id: "2",
    heading: 'Prompt 2',
    description: 'Empowering creators and users to harness the power of AI through our AI prompt marketplace.',
  },
  {
    id: "3",
    heading: 'Prompt 3',
    description: 'Empowering creators and users to harness the power of AI through our AI prompt marketplace.',
  },
  // Add more slider content as needed
];

export default function Page() {

  const router = useRouter();
  const [page, setPage] = useState("intro")
  const [file, setFile] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [youtube, setYoutube] = useState("")
  const [instagram, setInstagram] = useState("")
  const [password, setPassword] = useState("")
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const [index, setIndex] = useState(0)


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const mainStyle = {
    backgroundImage: 'url("../background-desktop.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    let u = localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    if (u){
      let user = JSON.parse(u)
      if(user){
        router.push("/dashboard")
      }
    }
  }, [])

  //functions
  function signinBtnTapped() {
    setPage("login")
  }
  function registerBtnTapped() {
    setPage("profile_image")
  }
  function getImage(imageUrl, file) {
    console.log("Image picked " + imageUrl)
    setPage("email")
    setFile(file)
    setImagePreviewUrl(imageUrl)
  }
  function getUsername(username) {
    console.log("Username added " + username)
    setPage("social_links")
    setUsername(username)

  }

  function getEmail(email) {
    console.log("email added " + email)
    setPage("username")
    setEmail(email)

  }

  function getPassword(password) {
    console.log("Password added " + password)
    setPage("signup")
    setPassword(password)

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
      redirect: 'follow'
    }
    fetch(ApiPath.RegisterRoute, apiOption2)
      .then(function (res) {
        return res.json();
      }).then(resJson => {
        // this.props.clickEvent("stap6");
        if (resJson.status == true) {
          console.log("User created", resJson.data)
          let Manin_data_wrap = resJson.data;
          let Profile = Manin_data_wrap.user;
          let profile_img = Profile.image_url;
          localStorage.setItem(process.env.REACT_APP_LocalSavedUser, JSON.stringify(Manin_data_wrap));
          console.log(Profile.image_url)
          router.push("/dashboard")
        } else {
          toast(`Error: ${resJson.message}`);
          // this.setState({ valid_email_address: "Email address is already registered" });
          // this.setState({showerror:true , showerrortype : 2 , showerrormessage: "Something wrong with api fields" });
          // this.error_handaling();
        }
      })
      .catch(error => {
        console.log("User error " + error)
        toast(`User logged in as ${error}`);
        // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
        // this.error_handaling();
      });
  }


  //login here
  function getEmailPassword(email, password) {
    const apiParams = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
      redirect: 'follow'
    }

    fetch(ApiPath.LoginRoute, apiParams)
      .then(function (res) {
        return res.json();
      }).then(resJson => {
        // this.props.clickEvent("stap6");
        if (resJson.status == true) {
          console.log("User Logged in")
          toast(`Success: User logged in`);
          let Manin_data_wrap = resJson.data;
          let Profile = Manin_data_wrap.user;
          let profile_img = Profile.image_url;
          localStorage.setItem(process.env.REACT_APP_LocalSavedUser, JSON.stringify(Manin_data_wrap));
          console.log(Profile.image_url)
          router.push("/dashboard")
          // const navigate = this.props.navigate;
          // navigate("/prompts")

        } else {
          console.log("Error login ", resJson.message)
          toast(`Error: ${resJson.message}`);
          // this.setState({ valid_email_address: "Email address is already registered" });
          // this.setState({showerror:true , showerrortype : 2 , showerrormessage: "Something wrong with api fields" });
          // this.error_handaling();
        }
      })
      .catch(error => {
        console.log("User error " + error)
        toast(`Error: ${error}`);
        // this.setState({ showerror: true ,showerrortype : 2 ,showerrormessage: "Invalid Response" });
        // this.error_handaling();
      });
  }


  function getSocialLinks(web, insta, youtube) {
    console.log("Web added " + web)
    setWebsite(web)
    setInstagram(insta)
    setYoutube(youtube)
    setPage("password")
    
  }
  

  //functions end here

  return (
    <main className="flex min-h-screen flex-col p-6" style={mainStyle}>
      {/* Header or other content can be added here if needed */}

      <div className="bg-black rounded m-auto items-center justify-center flex flex-row h-2/5 w-3/5  shadow-lg">
        <div className="flex-grow flex flex-col justify-center gap-6 rounded bg-gray-50 px-6 py-10 md:w-2/4 h-40vh md:px-20  bg-appgreen" style={{ height: '70vh', backgroundColor: "#001812" }}>
          <Slider {...sliderSettings} className=" flex-grow flex" style={{ height: '50vh', flex: 1 }}>
            {sliderContent.map((slide, index) => (
              <div key={index} className="gap-4" style={{ height: '100vh', gap: '2rem', flexDirection: 'column', flex: 1 }}>
                <h2 className="text-xl font-bold text-white">{slide.heading}</h2>
                <p className="text-white">{slide.description}</p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex-grow flex items-center justify-center p-1 md:w-2/4  md:py-12 bg-black" style={{ height: '70vh' }}>
          <div className=" flex items-center justify-center " style={{ width: '100%' }} >

            {
              page === "intro" && (
                <ChatGptLogin signinBtnTapped={
                  signinBtnTapped} registerBtnTapped={registerBtnTapped} />
              )
            }

            {
              page === "login" && (
                <LoginAI getEmailPassword={getEmailPassword} />
                // <div> Hello there login </div>
              )
            }
            {
              page === "email" && (
                <AddEmail getEmail={getEmail} imagePreviewUrl={imagePreviewUrl} />
                // <div> Hello there email </div>
              )
            }
            {
              page === "profile_image" && (
                <AddProfilePicture className="h-full" getImage={getImage} />
              )
            }
            {
              page === "username" && (
                <AddUsername imagePreviewUrl={imagePreviewUrl} getUsername={getUsername} />
              )
            }
            {
              page === "social_links" && (
                <AddSocialLinks imagePreviewUrl={imagePreviewUrl} username={username} getSocialLinks={getSocialLinks} />
              )
            }
            {
              page === "password" && (
                <AddPassword imagePreviewUrl={imagePreviewUrl} username={username} getPassword={getPassword} />
              )
            }

          </div>
        </div>
      </div>
    </main>
  );
}



//  function BootstrapCarousel() {
//   const  bootstrap  = sliderContent;
//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };
//   return (
//     <Carousel activeIndex={index} onSelect={(index)=>{
//       handleSelect(index)
//     }}>
//       {bootstrap.map((item) => (
//         <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
//           {/* <img src={item.imageUrl} alt="slides" /> */}
//           <Carousel.Caption className={styles.caption}>
//             <h3>{item.heading}</h3>
//             <p>{item.description}</p>
//             <button className="btn btn-danger">Visit Docs</button>
//           </Carousel.Caption>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }
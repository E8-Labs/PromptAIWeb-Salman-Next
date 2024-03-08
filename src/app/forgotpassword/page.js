// @ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Forgot from "../ui/auth/Forgot";

import ApiPath from "../lib/ApiPath";



export default function Page() {

  const router = useRouter();
  const [page, setPage] = useState("forgotpassword")
  
  const [email, setEmail] = useState("")
  
  const [password, setPassword] = useState("")
  


  const mainStyle = {
    backgroundImage: 'url("../background-desktop.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  
  useEffect(() => {
    

  }, [])

  //functions
  function sendEmailBtnTapped() {
    
  }
  function resetBtnTapped() {
    
  }
  
  function backAction() {
    
  }




  

  //functions end here

  return (
    <main className="flex min-h-screen flex-col p-6" style={mainStyle}>
      {/* Header or other content can be added here if needed */}

      <div className="bg-black rounded m-auto items-center justify-center flex flex-row h-2/5   shadow-lg" style={{width: 400}}>
        

        <div className="flex-grow rounded flex items-center justify-center p-1 md:w-2/4   bg-black" style={{ height: '70vh' }}>
          <div className=" flex rounded items-center h-full  p-2 justify-center " style={{ width: '100%' }} >

            <Forgot backAction={backAction}  getEmailPassword={()=>{

            }}  />
               
          </div>
        </div>
      </div>
      <ToastContainer />
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
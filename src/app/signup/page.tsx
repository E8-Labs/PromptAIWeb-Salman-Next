import { ToastContainer } from "react-toastify";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { HOME_SLIDES } from "@/utils/constants";

type SignupProps = {
  page?: string;
};

// SignUp Form
export default function Page({ page }: SignupProps) {
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

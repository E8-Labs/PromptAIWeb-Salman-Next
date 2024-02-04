import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@mui/material";

type ChatGptLoginProps = {
  signinBtnTapped(): void;
  registerBtnTapped(): void;
};

function ChatGptLogin({ signinBtnTapped, registerBtnTapped }: ChatGptLoginProps) {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex-col  flex gap-6 flex-grow h-full   justify-center items-center">
        <div className="flex-col gap-4 my-6 ">
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
        <div className="h-20 w-full"></div>
        <div className="bg-appgreenlight rounded-full p-0">
          <Button
            variant="contained"
            sx={{
              padding: 1.5,
              paddingX: 3,
              borderRadius: 8,
              ":hover": {
                bgcolor: "#001812",
              },
            }}
            onClick={signinBtnTapped}
          >
            Sign In with OpenAI
          </Button>
        </div>
        <div className="h-20 w-full"></div>
        <div className="row my-5 ">
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
  );
}

export default ChatGptLogin;

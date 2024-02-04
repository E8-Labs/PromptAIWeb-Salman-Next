import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import moment from "moment-timezone";
import { IconButton, Snackbar } from "@mui/material";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

const ViewItemIcon = "/viewsicon.svg";
const MessageIcon = "/commenticon.svg";
const LikePromptIcon = "/likeprompticon.png";

moment.tz.setDefault("Etc/UTC");

type PromptItemProps = {
  prompt: any;
  profileClicked(): void;
  itemSelected(input: any): void;
};

function PromptItem({ prompt, profileClicked, itemSelected }: PromptItemProps) {
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleClose = () => {
    setSnackbarOpen(false);
    setSnackMessage("");
  };

  return (
    <div className="flex flex-col h-72  bg-appgreen rounded p-4 cursor:pointer" key={prompt.id}>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackMessage}
      />
      <div className="flex flex-wrap h-56 ">
        <div className="flex h-16 w-full   pt-2 pl-1 justify-between items-center">
          <div className="flex" onClick={profileClicked}>
            <div className="">
              <Image
                src={prompt.user.profile_image}
                alt=""
                className="w-8 h-8 rounded-[20px]"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-col ml-2">
              <p className={`font-bold  text-white  antialiased`}>{prompt.user.username}</p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Rubik", fontWeight: "500", wordWrap: "break-word" }}
              >
                {moment(prompt.createdAt, "YYYYMMDD, HH:mm:ss").fromNow(true)} ago
              </p>
            </div>
          </div>
          <div className="flex  justify-center item-center">
            <IconButton>
              <TurnedInNotOutlinedIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
        <div
          className="flex-grow justify-start items-start h-36"
          onClick={() => itemSelected(prompt)}
        >
          <h3 className="text-lg font-bold mt-2  text-appgreenlight">{prompt.title}</h3>
          <p className="mt-2 overflow-hidden overflow-ellipsis line-clamp-4 text-white">
            {prompt.description}
          </p>
        </div>
      </div>
      <div className="h-16 mb-2 justify-center items-center" onClick={() => itemSelected(prompt)}>
        <div className=" h-16 flex mt-4  justify-between">
          <div className="justify-center items-center">
            <img src={LikePromptIcon} alt="Like Icon" />
            <button className=" text-white">{prompt.likes}</button>
          </div>
          <div className="justify-center items-center">
            <img src={ViewItemIcon} alt="View Icon" />
            <button className=" text-white">{prompt.views}</button>
          </div>
          <div className="justify-center items-center">
            <img src={MessageIcon} alt="Message Icon" />
            <button className=" text-white">{prompt.usage}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Container = styled.div`
  height: 100%;
  // width: 100%;
  display: grid;
  grid-template-rows: 15% 75% 10%;
  // flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff10;
  border-radius: 0.8rem;
  .verticalspacingsmall {
    height: 0.3rem;
  }
  .horizontalspacingvsmall {
    width: 0.5rem;
  }
  h3 {
    color: white;
  }
  .userdetails {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    // padding-top: 0.5rem;
    // background-color: blue;
    vertical-align: middle;
    margin-top: 2rem;
    gap: 0.3rem;
    .detailsdiv {
      display: flex;
      flex-direction: column;
      .timelabel {
        font-size: 10px;
        font-weight: normal;
      }
    }
    img {
      width: 2rem;
      height: 2rem;
      border: 0.1rem solid white;
      border-radius: 1rem;
    }
  }
  .centerdiv {
    display: flex;
    flex-direction: column;
    // grid-template-rows: auto auto;
    word-wrap: break-word;
    justify-content: center;
    align-items: top;
    align-content: top;
    overflow: hidden;
    padding: 1rem;
    background-color: transparent;
    h4 {
      color: #00c28c;
    }
    p {
      height: 80px;
      line-height: 20px; /* Height / no. of lines to display */
      overflow: hidden;
      cursor: pointer;
      word-wrap: break-word;
    }

    .cardbtn {
      // cursor: pointer;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: row;
      img {
        background-color: transparent;
        cursor: pointer;
      }

      button {
        // background-color: red;
        padding: 0.3rem;
        background-color: transparent;
        border: none;
        font-size: 0.8rem;
        cursor: pointer;
        color: red;
        text-align: left;
      }
    }
  }
`;

export default PromptItem;

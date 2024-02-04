import axios from "axios";
import React from "react";
import styled from "styled-components";

import { API_PATH } from "utils/lib/constants";
import ProfileBannerView from "./ProfileBanner";
import PromptItem from "../prompt/PromptItem";
import { useRouter } from "next/router";

type ProfileBaseViewProps = {
  defaultUser: any;
}

export default function ProfileBaseView({ defaultUser }: ProfileBaseViewProps) {
  const router = useRouter();
  const [user, setUser] = React.useState(defaultUser);
  const [currentUser, setCurrentUser] = React.useState<any>();
  const [prompts, setPrompts] = React.useState([]);

  React.useEffect(() => {
    if (currentUser) {
      getUserProfile();
      loadPrompts();
    }
  }, [currentUser]);

  React.useEffect(() => {
    loadCurrentUser();
    console.log("Other user profile obtained", user);
  }, []);

  const loadCurrentUser = async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      router.push("/login");
    } else {
      console.log("User already logged in");
      setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser)));
      //   loadUsers(currentUser.token);
    }
  };

  const loadPrompts = () => {
    //console.log("In Load Prompts. Remove return statement when implemented")
    // return
    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));

    //   this.setState({currentUser: user})
    // setCurrentUser(u)
    // console.log("Token in get Prompts " + u)
    const config = {
      headers: {
        Authorization: "Bearer " + u.token,
      },
    };
    let otherUserProfileIdParameter = "";
    if (user.token === "") {
      otherUserProfileIdParameter = "&userid=" + user.user.id;
    }
    const route =
      API_PATH.GetUserPrompts + `?offset=${prompts.length}${otherUserProfileIdParameter}`;
    // console.log(route)
    axios
      .get(route, config)
      .then((res) => {
        // console.log("Data is ")
        console.log(res.data);
        // setMessages(res.data)

        res.data.data.map((m, index) => {
          setPrompts((prevState) => [...prevState, m]);
        });
        // console.log("Prompts count is ", prompts.length)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePromptSelected = (prompt: ) => {
    console.log("Prompt selected ", prompt);
  };

  const logoutCurrentuser = () => {
    localStorage.removeItem(process.env.REACT_APP_LocalSavedUser);
    // navigate("/")
  };
  const getUserProfile = async () => {
    console.log("Loading Profile Api", user.user.id);
    console.log("With token ", currentUser.token);
    let userid = user.user.id;
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    };
    // try{
    let route = API_PATH.Profile + "?userid=" + userid;
    console.log("Route ", route);
    axios
      .get(route, config)
      .then((resData) => {
        console.log("Profile api loaded ");
        console.log(resData.data);
        if (resData.data.status) {
          if (resData.data.data) {
            let u = resData.data.data;
            setUser({ user: u, token: "" });

            // setUserLoaded(true)
          }
        } else {
          console.log("No user found with this auth token");
          setUser(null);
          //   setUserLoaded(true)
        }
      })
      .catch((error) => {
        console.log("Error fetching user ", error);
        // setUser(null)
        // setUserLoaded(true)
      });
  };

  return (
    <div className="flex  flex-col  flex-grow w-full h-full bg-black px-2">
      <ProfileBannerView user={user} />
      {currentUser != null && (
        <div
          className={`overflow-y-scroll py-6  ${user.user.id !== currentUser.user.id ? " grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"}`}
          style={{}}
        >
          {prompts.map((element: any) => {
            // <label>{element}</label>
            {
              console.log("Prompt in map is ", element);
            }
            return (
              <div className="rounded bg-appgreen p-0 " key={element.id}>
                {/* <PromptItemMyprofile prompt={element}  itemSelected = {handlePromptSelected}/> */}
                <PromptItem
                  className="promptitem"
                  prompt={element}
                  itemSelected={handlePromptSelected}
                  saveAction={() => console.log("Buy btn clicked")}
                ></PromptItem>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // width: 100%;
  // height: 100%;
  background-color: transparent;
  // align-content: center;
  // padding-top: 1rem;
  .horizontalspacingvsmall {
    width: 0.5rem;
  }

  .horizontalspacingvmedium {
    width: 1rem;
  }
  .horizontalspacingvlarge {
    width: 1.5rem;
  }

  .detailsdiv {
    position: relative;
    // background-color: yellow;
    display: flex;
    flex-direction: row;
    .leftmenudiv {
      height: 20rem;
      width: 12rem;
      background-color: #00c28c10;
      display: flex;
      padding-left: 2rem;
      flex-direction: column;
      gap: 1.5rem;
      text-align: left;
      justify-content: center;
      align-items: left;
      border-radius: 1rem;
      button {
        text-align: left;
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
      }
      .btnmenuselected {
        text-align: left;
        background-color: transparent;
        border: none;
        color: #00c28c;
        cursor: pointer;
      }
      .logoutbtn {
        color: #ff124b;
      }
    }
  }
`;

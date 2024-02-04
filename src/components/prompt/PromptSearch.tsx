import React from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import SearchBar from "./Searchbar";
import PromptSearchItem from "./promptsearchitem";

import { API_PATH } from "utils/lib/constants";

import "reactjs-popup/dist/index.css";

type PromptSearchProps = {};

export default function PromptSearch({}: PromptSearchProps) {
  const [prompts, setPrompts] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any>(null);
  const [search, setSearch] = React.useState("");
  const [previousSearch, setPreviousSearch] = React.useState("");
  const [timerSearch, setTimerSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let timeoutId: any;

  React.useEffect(() => {
    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));
    setUser(u);
    loadPrompts(u);
  }, []);

  React.useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setPrompts([]);
      setTimerSearch(search);
      loadPrompts(user);
      // fetchData();
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [search]);

  function delay(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const searchApi = async (user: any) => {
    clearTimeout(timeoutId);
    setPrompts([]);
    setTimerSearch(search);

    timeoutId = setTimeout(async () => {
      console.log("Searching ...", search);
      try {
        loadPrompts(user);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 400);
  };

  const loadPrompts = async (user: any) => {
    // console.log("In Load Prompts. Remove return statement when implemented")
    console.log("Tokan in get Prompts " + user.token);
    const config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    var offset = 0;
    if (search == previousSearch) {
      offset = prompts.length;
    } else {
    }

    const route =
      API_PATH.GetPromptsList + `?offset=${offset}${search != "" ? `&search=${search}` : ""}`;
    console.log(route);
    setLoading(true);
    axios
      .get(route, config)
      .then((res) => {
        setLoading(false);
        console.log("Data is ");
        console.log(res.data.data.prompts);
        // setMessages(res.data.data)

        res.data.data.prompts.map((m: any) => {
          setPrompts((prevState) => [...prevState, m]);
        });
        setPreviousSearch(search);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handlePromptSelected = (prompt: any) => {
    console.log("Prompts");
  };

  const searchTextChanged = (text: any) => {
    console.log("Search text ", text);
    setSearch(text);
  };

  return (
    <div className="flex-col justify-left w-7/12 ml-40 h-full">
      <SearchBar textChanged={searchTextChanged} />
      <div className="flex-col overflow-y-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 mt-5">
          {prompts.length > 0 &&
            prompts.map((element) => {
              return (
                <div className="rounded bg-appgreen p-0 " key={element.id}>
                  <PromptSearchItem
                    className="promptitem"
                    prompt={element}
                    itemSelected={handlePromptSelected}
                  />
                </div>
              );
            })}
          {prompts.length === 0 && !loading && (
            <div className="flex flex-col h-full w-full justify-center items-center ">
              <h4 className="text-white">No Prompts Matching Search</h4>
            </div>
          )}
          {loading && (
            <div className="flex flex-row h-full w-full justify-center items-center gap-2">
              <CircularProgress />
              <h4 className="text-white">Loading...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

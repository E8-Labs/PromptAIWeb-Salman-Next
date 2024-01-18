import React, { useEffect, useState } from 'react'
import PromptItem from './PromptItem'
import PromptSearchItem from './promptsearchitem';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';

import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css'; 
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'

import axios from 'axios';
import ApiPath from '../../lib/ApiPath';
// import { useScroll } from 'framer-motion';
import SearchBar from './Searchbar';

const PlusIcon = "/whiteplusicon.svg";


function Promptsearch(props) {
    const [prompts, setPrompts] = useState([])
    const [user, setUser] = useState(null)
    const [search, setSearch] = useState('')
    const [previousSearch, setPreviousSearch] = useState('')
    const [timerSearch, setTimerSearch] = useState('')
    const [loading, setLoading] = useState(false)
    let timeoutId;

    useEffect(()=>{
        const u = JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
        setUser(u)
        loadPrompts(u)
    }, [])

    // useEffect(()=>{
        
    //     if(search != ''){
    //         searchApi(user)
    //     }
    // }, [search])

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
          // Perform the search request with the current query
           setPrompts([])
            setTimerSearch(search)
            loadPrompts(user)
          fetchData();
        }, 500); // Set the delay to 100ms
    
        // Cleanup function to clear the timeout when component unmounts or when query changes
        return () => clearTimeout(delayedSearch);
      }, [search]);

    function delay(ms) {
        return new Promise((resolve) => {
           setTimeout(resolve, ms);
        })
     }


     const searchApi = async(user) =>{
        clearTimeout(timeoutId);
        setPrompts([])
        setTimerSearch(search)
        
        timeoutId = setTimeout(async () => {
            console.log("Searching ...", search)
            try {
              loadPrompts(user)
            } catch (error) {
              console.error('Error fetching search results:', error);
            }
          }, 400);

     }



     
    const loadPrompts = async(user) => {
        // console.log("In Load Prompts. Remove return statement when implemented")
              console.log("Tokan in get Prompts " + user.token)
            const config = {
                headers:{
                  "Authorization": "Bearer " + user.token,
                }
              };
              var offset = 0;
              if(search == previousSearch){
                offset = prompts.length
              }
              else{

                
              }

              const route = ApiPath.GetPromptsList + `?offset=${offset}${search != '' ? `&search=${search}` : ''}`;
              console.log(route)
              setLoading(true)
            axios.get(route, config)
            .then(res=> {
              setLoading(false)
              console.log("Data is ")
                console.log(res.data.data.prompts)
                // setMessages(res.data.data)
                
                res.data.data.prompts.map((m, index) =>{
                    setPrompts((prevState) =>
                        [...prevState, m]
                        )
                })
                setPreviousSearch(search)
            })
            .catch(err=> {
              setLoading(false)
              console.log(err)
            })
        
        
    }

    const handlePromptSelected = (prompt) =>{
        console.log("Prompts")
    }

    const searchTextChanged = (text) => {
        console.log("Search text ", text)
        setSearch(text)
    }

    


  return (
    <div className='flex-col justify-left w-7/12 ml-40 h-full'>
        <SearchBar textChanged={searchTextChanged}/>
        <div className='flex-col overflow-y-auto h-full'>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 mt-5" >
                    {
                      
                        prompts.length > 0 &&(
                          prompts.map((element, index) => {
                            // <label>{element}</label>
                            {
                              console.log(element)
                            }
                                return(
                                    <div className="rounded bg-appgreen p-0 " key={element.id}>
                                        <PromptSearchItem className='promptitem' prompt={element}  itemSelected = {handlePromptSelected}></PromptSearchItem>
                                    </div>
                                )
                            })
                        )
                    }
                    {
                      (prompts.length === 0 && !loading) &&(
                        <div className='flex flex-col h-full w-full justify-center items-center '>
                          <h4 className='text-white'>No Prompts Matching Search</h4>
                        </div>
                      )
                    }
                    {
                      loading &&(
                        <div className='flex flex-row h-full w-full justify-center items-center gap-2'>
                          
                          <CircularProgress />
                          <h4 className='text-white'>Loading...</h4>
                        </div>
                        
                      )
                    }
            </div>
        </div>
    </div>
  )
}

export default Promptsearch

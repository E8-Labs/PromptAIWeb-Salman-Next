import React, { useState } from 'react'
import PromptItem from './PromptItem'
import Image from 'next/image';
import { Backdrop, CircularProgress, Menu, MenuItem, Drawer, Box, Divider } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'
import YouTubeLikeLoading from './LoadingView';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import ApiPath from '@/app/lib/ApiPath';
import ProfileBaseView from '../profile/Profile';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  capitalize
} from '@mui/material';

// import {makeStyles} from '@mui/styles';

const PlusIcon = "/whiteplusicon.svg";

const customStyles = {
  overlay: {
    background: "#00000090"
  },
  content: {
    background: "#00000090",
    border: "none"
  },
};

// const useStyles = makeStyles({
//   pokemonCardsArea: {
//     paddingTop: "30px",
//     paddingLeft: "15%",
//     paddingRight: "15%",
//     width: "100%"
//   },
//   pokemonImage: {
//     height: "160px",
//     width: "160px"
//   },
//   progress: {
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     marginTop: "-100px",
//     marginLeft: "-100px"
//   }
// });

const PromptsListDashboard = (props) => {
  // const classes = useStyles()
  const prompts = props.prompts
  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
  // const [promptMenu, setPromptMenu] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chatViewVisible, setChatViewVisible] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)
  const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [otherUserProfile, setOtherUserProfile] = useState(null)


  const categories = [
    { name: 'Content Writing', id: 1 },
    { name: 'Lifestyle', id: 2 },
    { name: 'Health & Wellness', id: 3 },
    { name: 'Techonology', id: 4 },
    { name: 'Enterpreneurship', id: 5 },
    { name: 'Marketing', id: 6 },
  ];


  const subcategories = [
    { name: 'Content Writing Sub 1', id: 1 },
    { name: 'Lifestyle Sub 1', id: 2 },
    { name: 'Health & Wellness Sub 1', id: 3 },
    { name: 'Techonology Sub 1', id: 4 },
    { name: 'Enterpreneurship Sub 1', id: 5 },
    { name: 'Marketing Sub 1', id: 6 },
  ];

  const handleLoadingClose = () => {
    setLoading(false)
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setPromptQuestionDeialogueVisible(false);
  }



  const handlePromptSelected = (prompt) => {
    //console.log("Prompt in List PromptsListDashboard" + prompt.title + " Clicked")

    setCurrentSelectedPrompt(prompt)
    if (prompt.questions.length == 0) {
      createChat(prompt)
    }
    else {
      console.log("PromptListDashboard: Prompt before sending to questions ", prompt)
      setPromptQuestionDeialogueVisible(true)
    }
    // props.handlePromptSelected(prompt)
  }

  const createChat = (prompt) => {

    setCurrentSelectedPrompt(prompt)
    setPromptQuestionDeialogueVisible(false)
    console.log("PromptListDashboard: Prompt after sending to questions ", prompt)
    //console.log(prompt)
    //console.log("Length is " + prompt.questions.length);
    let text = prompt.prompt;
    for (let i = 0; i < prompt.questions.length; i++) {
      let q = prompt.questions[i];
      text = text.replace(`[${q.question}]`, q.answer);
    }
    prompt.prompt = text;
    // create chat api
    const u = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
    )
    //console.log(u)
    const config = {
      headers: {
        "Authorization": "Bearer " + u.token,
      }
    };
    const data = { promptId: currentSelectedPrompt.id };
    setLoading(true)
    axios.post(ApiPath.CreateChat, data, config)
      .then(data => {
        setLoading(false)
        //console.log("Chat create response")
        //console.log(data.data)
        if (data.data.status) {
          let chat = data.data.data; //chat data
          let isNew = true
          if (data.data.message === "Chat already exists") {
            isNew = false;
          }
          chat.isNew = isNew
          setCurrentChat(chat)
          props.handlePromptSelected(prompt, chat)
          // setChatViewVisible(true)
        }
        else {

        }


      })
      .catch(error => {
        //console.log(error)
      })
    //console.log(text)
  }



  const renderCards = (prompt) => {

    return (
      <Grid key={prompt.id} item xs={12} sm={6} md={4} lg={3}>
        <div className="rounded bg-appgreen p-0 " >
          <PromptItem className='promptitem' prompt={prompt} itemSelected={(item) => {
            handlePromptSelected(item)
            // setAnchorEl(event.currentTarget);
          }} profileClicked={() => {
            setOtherUserProfile(prompt.user)
            console.log("Profile tapped ", prompt.user.username)
          }}></PromptItem>


        </div>
      </Grid>
    );
  };




  return (

    <div className="flex-col">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleLoadingClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <PromptChatView chatViewVisible={chatViewVisible} newChat={true} chat={currentChat} prompt={currentSelectedPrompt}/> */}

      <Modal
        isOpen={promptQuestionDialogueVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Prompt Questions"
      >
        <PromptChatQuestionsPopup onClose={() => {
          setPromptQuestionDeialogueVisible(false)

        }} prompt={currentSelectedPrompt} onPublish={createChat} />
      </Modal>

      <div className='flex items-center justify-between p-4'>
        <div className='flex  gap-4  h-20 items-center'>
          <div className='flex flex-col p-1 px-2 w-60' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
            <label className='flex-none text-rubik font-medium text-base mb-1' style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
              Category
            </label>
            <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
              {
                categories.map(item => {
                  {
                    //console.log(item)
                  }
                  return (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>

          <div className='flex flex-col p-1 px-2 w-60' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
            <label className='flex-none text-rubik font-medium text-base mb-1' style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
              Subategory
            </label>
            <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
              {
                subcategories.map(item => {
                  {
                    //console.log(item)
                  }
                  return (
                    <option value={item.name}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
        </div>


        <div className="flex items-center justify-center bg-appgreenlight p-3 md:rounded-full md:px-5  gap-2 cursor:pointer text-sm md:text-base lg:text-lg xl:text-xl"  onClick={() => {
          props.handleAddAction()
        }}>
          {/* Third View */}
          <Image src={PlusIcon} width={15} height={15}></Image>
          <div className=' cursor:pointer'>
            <p className="text-lg  cursor:pointer d-none md:d-inline " >New Prompt</p>
          </div>
        </div>

      </div>
      {
        prompts.length == 0 && (
          <YouTubeLikeLoading />
        )
      }

      {
        prompts.length > 0 && (
          <div className=' overflow-y-auto'>
          <InfiniteScroll
            dataLength={prompts.length}
            next={()=>{
              console.log("Next data")
            }}
            hasMore={true}
            scrollThreshold={1}
            // loader={<LinearProgress />}
            // Let's get rid of second scroll bar
            style={{ overflow: "unset" }}
          >
            <Grid container spacing={4} className=''>
              {prompts.map((prompt, index) => renderCards(prompt))}
            </Grid>
          </InfiniteScroll>
        </div>
          
        )
      }
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            // elevation: 8,
            boxShadow: "-1px 0px 15px 0px #00C28C30;"
          }
        }}
        anchor={"right"}
        open={otherUserProfile != null}
        onClose={() => {
          setOtherUserProfile(null)
        }}
      >
        <Box
          sx={{ width: 650, bgcolor: 'black', padding: 5 }}
          // role="presentation"
          onClick={() => {
            // setOtherUserProfile(null)
          }}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
          {/* <p>This is side menu</p> */}
          {
            otherUserProfile != null && (
              <ProfileBaseView user={{ user: otherUserProfile, token: "" }} />
            )
          }
          {

          }
        </Box>

      </Drawer>
    </div>
  )
}

export default PromptsListDashboard

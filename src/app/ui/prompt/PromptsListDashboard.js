import React, { useEffect, useState } from 'react'
import PromptItem from './PromptItem'
import Image from 'next/image';
import {
  Backdrop, CircularProgress, Menu, MenuItem, Drawer, Box, Icon,
  Divider, Autocomplete, Chip, Button, Stack, IconButton, createTheme
} from '@mui/material';
import { CustomTextField } from '../customcomponents/CustomTextField';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'
import YouTubeLikeLoading from './LoadingView';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import ApiPath from '../../lib/ApiPath';
import ProfileBaseView from '../profile/Profile';
import categories from '../../lib/categories';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  capitalize
} from '@mui/material';
import TurnedInIcon from '@mui/icons-material/TurnedIn'; // Save Icon

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




const PromptsListDashboard = (props) => {
  // const classes = useStyles()
  const starIcon = (
    <Icon>
      <img alt="all" src="/assets/star.svg" />
    </Icon>
  );
  const createdIcon = (
    <Icon>
      <img alt="all" src="/assets/created.svg" />
    </Icon>
  );
  const prompts = props.prompts

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(props.isLoadingPrompts);
  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [subCategoriesSelected, setSubCategoriesSelected] = useState([])

  // const [promptMenu, setPromptMenu] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chatViewVisible, setChatViewVisible] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)
  const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [otherUserProfile, setOtherUserProfile] = useState(null)
  const [topicsForCategories, setTopicsForCategories] = useState([])





  useEffect(() => {
    console.log("IsLoading ", props.isLoadingPrompts)
  }, [props.isLoadingPrompts])

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

    <div className=" flex-col h-full w-full overflow-y-none ">
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

      
      <div className='flex flex-row items-center flex-grow justify-between items-start p-4 '>
        
      <Stack direction={'row'} className='gap-3'>
        <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={starIcon} style={{
          // borderRadius: '20%',
          backgroundColor: `${props.promptListMenuSelected === "All" ? '#FFAD0E30' : '#FFAD0E00'}`,
          // padding: "18px 36px",

          fontSize: "14px",
          fontWeight: 600
        }} onClick={() => props.setSelectedMenu("All")}>
          All
        </Button>

        <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={<TurnedInIcon />} style={{
          // borderRadius: '20%',
          backgroundColor: `${props.promptListMenuSelected === "Saved" ? '#FFAD0E30' : '#FFAD0E00'}`,
          // padding: "18px 36px",

          fontSize: "14px",
          fontWeight: 600
        }} onClick={() => props.setSelectedMenu("Saved")}>
          Saved
        </Button>

        <Button className='rounded-xl p-2 px-6' variant="contained" startIcon={createdIcon} style={{
          // borderRadius: '20%',
          backgroundColor: `${props.promptListMenuSelected === "Created" ? '#FFAD0E30' : '#FFAD0E00'}`,
          // padding: "18px 36px",

          fontSize: "14px",
          fontWeight: 600
        }} onClick={() => props.setSelectedMenu("Created")}>
          Created
        </Button>
      </Stack>

        <div className="flex items-center justify-center bg-appgreenlight p-3 md:rounded-full md:px-5  gap-2 cursor:pointer text-sm md:text-base lg:text-lg xl:text-xl" onClick={() => {
          props.handleAddAction()
        }}>
          {/* Third View */}
          <Image src={PlusIcon} width={15} height={15}></Image>
          <div className=' cursor:pointer'>
            <p className="text-lg text-white  cursor:pointer d-none md:d-inline " >New Prompt</p>
          </div>
        </div>

      </div>
      <div className={`flex flex-grow gap-4   items-center ${props.promptListMenuSelected === "All" ? "" : "hidden"}`}>
          <Autocomplete
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            options={categories}
            getOptionLabel={(option) => option.name}
            // defaultValue={[categories[0]]}
            sx={{ "label": { color: "white" }, maxHeight: '120px', width: '15rem', color: 'white', 'input': { color: 'white' }, marginBottom: '10px' }}
            renderInput={(params) => (
              <CustomTextField {...params} label="Categories" placeholder="Categories"
                sx={{ "label": { color: "gray" }, color: 'white' }}
              />
            )}
            ChipProps={{ color: 'primary' }}
            onChange={(event, newValue) => {
              console.log(newValue)
              let array = []
              newValue.forEach((item) => {
                item.subcategories.forEach((topic) => {
                  array = [...array, topic]
                })

              })
              console.log("Topics", array)
              setTopicsForCategories(array)
              setCategoriesSelected(newValue)
              props.setCategoriesSelected(newValue)
            }}

            renderTags={
              (value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                  key={option.id}
                    className={'bg-appgreenlight text-lg'}
                    variant="filled"
                    sx={{ backgroundColor: '#00C28C', color: 'white' }}
                    label={`${option.name}`}
                    {...getTagProps({ index })}
                  />
                ))
            }

          />

          <Autocomplete
            multiple
            limitTags={1}
            id="multiple-limit-tags"
            options={topicsForCategories}
            getOptionLabel={(option) => option.name}
            // defaultValue={[categories[0]]}
            sx={{ "label": { color: "white" }, maxHeight: '120px', width: '15rem', color: 'white', 'input': { color: 'white' }, marginBottom: '10px' }}
            renderInput={(params) => (
              <CustomTextField {...params} label="Topics" placeholder="Topics"
                sx={{ "label": { color: "gray" }, color: 'white' }}
              />
            )}
            ChipProps={{ color: 'primary' }}
            onChange={(event, newValue) => {
              console.log(newValue)
              setSubCategoriesSelected(newValue)
              props.setSubCategoriesSelected(newValue)
              // updateFormData({ categories: newValue })
            }}
            renderTags={
              (value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                  key={option.id}
                    className={'bg-appgreenlight text-lg'}
                    variant="filled"
                    sx={{ backgroundColor: '#00C28C', color: 'white' }}
                    label={`${option.name}`}
                    {...getTagProps({ index })}
                  />
                ))
            }
          />
        </div>
      {
        props.isLoadingPrompts && (
          <YouTubeLikeLoading />
        )
      }

      {
        prompts.length > 0 && (
          <div className=' overflow-y-auto  mt-3 pr-2 py-6' style={{height: '80vh'}}>
            <InfiniteScroll
              dataLength={prompts.length}
              next={() => {
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
      {
        (!props.isLoadingPrompts && prompts.length == 0) && (

          <div className='flex justify-center items-center w-full' style={{ height: '70vh' }}>

            <Typography variant="h6" gutterBottom sx={{ color: '#ffffff50' }}>
              No prompts to show
            </Typography>
          </div>
        )
      }
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            // elevation: 8,
            // boxShadow: "-1px 0px 15px 0px #00C28C30;"
          }
        }}
        anchor={"right"}
        open={otherUserProfile != null}
        onClose={() => {
          setOtherUserProfile(null)
        }}
      >
        <Box
          sx={{ width: windowSize.width, bgcolor: 'black', padding: 5 }}
          // role="presentation"
          onClick={() => {
            // setOtherUserProfile(null)
          }}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
          {/* <p>This is side menu</p> */}
          {
            otherUserProfile != null && (
              <ProfileBaseView user={{ user: otherUserProfile, token: "" }} closeProfileView={()=> {
                setOtherUserProfile(null)
              }}/>
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

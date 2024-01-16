// pages/promptOverview.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Modal from 'react-modal';
import StackMultiFormPopup from './stackprompt/StackPromptCreation';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PendingSharpIcon from '@mui/icons-material/PendingSharp';
import SaveIcon from '@mui/icons-material/Save';


import ApiPath from '../../../lib/ApiPath';



const infoIcon = "/info icon green.png";
const artIcon = "/art.png";
const PlusIcon = "/whiteplusicon.svg";
// Import other necessary components and styles from Tailwind CSS

const PromptOverview = ({ onNext, formData, updateFormData, onPublish }) => {

  const prompt = formData;
  const [subprompts, setSubPrompts] = useState([prompt]);
  const [subPromptIndex, setSubPromptIndex] = useState(1) // index where the prompt will be added

  const router = useRouter();
  const [promptText, setPromptText] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch user data or perform other initial actions
    loadCurrentUser()
    let sub = subprompts

    prompt.subprompts.forEach(element => {
      sub.push(element)
    });
    console.log("Prompt is ", prompt)
    setSubPrompts(sub)
    console.log("Total Prompts")
    console.log(subprompts)
  }, []);


  const loadCurrentUser = (async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      navigate("/onboarding");
    } else {
      console.log("User is saved in Dashboard")
      console.log(process.env.REACT_APP_LocalSavedUser)

      setUser(

        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
      );
      //   loadUsers(currentUser.token);
    }
  });

  const addSubPrompt = (p) => {
    console.log(`Sub Prompt ${subPromptIndex - 1} added`)
    console.log(prompt)
    setSubPrompts([...subprompts, p])
    setSubPromptIndex(subPromptIndex + 1)
    setPopupOpen(false)
  }

  function openModal() {
    setPopupOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setPopupOpen(false);
  }

  const handleNextBtnTap = async () => {
    let cats = [{ id: 1, "name": "Content Writing" }]
    prompt.categories = cats;
    let data = {
      title: prompt.title,
      description: prompt.description,
      prompt: prompt.promptText,
      model: "gpt-3",
      is_public: prompt.privacy === "public",
      questions: prompt.promptQuestions,
      categories: cats,
      subcategories: cats
    }


    let subs = []
    if (subprompts && subprompts.length > 1) { // > 1 because the first prompt is the main prompt in the list
      for (let i = 0; i < subprompts.length; i++) {
        let p = subprompts[i]
        let sub = {
          title: p.title,
          prompt: p.promptText,
          questions: prompt.promptQuestions
        }
        subs.push(sub)
      }
    }
    data.subprompts = subs
    console.log("Prompt data")
    console.log(data);
    // setIsLoading(true)
    if (user) {
      try {

        console.log(user)
        if (user) {
          const config = {
            headers: {
              "Authorization": "Bearer " + user.token,
            }
          };
          console.log("User obtained")
          setIsLoading(true)
          axios.post(ApiPath.CreatePrompt, data, config)
            .then(data => {
              setIsLoading(false)
              console.log("Request processed")
              console.log(data.data)
              onPublish()
              // let toast = Toast.show('Prompt created', {
              //     duration: Toast.durations.LONG,
              //   });
              if (data.data.status === true) {
                // navigation.navigate("Dashboard")
                //     name: 'PromptOverview',
                // params: { prompt: parentPrompt },
                // merge: true,
                closeModal()
              }
              else {
                console.log(data.data.message)
                // Alert.alert("Error " + data.data.message)
              }
            }).catch(error => {
              console.log("Exception ", error)
              setIsLoading(false)
              // Alert.alert("Error " + error)

            })
        }
      }
      catch (error) {
        console.log("exception " + error)
      }
    }
    else {
      console.log("User not authenticated")
    }
  };

  const handleAddNewPromptBtnTap = () => {
    // Handle add new prompt button tap
    setPopupOpen(true)
  };

  const handleBackTap = () => {
    // Handle back button tap
    router.back();
  };
  const handleLearnPromptClick = () => {

  }

  return (
    <div className='flex-col flex w-full p-2 b h-full overflow-hidden'>
      <Modal
        isOpen={isPopupOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StackMultiFormPopup onClose={() => {
          setPopupOpen(false)
        }} addSubPrompt={addSubPrompt} />
      </Modal>
      <div className='flex gap-2 mt-10 items-center'>
        <h1 className='' style={{ fontSize: 18, fontWeight: 'BOLD' }}>Stack a prompt</h1>
        <label className='' style={{ fontSize: 12, }}>{"(optional)"}</label>
      </div>
      <div className="flex gap-1 my-1 items-center" style={{ width: '100%', marginLeft: -3 }}>

        <Image className='' src={infoIcon} width={25} height={10}
        >
        </Image>
        <div className="flex-col justify-center items-center">
          <p className="cursor-pointer underline bg-gray" onClick={handleLearnPromptClick}
            style={{ fontSize: 12 }}>
            Learn more about prompts
          </p>

        </div>
      </div>

      <div className="flex items-center justify-center  w-full" style={{ width: '100%', height: "82%" }}>
        <div className='overflow-y-auto  items-center ' style={{ width: '100%', height: '100%' }}>
          {
            subprompts.map((element, index) => (
              <PromptOverViewTile key={index} user={user} prompt={element} showButton={index === subprompts.length - 1}
                addPromptAction={() => {
                  // Start stack prompt flow
                  console.log("Add Sub prompt here");
                  handleAddNewPromptBtnTap();
                }} />
            ))
          }
        </div>
      </div>

      {/* <div className='flex w11/12 justify-end cursor-pointer mt-2'>
        <div className="flex items-center justify-center bg-appgreenlight p-3 px-2 gap-2" style={{ borderRadius: '2rem', width: "10rem" }} onClick={() => {
          handleNextBtnTap()
        }}>
          <div className=''>
            <p className="text-lg" >Create Prompt</p>
          </div>
          
        </div>
      </div> */}
      <LoadingButton onClick={()=>{
        handleNextBtnTap()
      }}
          // className={'rounded-full'}
            loading={isLoading}
            // loadingPosition="start"
            loadingIndicator="Creating...."
            startIcon={<SaveIcon />}
            variant="contained" style={{ backgroundColor: '#00C28C' }}
          >
            Create Prompt
          </LoadingButton>
    </div>
  );
};



const PromptOverViewTile = ({ prompt, showButton, addPromptAction }) => {


  const [user, setUser] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log("Details of prompt")
  console.log(prompt)

  useEffect(() => {
    // Fetch user data or perform other initial actions
    loadCurrentUser()

  }, []);

  useEffect(() => {
    console.log("User obtained ", user)
  }, [user])


  const loadCurrentUser = (async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LocalSavedUser)) {
      // navigate("/onboarding");
    } else {
      console.log("User is saved in Dashboard")
      // console.log(process.env.REACT_APP_LocalSavedUser)

      setUser(

        JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
      );
      //   loadUsers(currentUser.token);
    }
  });
  const handleLearnPromptClick = () => {

  }

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddAction = () => {
    addPromptAction();
  }

  return (
    <div className='flex-col items-center justify-center w-full'>
      <div className='flex flex-col p-1 rounded-3xl  border-gray-100' style={{ borderWidth: '1px', borderColor: 'gray', height: '140px' }}>
        {/* First Row User Image and Name */}
        <div className="flex gap-1 my-1 items-center px-2 cursor-pointer justify-between" >

          <div className='flex'>
            <div style={{ borderRadius: '50%', overflow: 'hidden', width: '30px', height: '30px' }}>
              <Image className=' rounded-full' src={user ? user.user.profile_image : ''}
                objectFit="cover"
                width="30"
                height="30"
              >
              </Image>
            </div>
            <div className="flex-col justify-center items-center">
              <p className="cursor-pointer underline bg-gray" onClick={handleLearnPromptClick}
                style={{ fontSize: 12 }}>
                @{user ? user.user.username : ''}
              </p>

            </div>
          </div>
          <IconButton onClick={handleClickMenu}>
            <PendingSharpIcon style={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>

          </Menu>
        </div>

        <div className='px-2 cursor-pointer '>
          <h1 className='' style={{ fontSize: 16, fontWeight: 'BOLD' }}>{prompt.title}</h1>
          <p className="cursor-pointer bg-gray" onClick={handleLearnPromptClick}
            style={{ fontSize: 12 }}>
            {prompt.description}
          </p>
        </div>

      </div>
      {/* Add Line here */}
      <div className='flex justify-center items-center'>
        <div style={{ width: '2px', backgroundColor: 'gray', height: '60px' }}></div>
      </div>

      {
        showButton && (
          <div className='flex w11/12 justify-center cursor-pointer'>
            <div className="flex items-center justify-center bg-appgreenlight p-4 px-5 gap-2" style={{ borderRadius: '2rem', width: "12rem" }} onClick={() => {
              handleAddAction()
            }}>
              {/* Third View */}
              <Image src={PlusIcon} width={15} height={15}></Image>
              <div className=''>
                <p className="text-lg" >Add Prompt</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PromptOverview;
const customStyles = {
  overlay: {
    background: "#00000090"
  },
  content: {
    background: "#00000090",
    border: "none"
  },
};
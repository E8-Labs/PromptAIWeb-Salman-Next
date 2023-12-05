// pages/promptOverview.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Modal from 'react-modal';
import StackMultiFormPopup from './stackprompt/StackPromptCreation';



const infoIcon = "/info icon green.png";
const artIcon = "/art.png";
const PlusIcon = "/whiteplusicon.svg";
// Import other necessary components and styles from Tailwind CSS

const PromptOverview = ({onNext, formData, updateFormData }) => {

const prompt = formData;
const [ subprompts, setSubPrompts] = useState([prompt]);

  const router = useRouter();
  const [promptText, setPromptText] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch user data or perform other initial actions
    loadCurrentUser()
    prompt.subprompts.forEach(element => {
      setSubPrompts([...subprompts, element])
    });
    console.log("Total Prompts")
    console.log(subprompts)
  }, []);


  const loadCurrentUser = (async()=>{
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
    // Handle next button tap
    try {
      const response = await axios.post('/api/createPrompt', {
        // Your data here
      });

      console.log('Prompt created:', response.data);

      if (response.data.status) {
        router.push('/dashboard');
      } else {
        // Handle error
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error('Exception:', error);
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
  const handleLearnPromptClick = ()=>{

  }

  return (
    <div className='flex-col flex w-11/12  h-full'>
      <Modal
                  isOpen={isPopupOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <StackMultiFormPopup onClose={()=>{
                    setPopupOpen(false)
                  }}/>
                </Modal>
        <div className='flex gap-2 mt-10 items-center'>
            <h1 className='' style={{fontSize: 18, fontWeight: 'BOLD'}}>Stack a prompt</h1>
            <label className='' style={{fontSize: 12, }}>{ "(optional)"}</label>
        </div>
        <div className="flex gap-1 my-1 items-center" style={{width: '100%', marginLeft: -3}}>
                          
             <Image className='' src={infoIcon} width={25} height={10}
                  >
             </Image>
             <div className="flex-col justify-center items-center">
                <p className="cursor-pointer underline bg-gray" onClick={handleLearnPromptClick}
                style={{fontSize: 12}}>
                    Learn more about prompts
                </p>
               
             </div>
        </div>

        <div className='flex-grow bg-red items-center justify-center' style={{height: '80%'}}>
        {
          subprompts.map((element, index)=> {
            return(
               
                <PromptOverViewTile prompt={element}  showButton={index === subprompts.length - 1} addPromptAction={()=>{
                  //start stack prompt flow
                  console.log("Add Sub prompt here")
                  handleAddNewPromptBtnTap()
                }}/>
              
            )
          })
        }
        </div>
    </div>
  );
};



const PromptOverViewTile = ({prompt, showButton, addPromptAction})=>{

    console.log("Details of prompt")
    console.log(prompt)
    const handleLearnPromptClick = ()=>{
      
    }

    const handleAddAction = ()=>{
      addPromptAction();
    }

    return(
        <div className='flex-col items-center justify-center'>
            <div className='flex flex-col p-1 rounded-3xl  border-gray-100' style={{borderWidth: '1px', borderColor: 'gray', height: '110px'}}>
            {/* First Row User Image and Name */}
                <div className="flex gap-1 my-1 items-center px-2 cursor-pointer" >

                   <div  style={{ borderRadius: '50%', overflow: 'hidden', width: '30px', height: '30px' }}>
                        <Image className='bg-red rounded-full' src={artIcon} 
                            objectFit="cover"
                            width="30"
                            height="30"
                        >
                        </Image>
                   </div>
                   <div className="flex-col justify-center items-center">
                      <p className="cursor-pointer underline bg-gray" onClick={handleLearnPromptClick}
                      style={{fontSize: 12}}>
                          @noah
                      </p>

                   </div>
                </div>

                <div className='px-2 cursor-pointer '>
                    <h1 className='' style={{fontSize: 16, fontWeight: 'BOLD'}}>{prompt.title}</h1>
                    <p className="cursor-pointer bg-gray" onClick={handleLearnPromptClick}
                    style={{fontSize: 12}}>
                        {prompt.description}
                    </p>
                </div>
                
            </div>
            {/* Add Line here */}
            <div className='flex justify-center items-center'>
                <div style={{width: '2px', backgroundColor: 'gray', height: '60px'}}></div>
            </div>

            {
                showButton &&(
                    <div className='flex w11/12 justify-center cursor-pointer'> 
                        <div className="flex items-center justify-center bg-appgreenlight p-4 px-5 gap-2" style={{borderRadius: '2rem', width: "12rem"}} onClick={()=> {
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
  overlay:{
      background: "#00000090"
  },
  content: {
    background: "#00000090",
    border: "none"
  },
};
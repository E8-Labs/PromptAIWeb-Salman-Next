// pages/promptOverview.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import axios from 'axios';



const infoIcon = "/info icon green.png";
const artIcon = "/art.png";
const PlusIcon = "/whiteplusicon.svg";
// Import other necessary components and styles from Tailwind CSS

const PromptOverview = ({onNext, formData, updateFormData }) => {

const prompt = formData;
  const router = useRouter();
  const [promptText, setPromptText] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  useEffect(() => {
    // Fetch user data or perform other initial actions
    loadCurrentUser()
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
    router.push('/stackPromptAddName');
  };

  const handleBackTap = () => {
    // Handle back button tap
    router.back();
  };
  const handleLearnPromptClick = ()=>{

  }

  return (
    <div className='flex-col flex w-11/12  h-full'>
        <div className='flex gap-2 mt-10'>
            <h1 className='' style={{fontSize: 18, fontWeight: 'BOLD'}}>Stack a prompt</h1>
            <label className=''>{ "(optional)"}</label>
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

        <PromptOverViewTile prompt={prompt}  showButton={true}/>
    </div>
  );
};



const PromptOverViewTile = ({prompt, showButton})=>{

    console.log("Details of prompt")
    console.log(prompt)
    const handleLearnPromptClick = ()=>{

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
                              props.handleAddAction()
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

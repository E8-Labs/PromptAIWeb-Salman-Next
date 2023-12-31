import React, {useState} from 'react'
import PromptItem from './PromptItem'
import Image from 'next/image';

import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css'; 
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'

import axios from 'axios';
import ApiPath from '@/app/lib/ApiPath';

const PlusIcon = "/whiteplusicon.svg";

const customStyles = {
    overlay:{
        background: "#00000090"
    },
    content: {
      background: "#00000090",
      border: "none"
    },
  };

const PromptsListDashboard = (props) => {
    const prompts = props.prompts
    const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(false)
    const [chatViewVisible, setChatViewVisible] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)
    const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = useState(false)



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

    function afterOpenModal() {

    }
  
    function closeModal() {
      setPromptQuestionDeialogueVisible(false);
    }

    const handlePromptSelected = (prompt)=>{
        console.log("Prompt in List PromptsListDashboard" + prompt.title + " Clicked")
        
        setCurrentSelectedPrompt(prompt)
        if(prompt.questions.length == 0){
          createChat(prompt)
        }
        else{
          
          setPromptQuestionDeialogueVisible(true)
        }
        // props.handlePromptSelected(prompt)
      }

      const createChat = (prompt) =>{
        setCurrentSelectedPrompt(prompt)
        setPromptQuestionDeialogueVisible(false)
        console.log(JSON.stringify(prompt))
        console.log("Length is " + prompt.questions.length);
        let text = prompt.prompt;
        for(let i = 0; i < prompt.questions.length; i++){
            let q = prompt.questions[i];
            text = text.replace(`[${q.question}]`, q.answer);
        }
        prompt.prompt = text;
        // create chat api
        const u = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LocalSavedUser)
        )
        console.log(u)
        const config = {
            headers:{
              "Authorization": "Bearer " + u.token,
            }
          };
          const data = {promptId: currentSelectedPrompt.id};
        axios.post(ApiPath.CreateChat, data, config)
        .then(data => {
            console.log("Chat create response")
            console.log(data.data)
            if (data.data.status){
                let chat = data.data.data; //chat data
                let isNew = true
                if(data.data.message === "Chat already exists"){
                    isNew = false;
                }
                chat.isNew = isNew
                setCurrentChat(chat)
                props.handlePromptSelected(prompt, chat)
                // setChatViewVisible(true)
            }
            else{

            }
            

        })
        .catch(error => {
            console.log(error)
        })
        console.log(text)
    }
  return (
    
    <div className="flex-col">
        {/* <PromptChatView chatViewVisible={chatViewVisible} newChat={true} chat={currentChat} prompt={currentSelectedPrompt}/> */}

        <Modal
                  isOpen={promptQuestionDialogueVisible}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Prompt Questions"
                >
                  <PromptChatQuestionsPopup onClose={()=>{
                    setPromptQuestionDeialogueVisible(false)

                  }} prompt={currentSelectedPrompt} onPublish={createChat}/>
                </Modal>
        
        <div className='flex items-center justify-between p-4'>
        <div className='flex  gap-4  h-20 items-center'>
            <div className='flex flex-col p-1 px-2 w-60' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                <label className='flex-none text-rubik font-medium text-base mb-1'  style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                    Category
                </label>
                <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
                        {
                            categories.map(item => {
                                {
                                    console.log(item)
                                }
                                return(
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                )
                            })
                        }
                </select>
            </div>

            <div className='flex flex-col p-1 px-2 w-60' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                <label className='flex-none text-rubik font-medium text-base mb-1'  style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                    Subategory
                </label>
                <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
                        {
                            subcategories.map(item => {
                                {
                                    console.log(item)
                                }
                                return(
                                    <option value={item.name}>{item.name}</option>
                                )
                            })
                        }
                </select>
            </div>
        </div>


        <div className="flex items-center justify-center bg-appgreenlight p-4 px-5 w-50 gap-2 cursor:pointer" style={{borderRadius: '2rem'}} onClick={()=> {
            props.handleAddAction()
        }}>
        {/* Third View */}
        <Image src={PlusIcon} width={15} height={15}></Image>
        <div className=' cursor:pointer'>
          <p className="text-lg  cursor:pointer" >New Prompt</p>
        </div>
      </div>

        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" >
                    {
                      
                        prompts.map((element, index) => {
                        // <label>{element}</label>
                        {
                          console.log(element)
                        }
                            return(
                                <div className="rounded bg-appgreen p-0 " key={element.id}>
                                    <PromptItem className='promptitem' prompt={element}  itemSelected = {handlePromptSelected}></PromptItem>
                                </div>
                            )
                        })
                    }
            </div>

    </div>
  )
}

export default PromptsListDashboard

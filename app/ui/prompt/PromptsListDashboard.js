import React, {useState} from 'react'
import PromptItem from './PromptItem'
import Image from 'next/image';

import Popup from 'reactjs-popup'; 
import 'reactjs-popup/dist/index.css'; 
import PromptChatView from './PromptChatView';
import PromptChatQuestionsPopup from './PromptChatQuestions';
import Modal from 'react-modal'

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
        // setChatViewVisible(!chatViewVisible)
        setCurrentSelectedPrompt(prompt)
        setPromptQuestionDeialogueVisible(true)
        // props.handlePromptSelected(prompt)
      }
  return (
    
    <div className="flex-col">
        <PromptChatView chatViewVisible={chatViewVisible} />

        <Modal
                  isOpen={promptQuestionDialogueVisible}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <PromptChatQuestionsPopup onClose={()=>{
                    setPromptQuestionDeialogueVisible(false)
                  }} prompt={currentSelectedPrompt}/>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4" >
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

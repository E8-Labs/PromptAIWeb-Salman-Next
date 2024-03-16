"use client";

// components/Form1.js
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const PromptChatQuestionsPopup = (props) => {
  // prompt, onClose, onPublish
  
    const [currentForm, setCurrentForm] = useState(0);
    const [prompt, setPrompt] = useState(props.prompt)
    const[formComponent, setFormComponent] = useState([PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, 
      PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion, PromptChatSingleQuestion])

    // useEffect(()=> {
    //   for(let i = 0; i < prompt.questions.length; i++){
    //     PromptChatSingleQuestion
    //   }
    // })

    const handleNext = (question) => {
      let p = prompt
      prompt.questions[currentForm] = question
      // let subs = p.subprompts;
      // console.log("Total Subs ", subs.length)
      // for(let i = subs.length - 1; i >= 0; i --){
      //   console.log("Prompt " + subs[i].title + " | " + subs[i].parent_id)
      //   if(subs[i].prompt_id == null){
      //     console.log("Removing with null parent")
      //     subs.splice(i, 1)
      //   }
      // }
      // console.log("Total Subs after ", subs.length)
      // p.subprompts = subs
      // console.log("ChatQuestion: Setting Prompt Handle Next ", p)
      // setPrompt((prevPrompt) => {
      //   let subs = [...prevPrompt.subprompts];
      
      //   // ...
      
      //   return { ...prevPrompt, subprompts: subs };
      // });
        //console.log(`Questions ${prompt.questions.length} currentForm ${currentForm}`)
        if(currentForm < prompt.questions.length - 1){
          setCurrentForm(currentForm + 1);
        }
        else{
          handlePublish(prompt);
        }
      };
    
      const handlePrevious = () => {
        setCurrentForm(currentForm - 1);
      };
    
      const handlePublish = (p) => {
        // Implement publish logic here

//console.log("Publishing prompt ", prompt)
        console.log("ChatQuestion: Prompt after answers ", p)
        props.onPublish(p);
      };
    
      const updateFormData = (newData) => {
        // setFormData({ ...formData, ...newData });
      };

      const FormComponent = formComponent[currentForm]// PromptChatSingleQuestion





      useEffect(()=>{
        console.log("ChatQuestion: Prompt changed", prompt)
        console.log("ChatQuestion: Prompt in Prompt questionaire ", props.prompt)
      }, [prompt])
  return (
    <div className="multi-form-popup  flex w-11/12 xl:w-5/9 lg:w-7/12  mx-auto justify-center items-center my-auto  rounded" 
        style={{height: '70vh', borderRadius: '3rem'}}>
      <div className="flex  flex-col w-9/12 items-center bg-appgreen p-8 rounded-lg">
        <div className='flex justify-between ' style={{width: '100%'}}>
            <h1></h1>
            <h1 className='text-white'>{prompt.title}</h1>
            <button className="close-button" onClick={props.onClose}>
              Close
            </button>
        </div>

        {/* ... (progress bar and other UI elements) */}
        <div className="flex " style={{width: '100%', height: '100%'}}>
          <FormComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPublish={handlePublish}
            // value={prompt.questions[currentForm].answer}
            // formData={formData}
            // updateFormData={updateFormData}
            onClose={props.onClose}
            question={prompt.questions[currentForm]}
          />
        </div>
      </div>
    </div>
  )
}

export default PromptChatQuestionsPopup









const PromptChatSingleQuestion = ({ onNext, onPrevious, question }) => {
  const [answer, setAnswer] = useState("")

 

  const handleNext = () => {
    let q = question
    q.answer = answer
    onNext(q);
  };
  const handleClose = () => {
    onClose();
  };

  return (
        
      <Container1 className='container2 ' style={{width: '100%'}}>
        
        {/* <div className="flex  innercontainer  bg-red items-center justify-center"> */}
        <div className='flex flex-col    overflow-hidden w-11/12 mt-8'>
            
            
            <label>{question.placeholder}</label>
            <div className="flex-col justify-center ">
                <FormContainer className=''>
                    <form className='gap-sm-4 form '>
                        
                        <input className='inputtext' type='text' placeholder={question.placeholder} value={answer} name={question.question} onChange={e => setAnswer(e.target.value)}></input>
                        
                        {
                            // this.getLoadingDiv()
                            // this.state.isLoading ? (this.getLoadingDiv()) : 
                            <button type='button' onClick={handleNext}>Continue</button>
                        }
                        
                    </form>
                </FormContainer>
            </div>
            
        </div>
        
        {/* </div> */}
      </Container1>
  );
};


const Container1 = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
// background-color: #00000020;
.horizontalspacesmall{
    width: 0.5rem;
}
.innercontainer{
    background-color: transparent;
}

.backcontainer{
    
    // flex-direction: column;
    background-color: var(--carousel-background);
     width: 30%;
    height: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    
    .titlediv{
        // background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        h3{
            color: white;
            text-align: center;
        }
    }
}

//hide scrollbar indicators
.backcontainer::-webkit-scrollbar {
    display: none;
}

`;


const FormContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: transparent;
  

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2rem;
    padding: 2rem 2rem;
    .categorydropdown{
        background-color: transparent;
        color: var(--app-primary);
        padding-right: 1rem !important;
    }
    
  }
  .inputtext {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid white;
    border-radius: 1.1rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    
    &:focus {
      border: 0.1rem solid #00C28C;
      outline: none;
    }
    
  }
  textarea {
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid white;
    border-radius: 1.1rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    
    &:focus {
      border: 0.1rem solid #00C28C;
      outline: none;
    }
    
  }
  textarea{
    rows: 5;
  }
  button {
    width: 100%;
    padding: 2rem;
    background-color: #00C28C;
    color: white;
    padding: 1rem;
    border: none;
    font-weight: normal;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    // text-transform: uppercase;
    text-align: center;
    &:hover {
      background-color: #00C28C;
    }
  }
  
`;
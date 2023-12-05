// components/Form1.js
import { useState } from 'react';
import { styled } from 'styled-components';

const PromptTitleForm = ({ onNext, formData, updateFormData }) => {
  const { title, description } = formData;

  const [privacy, setPrivacy] = useState('Public')

  const handleNext = () => {
    onNext();
  };
  const handleClose = () => {
    onClose();
  };

  return (
        
      <Container1 className='container2 ' style={{width: '100%'}}>
        
        {/* <div className="flex  innercontainer  bg-red items-center justify-center"> */}
        <div className='flex flex-col    overflow-hidden w-11/12 mt-8'>
            <div className="flex h-50   justify-center gap-8  items-center justify-center">
                
                <div className={`flex text-white p-2 px-7 rounded-full ${privacy === 'Public' ? 'bg-white-200' : 'bg-transparent'} `} >
                    <button className='align-self-end ms-auto text-white' style={{backgroundColor: 'transparent', border: 'none'}}
                        onClick = {()=>{
                          console.log("Public selected")
                          setPrivacy("Public")
                        }}
                    >Public</button>
                </div>

                <div className={` flex text-white p-2 px-7 rounded-full ${privacy === 'Private' ? 'bg-white-200' : 'bg-transparent'}`}  >
                    <button className='align-self-end ms-auto text-white' style={{backgroundColor: 'transparent', border: 'none'}}
                        onClick = {()=>{
                          console.log("Private selected")
                          setPrivacy("Private")
                        }}
                    >Private</button>
                </div>
            </div>
            
            
            <div className="flex-col justify-center ">
                <FormContainer className=''>
                    <form className='gap-sm-4 form '>
                        
                        <input className='inputtext' type='text' placeholder='Title' name='title' onChange={e => updateFormData({ title: e.target.value })}></input>
                        
                        <textarea className='flex ' rows="7" type='text' placeholder='What’s the objective of the ai model you’re creating: ' 
                            name='objective' onChange={e => updateFormData({ description: e.target.value })}></textarea>
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

export default PromptTitleForm;
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
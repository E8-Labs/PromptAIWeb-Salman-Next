// components/Form1.js
import { useState } from 'react';
import { styled } from 'styled-components';


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

const PromptCategoryForm = ({ onNext, formData, updateFormData }) => {
  

  const handleNext = () => {
    onNext();
  };
  const handleClose = () => {
    onClose();
  };

  return (
        
      <Container1 className='container2 ' style={{width: '100%'}}>
        
        {/* <div className="flex  innercontainer  bg-red items-center justify-center"> */}
        <div className='flex flex-col    overflow-none w-11/12 mt-8'>
            
            
            
            <div className="flex-col justify-center bg-blue-5000">
                <FormContainer className=''>
                    <form className='gap-sm-4 form '>
                        <div className='flex flex-col p-1 px-2 ' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                            <label className='flex-none text-rubik font-medium text-base mb-1 text-appgreenlight'  style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                                Hint
                            </label>
                            <input className='inputtext' type='text' placeholder='Hint' name='hint' onChange={e => updateFormData({ hint: e.target.value })}></input>
                        </div>
                        
                        
                        <div className='flex flex-col p-1 px-2 ' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                            <label className='flex-none text-rubik font-medium text-base mb-1 text-appgreenlight'  style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                                Category
                            </label>
                            <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
                                    {
                                        categories.map(item => {
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

                        <div className='flex flex-col p-1 px-2 ' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                            <label className='flex-none text-rubik font-medium text-base mb-1 text-appgreenlight'  style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                                Topic
                            </label>
                            <input className='inputtext' type='text' placeholder='Topic' name='topic' onChange={e => updateFormData({ topic: e.target.value })}></input>
                        </div>
                        
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

export default PromptCategoryForm;
const Container1 = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: #00000020;
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
    padding: 0rem;
    border: none;
    // border-radius: 1.1rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    
    &:focus {
      border: none;
      outline: none;
    }
    
  }
  textarea {
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
  textarea{
    rows: 10;
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
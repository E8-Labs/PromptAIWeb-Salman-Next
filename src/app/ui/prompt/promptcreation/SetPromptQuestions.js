// components/Form1.js
import { useState } from 'react';
import { styled } from 'styled-components';
import { PageControl } from '../../customcomponents/PageControl';
import Icons from '@/app/lib/Icons';

import { Button, Stack } from '@mui/material';
const SetPromptQuestions = ({ onNext, formData, updateFormData }) => {
  const { promptQuestions } = formData;

  const [privacy, setPrivacy] = useState('Public')

  const handleNext = () => {
    onNext();
  };
  const handleClose = () => {
    onClose();
  };

  const questionUpdated = (question, index, placeholder) => {
    promptQuestions[index].placeholder = placeholder;
    updateFormData({ promptQuestions: promptQuestions })
    // updateFormData({ hint: e.target.value })}
  }

  return (

    <Container1 className='container2 ' style={{ width: '100%' }}>

      {/* <div className="flex  innercontainer  bg-red items-center justify-center"> */}
      <div className='flex flex-col    overflow-none w-11/12 mt-8'>
        <div className="flex-col  h-50 overflow-hidden   justify-center gap-8  items-center justify-center">
          {
            promptQuestions.map((item, index) => {
              return (
                <div className='flex flex-col p-1 px-2 mt-5' key={index} style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                  <label className='flex-none text-rubik font-medium text-base mb-1 text-appgreenlight' style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                    {item.question}
                  </label>
                  <input className='inputtext' type='text' placeholder='Add placeholder text to show' name={item.question} onChange={(e) => questionUpdated(item, index, e.target.value)}></input>
                </div>
              )
            })
          }
        </div>


        <div className="flex w-full  justify-between items-center">
          <Stack direction={'row'} className='' >
            <PageControl selectedIndex={3} pages={6} />
          </Stack>
          {/* <div class="invisible ...">02</div> */}
          <div className="bg-appgreenlight rounded-full p-0">
            <Button variant="contained" className="" endIcon={<Icons.ArrowForwardIcon />}
              sx={{
                bgcolor: '#00C28C', padding: 1.2, paddingX: 2, borderRadius: 10, ":hover": {
                  backgroundColor: "#001812"
                }
              }} onClick={handleNext}>Continue</Button>
          </div>

        </div>

      </div>

      {/* </div> */}
    </Container1>
  );
};

export default SetPromptQuestions;
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


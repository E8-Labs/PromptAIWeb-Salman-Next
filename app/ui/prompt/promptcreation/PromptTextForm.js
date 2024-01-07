// components/Form2.js
import react, { useState } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import { CustomTextField } from "../../customcomponents/CustomTextField";
import { PageControl } from "../../customcomponents/PageControl";


const infoIcon = "/info icon green.png";

const PromptTextForm = ({ onNext, formData, updateFormData }) => {

  const currentIndex = 1
  const promptTextPlaceholder = ` 🪄 This is where the magic happens

  🎩  PRO TIP:
       Ensure your variables are in [Brackets]
             Eg: [Prompt], [Topic], [Subject]
  
       You can have more than one variable 
             Eg: [Language], [Tone], [Age], [Height]
  
       Be detailed and specific; the more context 
  you provide the better the result. 
  
  For more help, click the link below`;



  const [promptText, setPromptText] = useState('');
  const handleNext = () => {
    let text = promptText;
    console.log("Prompt Text ", text)
    const qs = [];
    for (let index = 0; index < promptText.length; index++) {
      let char = promptText[index];
      if (char === '[' && index + 1 < promptText.length) {

        let q = "";
        index += 1;
        char = promptText[index]
        while (char != ']') {

          q += char;
          index++;
          char = promptText[index];
        }
        qs.push({ question: q, placeholder: "" });
      }
    }

    console.log("prompt questions")
    console.log(qs)
    updateFormData({ promptQuestions: qs })
    onNext();
  };


  const handleLearnPromptClick = () => {
    console.log("Prompt Learn text")
  }

  return (
    <div className='flex flex-col    overflow-scroll mt-8' style={{ width: '100%' }}>



      <div className="flex-col mx-auto justify-center bg-transparent items-center w-full ">
        <FormContainer className=''>
          <form className='gap-sm-4 form flex flex-col  mx-auto justify-center items-center  w-11/12'>


            {/* <textarea className="flex bg-transparent custom-scrollbar" rows="12" type='text' placeholder={promptTextPlaceholder}

              name='objective' onChange={e => {
                let text = e.target.value;
                setPromptText(text)
                updateFormData({ promptText: e.target.value })
              }}
            ></textarea> */}

            <CustomTextField
              required
              multiline
              focused
              maxRows={12}
              id="outlined-required"
              label="Description"
              defaultValue=""
              placeholder= {promptTextPlaceholder}
              sx={{ "label": { color: "gray" }, width: '100%' }}
              onChange={e => {
                let text = e.target.value;
                setPromptText(text)
                updateFormData({ promptText: e.target.value })
              }}
            />
            <div className="flex gap-3 my-5 " style={{ width: '100%' }}>
              <Image src={infoIcon} width={25} height={15}></Image>
              <div className="flex-col">
                <p className="cursor-pointer underline" onClick={handleLearnPromptClick}>
                  Learn more about prompts
                </p>
                <div className="h-1 bg-white w-50"></div>
              </div>
            </div>
            <div className="grid grid-cols-3  justify-center items-center">
              <Stack direction={'row'} className='' >
                <PageControl selectedIndex={currentIndex} pages={6} />
              </Stack>
              <div class="invisible ...">02</div>
              <Button className='h-12' variant="contained" style={{ backgroundColor: '#00C28C' }} onClick={handleNext}>Continue</Button>
            </div>

          </form>
        </FormContainer>
      </div>

    </div>
  );
};

export default PromptTextForm;


const FormContainer = styled.div`
  
  
  

 
  

  /* Define custom scrollbar styles */
.custom-scrollbar {
  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  /* Add some padding to maintain the textarea's width */
  padding-right: 17px; /* Adjust as needed */
}

/* Hide scrollbar for WebKit-based browsers (Chrome, Safari, etc.) */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

  
  
  `;
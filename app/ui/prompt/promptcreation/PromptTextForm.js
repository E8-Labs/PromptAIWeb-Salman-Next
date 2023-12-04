// components/Form2.js
import react , {useState} from "react";
import { styled } from "styled-components";
import Image from "next/image";


const infoIcon = "/info icon green.png";

const PromptTextForm = ({ onNext, formData, updateFormData }) => {

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
        for (let index=0; index < promptText.length; index++) {
            let char = promptText[index];
            if(char === '[' && index + 1 < promptText.length){
                
                let q = "";
                index += 1;
                char = promptText[index]
                while(char != ']'){
                    
                    q += char;
                    index++;
                    char = promptText[index];
                }
                qs.push({question: q, placeholder: ""});
            }
        }

        console.log("prompt questions")
        console.log(qs)
        updateFormData({ promptQuestions: qs })
      onNext();
    };


    const handleLearnPromptClick = ()=> {
      console.log("Prompt Learn text")
    }
  
    return (
      <div className='flex flex-col    overflow-none mt-8' style={{width: '100%'}}>
            
            
            
            <div className="flex-col mx-auto justify-center bg-transparent items-center w-11/12 ">
                <FormContainer className=''>
                    <form className='gap-sm-4 form flex flex-col  mx-auto justify-center items-center  w-11/12'>
                        
                        
                        <textarea  className="flex bg-transparent custom-scrollbar" rows="15" type='text' placeholder={promptTextPlaceholder} 
                        
                            name='objective' onChange={e => {
                              let text = e.target.value;
                              setPromptText(text)
                              updateFormData({ promptText: e.target.value })
                            }}
                            ></textarea>
                        <div className="flex gap-3 my-5 " style={{width: '100%'}}>
                          <Image src={infoIcon} width={25} height={15}></Image>
                          <div className="flex-col">
                          <p className="cursor-pointer underline" onClick={handleLearnPromptClick}>
                              Learn more about prompts
                          </p>
                            <div className="h-1 bg-white w-50"></div>
                          </div>
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
    );
  };
  
  export default PromptTextForm; 
  

  const FormContainer = styled.div`
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
// components/Form2.js
import react, { useState } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import Icons from "utils/lib/Icons";
import { CustomTextField } from "components/CustomTextField";
import { PageControl } from "components/PageControl";

const infoIcon = "/info icon green.png";

type PromptTextFormProps = {
  onNext(): void;
  formData: any;
  updateFormData(input: any): void;
};

const PromptTextForm = ({ onNext, formData, updateFormData }: PromptTextFormProps) => {
  const currentIndex = 1;
  const promptTextPlaceholder = ` 🪄 This is where the magic happens

  🎩  PRO TIP:
       Ensure your variables are in [Brackets]
             Eg: [Prompt], [Topic], [Subject]
  
       You can have more than one variable 
             Eg: [Language], [Tone], [Age], [Height]
  
       Be detailed and specific; the more context 
  you provide the better the result. 
  
  For more help, click the link below`;

  const [promptText, setPromptText] = useState("");
  const handleNext = () => {
    let text = promptText;
    console.log("Prompt Text ", text);
    const qs = [];
    for (let index = 0; index < promptText.length; index++) {
      let char = promptText[index];
      if (char === "[" && index + 1 < promptText.length) {
        let q = "";
        index += 1;
        char = promptText[index];
        while (char != "]") {
          q += char;
          index++;
          char = promptText[index];
        }
        qs.push({ question: q, placeholder: "" });
      }
    }

    console.log("prompt questions");
    console.log(qs);
    updateFormData({ promptQuestions: qs });
    onNext();
  };

  const handleLearnPromptClick = () => {
    console.log("Prompt Learn text");
  };

  return (
    <div className="flex flex-col    overflow-scroll mt-8" style={{ width: "100%" }}>
      <div className="flex-col mx-auto justify-center bg-transparent items-center w-full ">
        <div className=" p-2">
          {/* <form className='gap-sm-4 form flex flex-col  mx-auto justify-center items-center  w-11/12'> */}

          <CustomTextField
            required
            multiline
            focused
            maxRows={15}
            minRows={15}
            id="outlined-required"
            label="Description"
            defaultValue={formData.promptText}
            placeholder={promptTextPlaceholder}
            sx={{ label: { color: "gray" }, width: "100%" }}
            onChange={(e) => {
              let text = e.target.value;
              setPromptText(text);
              updateFormData({ promptText: e.target.value });
            }}
          />
          <div className="flex gap-3 my-5 " style={{ width: "100%" }}>
            <Image src={infoIcon} alt="" width={25} height={15}></Image>
            <div className="flex-col">
              <p className="cursor-pointer underline" onClick={handleLearnPromptClick}>
                Learn more about prompts
              </p>
              <div className="h-1 bg-white w-50"></div>
            </div>
          </div>
          <div className="flex w-full  justify-between items-center">
            <Stack direction={"row"} className="">
              <PageControl selectedIndex={1} pages={6} />
            </Stack>
            {/* <div class="invisible ...">02</div> */}
            <div className="bg-appgreenlight rounded-full p-0">
              <Button
                variant="contained"
                className=""
                endIcon={<Icons.ArrowForwardIcon />}
                sx={{
                  bgcolor: "#00C28C",
                  padding: 1.2,
                  paddingX: 2,
                  borderRadius: 10,
                  ":hover": {
                    backgroundColor: "#001812",
                  },
                }}
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </div>

          {/* </form> */}
        </div>
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

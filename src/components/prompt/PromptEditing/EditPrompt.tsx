// components/MultiFormPopup.js
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

import PromptTitleForm from "../promptcreation/PromptTitleForm";
import PromptDescriptionForm from "../promptcreation/PromptTextForm";
import PromptCategoryForm from "../promptcreation/PromptCategoryForm";
import PromptOverViewForm from "../promptcreation/PromptOverViewForm";
import SetPromptQuestions from "../promptcreation/SetPromptQuestions";

import Icons from "utils/lib/Icons";

type EditPromptPopupProps = {
  screenIndex: number;
  prompt: any;
  promptIndex: number;
  onClose(): void;
  editPrompt(data: any, screenIndex: number, promptIndex: number): void;
};

const forms = [
  PromptTitleForm,
  PromptDescriptionForm,
  SetPromptQuestions,
  PromptCategoryForm,
  PromptOverViewForm,
];

const EditPromptPopup = ({
  onClose,
  screenIndex,
  prompt,
  editPrompt,
  promptIndex,
}: EditPromptPopupProps) => {
  const [currentForm, setCurrentForm] = useState(screenIndex);
  const [formData, setFormData] = useState(prompt);

  const handleNext = () => {
    if (screenIndex == 1) {
      setCurrentForm(currentForm + 1);
    } else {
      editPrompt(formData, screenIndex, promptIndex);
    }
  };

  const handlePrevious = () => {
    if (currentForm == 0) {
      onClose();
    } else {
      setCurrentForm(currentForm - 1);
    }
  };

  const handlePublish = () => {
    // TODO: Implement publish logic here
    onClose();
  };

  const updateFormData = (newData: any) => {
    setFormData({ ...formData, ...newData });
  };

  useEffect(() => {
    console.log("New Form Data is ");
    console.log(formData);
  }, [formData]);

  const FormComponent = forms[currentForm];

  return (
    <div
      className="multi-form-popup bg-red flex w-full h-full md:w-[23rem] md:h-[40rem]   mx-auto justify-center items-center my-auto  rounded"
      style={{ borderRadius: "3rem" }}
    >
      <div className="flex  flex-col w-full h-full items-center bg-appgreen p-2  py-4 rounded-lg">
        <div className="flex justify-between items-center" style={{ width: "100%" }}>
          <IconButton onClick={handlePrevious}>
            <Icons.ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <h1 className="text-white text-lg" style={{ fontWeight: "bold" }}>
            Create New Prompt
          </h1>
          <IconButton className="close-button" onClick={onClose}>
            <Icons.CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>

        {/* ... (progress bar and other UI elements) */}
        <div className="flex" style={{ width: "100%", height: "100%" }}>
          <FormComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPublish={handlePublish}
            formData={formData}
            updateFormData={updateFormData}
            onClose={onClose}
            edit={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPromptPopup;

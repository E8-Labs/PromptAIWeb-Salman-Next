// components/MultiFormPopup.js
import { useState } from 'react';
import PromptTitleForm from './PromptTitleForm';
import PromptDescriptionForm from './PromptDescriptionForm';
import PromptCategoryForm from './PromptCategoryForm';
import PromptEnrichForm from './PromptEnrichForm';
import PromptOverViewForm from './PromptOverViewForm';

const forms = [PromptTitleForm, PromptDescriptionForm, PromptCategoryForm, PromptEnrichForm, PromptOverViewForm];

const MultiFormPopup = ({ onClose }) => {
  const [currentForm, setCurrentForm] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hint: '',
    selection1: '',
    selection2: '',
    email: '',
  });

  const handleNext = () => {
    setCurrentForm(currentForm + 1);
  };

  const handlePrevious = () => {
    setCurrentForm(currentForm - 1);
  };

  const handlePublish = () => {
    // Implement publish logic here
    onClose();
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const FormComponent = forms[currentForm];

  return (
    <div className="multi-form-popup flex w-10/12 lg:w-9/12 xl:w-5/12 mx-auto justify-center items-center my-auto bg-appgreen rounded" 
        style={{height: "75vh", borderRadius: '3rem'}}>
      <div className="flex h-5/6  flex-col w-9/12 items-center">
        <h1 className='text-white'>Create Prompt</h1>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        {/* ... (progress bar and other UI elements) */}
        <div className="form-container flex ">
          <FormComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPublish={handlePublish}
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiFormPopup;

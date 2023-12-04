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
    privacy: 'public',
    hint: '',
    categories: [],
    subcategories: [],
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
        <div className='flex justify-between ' style={{width: '100%'}}>
            <h1></h1>
            <h1 className='text-white'>Create Prompt</h1>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
        </div>

        {/* ... (progress bar and other UI elements) */}
        <div className="flex" style={{width: '100%'}}>
          <FormComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onPublish={handlePublish}
            formData={formData}
            updateFormData={updateFormData}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiFormPopup;

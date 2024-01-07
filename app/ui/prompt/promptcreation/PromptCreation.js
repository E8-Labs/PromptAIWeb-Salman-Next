// components/MultiFormPopup.js
import { useEffect, useState } from 'react';
import PromptTitleForm from './PromptTitleForm';
import PromptDescriptionForm from './PromptTextForm';
import PromptCategoryForm from './PromptCategoryForm';
import PromptEnrichForm from './PromptEnrichForm';
import PromptOverViewForm from './PromptOverViewForm';
import SetPromptQuestions from './SetPromptQuestions';

const forms = [ PromptTitleForm, PromptDescriptionForm, PromptCategoryForm, SetPromptQuestions, PromptOverViewForm];

const MultiFormPopup = ({ onClose }) => {
  const [currentForm, setCurrentForm] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    promptText: '', //prompt
    promptQuestions: [],
    privacy: 'public',
    hint: '',
    topic: '',
    categories: [],
    subcategories: [],
    subprompts: []
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

  useEffect(()=>{
    console.log("New Form Data is ")
    console.log(formData)
  }, [formData])

  const FormComponent = forms[currentForm];

  return (
    <div className="multi-form-popup  flex w-11/12 xl:w-5/9 lg:w-5/12  mx-auto justify-center items-center my-auto  rounded" 
        style={{height: '70vh', borderRadius: '3rem'}}>
      <div className="flex  flex-col w-9/12 items-center bg-appgreen p-2  py-4 rounded-lg">
        <div className='flex justify-between ' style={{width: '100%'}}>
            <h1></h1>
            <h1 className='text-white'>Create Prompt</h1>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
        </div>

        {/* ... (progress bar and other UI elements) */}
        <div className="flex" style={{width: '100%', height: '100%'}}>
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

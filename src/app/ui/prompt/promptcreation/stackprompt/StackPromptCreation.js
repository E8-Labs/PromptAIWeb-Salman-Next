// components/MultiFormPopup.js
import { useEffect, useState } from 'react';
import StackPromptTitleForm from './StackPromptTitle';
import StackPromptTextForm from './StackPromptText';
import SetStackPromptQuestions from './StackPromptQuestions';

const forms = [ StackPromptTitleForm, StackPromptTextForm, SetStackPromptQuestions];

const StackMultiFormPopup = ({ onClose, addSubPrompt }) => {
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
    addSubPrompt(formData)
    // onClose();
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  useEffect(()=>{
    console.log("New Sub prompt is ")
    console.log(formData)
  }, [formData])

  const FormComponent = forms[currentForm];

  return (
    <div className="multi-form-popup flex w-full h-full md:w-[23rem] md:h-[40rem] mx-auto justify-center items-center my-auto bg-appgreen rounded" 
        style={{ borderRadius: '3rem'}}>
      <div className="flex  flex-col w-full h-full items-center bg-appgreen p-2  py-4 rounded-lg">
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

export default StackMultiFormPopup;

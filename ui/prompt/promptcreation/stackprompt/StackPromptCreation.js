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

export default StackMultiFormPopup;

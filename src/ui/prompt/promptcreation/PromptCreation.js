"use client";

// components/MultiFormPopup.js
import React, { useEffect, useState } from 'react';
import PromptTitleForm from './PromptTitleForm';
import PromptDescriptionForm from './PromptTextForm';
import PromptCategoryForm from './PromptCategoryForm';
// TODO: Fix PromptOverviewForm, invalid JS that is breaking build
// import PromptOverViewForm from './PromptOverViewForm';
import SetPromptQuestions from './SetPromptQuestions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';

import Icons from '../../../lib/Icons'

// const forms = [PromptTitleForm, PromptDescriptionForm, PromptCategoryForm, SetPromptQuestions, PromptOverViewForm];
const forms = [PromptTitleForm, PromptDescriptionForm, PromptCategoryForm, SetPromptQuestions];

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
    if(currentForm == 0){
      onClose();
    }
    else{
      setCurrentForm(currentForm - 1);
    }
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
    //w-11/12 xl:w-5/9 lg:w-5/12
    <div className="multi-form-popup flex w-full h-full md:w-[23rem] md:h-[40rem]   mx-auto justify-center items-center my-auto  rounded" 
        style={{ borderRadius: '3rem'}}>
      <div className="flex  flex-col w-full h-full items-center bg-appgreen p-2 border-2 border-green-500  py-4 rounded-lg">
        <div className='flex justify-between items-center' style={{width: '100%'}}>
            <IconButton onClick={handlePrevious}>
              <Icons.ArrowBackIcon sx={{color: 'white'}}/>
            </IconButton>
            <h1 className='text-white text-lg' style={{fontWeight: 'bold', }}>Create New Prompt</h1>
            <IconButton className="close-button" onClick={onClose}>
              <Icons.CloseIcon color='white' sx={{color: 'white'}}/>
            </IconButton>
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

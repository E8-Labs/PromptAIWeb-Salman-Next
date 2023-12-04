// components/Form1.js
import { useState } from 'react';

const PromptTitleForm = ({ onNext, formData, updateFormData }) => {
  const { title, description } = formData;

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="form ">
      
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          style={{ borderRadius: '10px', borderColor: '#00C28C' }}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          style={{ borderRadius: '10px', borderColor: '#00C28C' }}
        />
      </label>
      <br />
      <button onClick={handleNext} style={{ backgroundColor: '#00C28C' }}>
        Next
      </button>
    </div>
  );
};

export default PromptTitleForm;

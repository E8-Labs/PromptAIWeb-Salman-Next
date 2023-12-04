// components/Form2.js
import react from "react";


const PromptDescriptionForm = ({ onNext }) => {
    const handleNext = () => {
      onNext();
    };
  
    return (
      <div className="form">
        <h2>Form 2</h2>
        <label>
          Description:
          <textarea style={{ borderRadius: '10px', borderColor: '#00C28C' }} />
        </label>
        <br />
        <button onClick={handleNext} style={{ backgroundColor: '#00C28C' }}>
          Next
        </button>
      </div>
    );
  };
  
  export default PromptDescriptionForm;
  
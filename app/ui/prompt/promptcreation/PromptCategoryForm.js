// components/Form3.js
const PromptCategoryForm = ({ onNext }) => {
    const handleNext = () => {
      onNext();
    };
  
    return (
      <div className="form">
        <h2>Form 3</h2>
        <label>
          Hint Text:
          <input type="text" style={{ borderRadius: '10px', borderColor: '#00C28C' }} />
        </label>
        <br />
        <label>
          Selection 1:
          <select style={{ borderRadius: '10px', borderColor: '#00C28C' }}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <br />
        <label>
          Selection 2:
          <select style={{ borderRadius: '10px', borderColor: '#00C28C' }}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <br />
        <button onClick={handleNext} style={{ backgroundColor: '#00C28C' }}>
          Next
        </button>
      </div>
    );
  };
  
  export default PromptCategoryForm;
  
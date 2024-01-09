// components/Form1.js
import { useState } from 'react';
import { styled } from 'styled-components';
import { Button, Stack, Autocomplete, TextField } from "@mui/material";
import { CustomTextField } from "../../customcomponents/CustomTextField";
import { PageControl } from "../../customcomponents/PageControl";


const categories = [

  { name: 'Lifestyle', id: 2, subcategories: [
    { name: 'Beauty', id: 2 },
  { name: 'Fashion', id: 2 },
  { name: 'Travel', id: 2 },
  { name: 'Life Hacks/Productivity', id: 2},
  ] },

  { name: 'Health & Wellness', id: 3, subcategories: [
    { name: 'Fitness', id: 3 },
  { name: 'Meditation', id: 3 },
  { name: 'Diet/Nutrition', id: 3 },
  { name: 'Dating / Relationship', id: 3 },
  { name: 'Life coaching', id: 3 },
  { name: 'Mental health', id: 3 },
  ] },

  { name: 'Techonology', id: 4, subcategories: [{ name: 'Software Development', id: 4 },
  { name: 'UI/UX', id: 4 },
  { name: 'Dev ops', id: 4 },
  { name: 'Generative AI', id: 4 },
  { name: 'Product(Web, apps, Web3, SaaS', id: 4 },
  { name: 'Support', id: 4 },] },


  { name: 'Marketing & Content writing', id: 5, subcategories: [
    { name: 'SEO / Copywriting', id: 5 },
  { name: 'SEM', id: 5 },
  { name: 'Growth Strategy', id: 5 },
  { name: 'Social Media', id: 5 },
  { name: 'Brading / Design', id: 5 },
  { name: 'Email Marketing', id: 5 },
  { name: 'PR', id: 5 },
  { name: 'Advertising', id: 5 },
  ] },


  { name: 'Business/Enterpreneurship', id: 6, subcategories: [{ name: 'Career Development', id: 6 },
  { name: 'Ecommerce', id: 6 },
  { name: 'Sales / Biz dev', id: 6 },
  { name: 'Finance', id: 6 },
  { name: 'Leadership/Management', id: 6 },
  { name: 'Scaling / Growth', id: 6 },
  { name: 'Strategy', id: 6 },
  { name: 'Product', id: 6 },
  { name: 'Career Coaching', id: 6 },
  { name: 'Personal Development', id: 6 },
  { name: 'HR / Culture', id: 6 },] },
];




const PromptCategoryForm = ({ onNext, formData, updateFormData }) => {
  const [topicsForCategories, setTopicsForCategories] = useState([])
  const currentIndex = 2

  console.log(formData)

  const handleNext = () => {
    onNext();
  };
  const handleClose = () => {
    onClose();
  };

  return (

    <Container1 className='flex justify-center items-center gap-6 pt-5' style={{ width: '100%' }}>

      {/* <div className="flex  innercontainer  bg-red items-center justify-center"> */}
      {/* <div className='flex flex-col    overflow-scroll w-11/12 mt-8'> */}



      {/* <div className="flex-col w-11/12 justify-center items-center bg-blue-5000"> */}
      {/* <FormContainer className=''> */}
      {/* <form className='gap-sm-4 w-full justify-center items-center'> */}
      <CustomTextField
        required
        id="outlined-required"
        label="Hint"
        defaultValue=""
        placeholder='Hint'
        sx={{ "label": { color: "gray" }, width: '80%' }}
        onChange={e => updateFormData({ hint: e.target.value })}
      />


      {/* <div className='flex flex-col p-1 px-2 ' style={{ borderRadius: '15px', borderWidth: '2px', borderColor: '#00C28C' }}>
                <label className='flex-none text-rubik font-medium text-base mb-1 text-appgreenlight' style={{ fontSize: '10px', marginBottom: '0.25rem' }}>
                  Category
                </label>
                <select className='flex-grow appearance-none rounded bg-transparent border-none focus:border-none focus:outline-none w-full'>
                  {
                    categories.map(item => {
                      {
                        console.log(item)
                      }
                      return (
                        <option value={item.name}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div> */}

      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={categories}
        getOptionLabel={(option) => option.name}
        // defaultValue={[categories[0]]}
        sx={{ "label": { color: "white" }, width: '80%', color: 'white', 'input': { color: 'white' } }}
        renderInput={(params) => (
          <CustomTextField {...params} label="Categories" placeholder="Categories"
            sx={{ "label": { color: "gray" }, color: 'white' }}
          />
        )}
        ChipProps={{ color: 'primary' }}
        onChange={(event, newValue) => {
          console.log(newValue)
          let array = []
          newValue.forEach((item) => {
            item.subcategories.forEach((topic)=> {
              array = [...array, topic]
            })
            
          })
          console.log("Topics", array)
          setTopicsForCategories(array)
          updateFormData({ categories: newValue })
        }}

      />

      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={topicsForCategories}
        getOptionLabel={(option) => option.name}
        // defaultValue={[categories[0]]}
        sx={{ "label": { color: "white" }, width: '80%', color: 'white', 'input': { color: 'white' } }}
        renderInput={(params) => (
          <CustomTextField {...params} label="Topics" placeholder="Topics"
            sx={{ "label": { color: "gray" }, color: 'white' }}
          />
        )}
        ChipProps={{ color: 'primary' }}
        onChange={(event, newValue) => {
          console.log(newValue)
          updateFormData({ categories: newValue })
        }}

      />

      <div className="grid grid-cols-3  justify-center items-center">
        <Stack direction={'row'} className='' >
          <PageControl selectedIndex={currentIndex} pages={6} />
        </Stack>
        <div class="invisible ...">02</div>
        <Button className='h-12' variant="contained" style={{ backgroundColor: '#00C28C' }} onClick={handleNext}>Continue</Button>
      </div>

      {/* </form> */}
      {/* </FormContainer> */}
      {/* </div> */}

      {/* </div> */}

      {/* </div> */}
    </Container1>
  );
};

export default PromptCategoryForm;
const Container1 = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
// background-color: #00000020;
.horizontalspacesmall{
    width: 0.5rem;
}
.innercontainer{
    background-color: transparent;
}

.backcontainer{
    
    // flex-direction: column;
    background-color: var(--carousel-background);
     width: 30%;
    height: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    
    .titlediv{
        // background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        h3{
            color: white;
            text-align: center;
        }
    }
}

//hide scrollbar indicators
.backcontainer::-webkit-scrollbar {
    display: none;
}

`;


const FormContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: transparent;
  

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2rem;
    padding: 2rem 2rem;
    .categorydropdown{
        background-color: transparent;
        color: var(--app-primary);
        padding-right: 1rem !important;
    }
    
  }
  
  
`;
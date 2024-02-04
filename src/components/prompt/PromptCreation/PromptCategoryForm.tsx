// components/Form1.js
import { useState } from "react";
import { styled } from "styled-components";
import { Button, Stack, Autocomplete, Chip } from "@mui/material";
import { CustomTextField } from "../../CustomTextField";
import { PageControl } from "../../PageControl";

import { CATEGORIES } from "utils/lib/constants";
import Icons from "utils/lib/Icons";

type PromptCategoryFormProps = {
  formData: any;
  onClose(): void;
  onNext(): void;
  updateFormData(input: any): void;
};

export default function PromptCategoryForm({
  formData,
  onNext,
  onClose,
  updateFormData,
}: PromptCategoryFormProps) {
  const [topicsForCategories, setTopicsForCategories] = useState([]);
  const currentIndex = 2;

  console.log(formData);

  const handleNext = () => {
    onNext();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Container1 className="flex justify-center items-center gap-6 pt-5" style={{ width: "100%" }}>
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={CATEGORIES}
        getOptionLabel={(option) => option.name}
        defaultValue={formData.categories}
        sx={{ label: { color: "white" }, width: "80%", color: "white", input: { color: "white" } }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Categories"
            placeholder="Categories"
            sx={{ label: { color: "gray" }, color: "white" }}
          />
        )}
        ChipProps={{ color: "primary" }}
        onChange={(event, newValue) => {
          console.log(newValue);
          let array: any[] = [];
          newValue.forEach((item) => {
            item.subcategories.forEach((topic: any) => {
              array = [...array, topic];
            });
          });
          console.log("Topics", array);
          setTopicsForCategories(array);
          updateFormData({ categories: newValue });
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              sx={{ backgroundColor: "#00C28C", color: "white" }}
              label={`${option.name}`}
              {...getTagProps({ index })}
              className={"bg-appgreenlight text-lg"}
              key={option.id}
            />
          ))
        }
      />

      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={topicsForCategories}
        getOptionLabel={(option) => option.name}
        defaultValue={formData.subcategories}
        sx={{ label: { color: "white" }, width: "80%", color: "white", input: { color: "white" } }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label="Topics"
            placeholder="Topics"
            sx={{ label: { color: "gray" }, color: "white" }}
          />
        )}
        ChipProps={{ color: "primary" }}
        onChange={(event, newValue) => {
          console.log(newValue);
          updateFormData({ subcategories: newValue });
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              sx={{ backgroundColor: "#00C28C", color: "white" }}
              label={`${option.name}`}
              {...getTagProps({ index })}
              key={option.id}
              className={"bg-appgreenlight text-lg"}
            />
          ))
        }
      />

      <div className="flex w-full  justify-between items-center">
        <Stack direction={"row"} className="">
          <PageControl selectedIndex={currentIndex} pages={6} />
        </Stack>
        <div className="bg-appgreenlight rounded-full p-0">
          <Button
            variant="contained"
            className=""
            endIcon={<Icons.ArrowForwardIcon />}
            sx={{
              bgcolor: "#00C28C",
              padding: 1.2,
              paddingX: 2,
              borderRadius: 10,
              ":hover": {
                backgroundColor: "#001812",
              },
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </Container1>
  );
}

const Container1 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // background-color: #00000020;
  .horizontalspacesmall {
    width: 0.5rem;
  }
  .innercontainer {
    background-color: transparent;
  }

  .backcontainer {
    // flex-direction: column;
    background-color: var(--carousel-background);
    width: 30%;
    height: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;

    .titlediv {
      // background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      h3 {
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
    .categorydropdown {
      background-color: transparent;
      color: var(--app-primary);
      padding-right: 1rem !important;
    }
  }
`;

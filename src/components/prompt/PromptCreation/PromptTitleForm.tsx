import React from "react";
import { styled } from "styled-components";
import { Radio, Stack, Button } from "@mui/material";

import { CustomTextField } from "components/CustomTextField";
import { PageControl } from "components/PageControl";
import Icons from "utils/lib/Icons";

type PromptTitleFormProps = {
  onNext(): void;
  formData: any;
  updateFormData(input: any): void;
};

export default function PromptTitleForm({
  onNext,
  formData,
  updateFormData,
}: PromptTitleFormProps) {
  const [privacy, setPrivacy] = React.useState("Public");

  const handleNext = () => {
    onNext();
  };

  return (
    <Container1 className="container2 " style={{ width: "100%" }}>
      <div className="flex flex-col overflow-hidden w-full md:w-full mt-8">
        <div className="flex h-50 justify-center gap-8  items-center">
          <div
            className={` flex justify-center items-center text-white p-1 px-4 border-2 border-white rounded-md ${privacy === "Public" ? "bg-white-200 border-emerald-400" : "bg-transparent"} `}
          >
            <Radio
              checked={privacy === "Public"}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
              sx={{
                color: "white",
                "&, &.Mui-checked": {
                  color: "#00C28C",
                },
              }}
              onChange={() => {
                console.log("Radio Public clicked");
                setPrivacy("Public");
              }}
            />
            <button
              className="align-self-end ms-auto text-white"
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => {
                console.log("Public selected");
                setPrivacy("Public");
              }}
            >
              Public
            </button>
          </div>

          <div
            className={` flex  justify-center items-center text-white p-1 px-4 border-2 border-white rounded-md ${privacy === "Private" ? "bg-white-200 border-emerald-400" : "bg-transparent"}`}
          >
            <Radio
              checked={privacy === "Private"}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
              sx={{
                color: "white",
                "&, &.Mui-checked": {
                  color: "#00C28C",
                },
              }}
              onChange={() => {
                console.log("Radio Public clicked");
                setPrivacy("Private");
              }}
            />
            <button
              className="align-self-end ms-auto text-white"
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => {
                console.log("Private selected");
                setPrivacy("Private");
              }}
            >
              Private
            </button>
          </div>
        </div>

        <div className="flex-col justify-center w-full ">
          <FormContainer className="">
            <form className="gap-sm-4 form ">
              <CustomTextField
                required
                id="outlined-required"
                label="Title"
                defaultValue={formData.title}
                placeholder="Title"
                sx={{ label: { color: "gray" } }}
                onChange={(e) => updateFormData({ title: e.target.value })}
              />

              <CustomTextField
                style={{ height: 120 }}
                required
                multiline
                maxRows={5}
                id="outlined-required"
                label="Description"
                defaultValue={formData.description}
                placeholder="What’s the objective of the ai model you’re creating:"
                sx={{ label: { color: "gray" } }}
                onChange={(e) => updateFormData({ description: e.target.value })}
              />
              <div className="flex w-full  justify-between items-center">
                <Stack direction={"row"} className="">
                  <PageControl selectedIndex={0} pages={6} />
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
            </form>
          </FormContainer>
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

import React from "react";
import PromptItem from "./PromptItem";
import Image from "next/image";
import {
  Backdrop,
  CircularProgress,
  Drawer,
  Box,
  Icon,
  Autocomplete,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import "reactjs-popup/dist/index.css";
import PromptChatQuestionsPopup from "./PromptChatQuestions";
import Modal from "react-modal";
import YouTubeLikeLoading from "./LoadingView";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import ProfileBaseView from "../profile/Profile";
import { CATEGORIES, API_PATH } from "utils/lib/constants";
import { Grid, Typography } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { CustomTextField } from "components/CustomTextField";

// import {makeStyles} from '@mui/styles';

const PlusIcon = "/whiteplusicon.svg";

const customStyles = {
  overlay: {
    background: "#00000090",
  },
  content: {
    background: "#00000090",
    border: "none",
  },
};

type PromptListDashboardProps = {
  prompts: any;
  isLoadingPrompts: boolean;
  promptListMenuSelected: any;
};

const PromptsListDashboard = ({
  prompts,
  isLoadingPrompts,
  promptListMenuSelected,
}: PromptListDashboardProps) => {
  const starIcon = (
    <Icon>
      <img alt="all" src="/assets/star.svg" />
    </Icon>
  );
  const createdIcon = (
    <Icon>
      <img alt="all" src="/assets/created.svg" />
    </Icon>
  );

  const [currentSelectedPrompt, setCurrentSelectedPrompt] = React.useState(false);
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);
  const [subCategoriesSelected, setSubCategoriesSelected] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chatViewVisible, setChatViewVisible] = React.useState(false);
  const [currentChat, setCurrentChat] = React.useState(null);
  const [promptQuestionDialogueVisible, setPromptQuestionDeialogueVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [otherUserProfile, setOtherUserProfile] = React.useState(null);
  const [topicsForCategories, setTopicsForCategories] = React.useState([]);

  console.log("IsLoading ", isLoadingPrompts);

  const handleLoadingClose = () => {
    setLoading(false);
  };

  function afterOpenModal() {}

  function closeModal() {
    setPromptQuestionDeialogueVisible(false);
  }

  const handlePromptSelected = (prompt: any) => {
    setCurrentSelectedPrompt(prompt);
    if (prompt.questions.length == 0) {
      createChat(prompt);
    } else {
      console.log("PromptListDashboard: Prompt before sending to questions ", prompt);
      setPromptQuestionDeialogueVisible(true);
    }
  };

  const createChat = (prompt: any) => {
    setCurrentSelectedPrompt(prompt);
    setPromptQuestionDeialogueVisible(false);
    console.log("PromptListDashboard: Prompt after sending to questions ", prompt);
    let text = prompt.prompt;
    for (let i = 0; i < prompt.questions.length; i++) {
      let q = prompt.questions[i];
      text = text.replace(`[${q.question}]`, q.answer);
    }
    prompt.prompt = text;
    // create chat api
    const u = JSON.parse(localStorage.getItem(process.env.REACT_APP_LocalSavedUser));
    const config = {
      headers: {
        Authorization: "Bearer " + u.token,
      },
    };
    const data = { promptId: currentSelectedPrompt.id };
    setLoading(true);
    axios
      .post(API_PATH.CreateChat, data, config)
      .then((data) => {
        setLoading(false);
        if (data.data.status) {
          let chat = data.data.data; //chat data
          let isNew = true;
          if (data.data.message === "Chat already exists") {
            isNew = false;
          }
          chat.isNew = isNew;
          setCurrentChat(chat);
          handlePromptSelected(prompt);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderCards = (prompt: any) => {
    return (
      <Grid key={prompt.id} item xs={12} sm={6} md={4} lg={3}>
        <div className="rounded bg-appgreen p-0 ">
          <PromptItem
            prompt={prompt}
            itemSelected={(item) => handlePromptSelected(item)}
            profileClicked={() => {
              setOtherUserProfile(prompt.user);
              console.log("Profile tapped ", prompt.user.username);
            }}
          />
        </div>
      </Grid>
    );
  };

  return (
    <div className=" flex-col h-full w-full overflow-y-none ">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleLoadingClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal
        isOpen={promptQuestionDialogueVisible}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Prompt Questions"
      >
        <PromptChatQuestionsPopup
          onClose={() => {
            setPromptQuestionDeialogueVisible(false);
          }}
          defaultPrompt={currentSelectedPrompt}
          onPublish={createChat}
        />
      </Modal>

      <div className="flex flex-row items-center flex-grow justify-between p-4 ">
        <Stack direction={"row"} className="gap-3">
          <Button
            className="rounded-xl p-2 px-6"
            variant="contained"
            startIcon={starIcon}
            style={{
              // borderRadius: '20%',
              backgroundColor: `${promptListMenuSelected === "All" ? "#FFAD0E30" : "#FFAD0E00"}`,
              // padding: "18px 36px",

              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => setSelectedMenu("All")}
          >
            All
          </Button>

          <Button
            className="rounded-xl p-2 px-6"
            variant="contained"
            startIcon={<TurnedInIcon />}
            style={{
              // borderRadius: '20%',
              backgroundColor: `${promptListMenuSelected === "Saved" ? "#FFAD0E30" : "#FFAD0E00"}`,
              // padding: "18px 36px",

              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => setSelectedMenu("Saved")}
          >
            Saved
          </Button>

          <Button
            className="rounded-xl p-2 px-6"
            variant="contained"
            startIcon={createdIcon}
            style={{
              // borderRadius: '20%',
              backgroundColor: `${promptListMenuSelected === "Created" ? "#FFAD0E30" : "#FFAD0E00"}`,
              // padding: "18px 36px",

              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => setSelectedMenu("Created")}
          >
            Created
          </Button>
        </Stack>

        <div
          className="flex items-center justify-center bg-appgreenlight p-3 md:rounded-full md:px-5  gap-2 cursor:pointer text-sm md:text-base lg:text-lg xl:text-xl"
          onClick={() => {
            props.handleAddAction();
          }}
        >
          {/* Third View */}
          <Image src={PlusIcon} alt="" width={15} height={15}></Image>
          <div className=" cursor:pointer">
            <p className="text-lg text-white  cursor:pointer d-none md:d-inline ">New Prompt</p>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-grow  gap-4   items-center ${promptListMenuSelected === "All" ? "" : "hidden"}`}
      >
        <Autocomplete
          multiple
          limitTags={1}
          id="multiple-limit-tags"
          options={CATEGORIES}
          getOptionLabel={(option) => option.name}
          // defaultValue={[categories[0]]}
          sx={{
            label: { color: "white" },
            height: "40px",
            maxHeight: "120px",
            width: "15rem",
            color: "white",
            input: { color: "white" },
            marginBottom: "10px",
          }}
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
              item.subcategories.forEach((topic) => {
                array = [...array, topic];
              });
            });
            console.log("Topics", array);
            setTopicsForCategories(array);
            setCategoriesSelected(newValue);
            setCategoriesSelected(newValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option.id}
                className={"bg-appgreenlight text-lg"}
                variant="filled"
                sx={{ backgroundColor: "#00C28C", color: "white" }}
                label={`${option.name}`}
                {...getTagProps({ index })}
              />
            ))
          }
        />

        <Autocomplete
          multiple
          limitTags={1}
          id="multiple-limit-tags"
          options={topicsForCategories}
          getOptionLabel={(option) => option.name}
          // defaultValue={[categories[0]]}
          sx={{
            label: { color: "white" },
            height: "40px",
            maxHeight: "120px",
            width: "15rem",
            color: "white",
            input: { color: "white" },
            marginBottom: "10px",
          }}
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
            setSubCategoriesSelected(newValue);
            props.setSubCategoriesSelected(newValue);
            // updateFormData({ categories: newValue })
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                className={"bg-appgreenlight text-lg"}
                variant="filled"
                sx={{ backgroundColor: "#00C28C", color: "white" }}
                label={`${option.name}`}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </div>
      {props.isLoadingPrompts && <YouTubeLikeLoading />}

      {prompts.length > 0 && (
        <div className=" overflow-y-auto  mt-3 pr-2 py-6" style={{ height: "80vh" }}>
          <InfiniteScroll
            dataLength={prompts.length}
            next={() => {
              console.log("Next data");
            }}
            hasMore={true}
            scrollThreshold={1}
            // loader={<LinearProgress />}
            // Let's get rid of second scroll bar
            style={{ overflow: "unset" }}
          >
            <Grid container spacing={4} className="">
              {prompts.map((prompt, index) => renderCards(prompt))}
            </Grid>
          </InfiniteScroll>
        </div>
      )}
      {!props.isLoadingPrompts && prompts.length == 0 && (
        <div className="flex justify-center items-center w-full" style={{ height: "70vh" }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#ffffff50" }}>
            No prompts to show
          </Typography>
        </div>
      )}
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            // elevation: 8,
            boxShadow: "-1px 0px 15px 0px #00C28C30;",
          },
        }}
        anchor={"right"}
        open={otherUserProfile != null}
        onClose={() => {
          setOtherUserProfile(null);
        }}
      >
        <Box
          sx={{ width: 650, bgcolor: "black", padding: 5 }}
          // role="presentation"
          onClick={() => {
            // setOtherUserProfile(null)
          }}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          {/* <p>This is side menu</p> */}
          {otherUserProfile != null && (
            <ProfileBaseView user={{ user: otherUserProfile, token: "" }} />
          )}
          {}
        </Box>
      </Drawer>
    </div>
  );
};

export default PromptsListDashboard;

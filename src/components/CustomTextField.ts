import { styled as style2 } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const CustomTextField = style2(TextField)({
  "& MuiFilledInput-root": {
    backgroundColor: "red",
  },
  "& .MuiInputBase-root:has(> input:-webkit-autofill)": {
    backgroundColor: "blue",
  },
  "& label.Mui-focused": {
    color: "#00C28C",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
      backgroundColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00C28C",
    },
    color: "white",
  },
});

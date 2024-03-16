import {styled} from '@mui/material/styles';
import { TextField } from '@mui/material';
import React from 'react';

export const CustomTextField = styled(TextField)({
  '& MuiFilledInput-root':{
    backgroundColor: 'red'
  },
  '& .MuiInputBase-root:has(> input:-webkit-autofill)': {
    backgroundColor: 'blue'
  },
    '& label.Mui-focused': {
      color: '#00C28C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5A5A5A',
        backgroundColor: 'transparent'
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00C28C',
      },
      color: 'white',
      
    },
  });
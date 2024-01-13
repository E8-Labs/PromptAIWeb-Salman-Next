import {styled as style2} from '@mui/material/styles';
import { TextField } from '@mui/material';
import React from 'react';

export const CustomTextField = style2(TextField)({
    
    '& label.Mui-focused': {
      color: '#00C28C',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
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
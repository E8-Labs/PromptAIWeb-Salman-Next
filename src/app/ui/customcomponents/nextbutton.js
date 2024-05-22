import React from 'react'

import { Button } from '@mui/material'
import Icons from '@/app/lib/Icons';

function NextButton({title = "Continue", selected, handleNext }) {
    console.log("Button is selected = ", selected)
    if(selected){
        return (
            <Button variant="contained" className="" endIcon={<Icons.ArrowForwardIcon />}
                sx={{
                    bgcolor: '#00C28C', padding: 1.2, paddingX: 2, borderRadius: 10, ":hover": {
                        backgroundColor: "#001812"
                    }
                }} onClick={handleNext}>Continue</Button>
        )
    }
    else{
        return (
            <Button variant="contained" className="" endIcon={<Icons.ArrowForwardIcon />}
                sx={{
                    bgcolor: '#001812' , padding: 1.2, paddingX: 2, borderRadius: 10, ":hover": {
                        backgroundColor: "#001812"
                    }
                }} onClick={handleNext}>{title}</Button>
        )
    }
    
}

export default NextButton

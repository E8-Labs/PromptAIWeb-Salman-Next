import { Stack, Button, Box } from "@mui/material"

export const PageControl = (props)=>{
    let selectedIndex = props.selectedIndex
    let pages = props.pages
  
    let height
  
    return(
      
        <div className='flex gap-1 items-center justify-center'>
          {(Array.from(new Array(pages))).map((item, index) => (
            
              index === selectedIndex ? (
                <Box className='bg-appgreenlight' key={index} sx={{ width: 18, height: 18, bgcolor: '#001812', borderRadius: 9}}>
                </Box>
              ): 
              (
                <Box key={index} sx={{ width: 10, height: 10, bgcolor: 'white', borderRadius: 5}}>
              </Box>
              )
            
        ))}
        </div>
    )
        
  }
  
  const PageCircle = (props)=>{
    let selected = props.selected
    return(
      <div className='h-6 w-6 rounded-full ' style={{backgroundColor: 'white'}}>
  
      </div>
    )
  }
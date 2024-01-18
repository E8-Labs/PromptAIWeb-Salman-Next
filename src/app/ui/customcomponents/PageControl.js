import { Stack, Button, Box } from "@mui/material"

export const PageControl = (props)=>{
  let selectedColor = props.selectedColor || "#00C28C"
  let unSelectedColor = props.unSelectedColor || "white"
    let selectedIndex = props.selectedIndex

    let selectedCircleSize = 14
    let unSelectedCircleSize = 8
    let pages = props.pages
  
    let height
  
    return(
      
        <div className='flex gap-1 items-center justify-center'>
          {(Array.from(new Array(pages))).map((item, index) => (
            
              index === selectedIndex ? (
                <Box className='bg-appgreenlight' key={index} sx={{ width: selectedCircleSize, height: selectedCircleSize, bgcolor: selectedColor, borderRadius: selectedCircleSize / 9}}>
                </Box>
              ): 
              (
                <Box key={index} sx={{ width: unSelectedCircleSize, height: unSelectedCircleSize, bgcolor: unSelectedColor, borderRadius: unSelectedCircleSize / 2}}>
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
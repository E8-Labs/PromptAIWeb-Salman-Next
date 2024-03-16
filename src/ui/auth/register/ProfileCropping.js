"use client";

import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
   },
}));

const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const ProfileCropping = (props) => {
   const [image, setImage] = useState(defaultSrc);
   const [cropData, setCropData] = useState("#");
   const [cropper, setCropper] = useState();

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [showModal, setShow] = useState(false);

   const onChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
         setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      console.log("Dialogue shows now")
      handleShow();
   };

   const getCropData = () => {
      console.log("Get Crop Data Profile Cropper " + props.change_logo)
      if (typeof cropper !== "undefined") {
         setCropData(cropper.getCroppedCanvas().toDataURL());
         let ImageCropData = cropper.getCroppedCanvas().toDataURL();

         if (props.change_logo == 0) {
            console.log("Get Crop Data Profile Cropper One")
            props.afterCropImage(ImageCropData, 1);
         }

         if (props.change_logo == 1) {
            console.log("Get Crop Data Profile Cropper Two")
            props.afterCropImage(ImageCropData, 1);
         }

         handleClose();
      }
      else {
         console.log("Get Crop Data Profile Cropper Undefined")
      }
   };

   return (
      <div>
         <input onChange={onChange} id='input-file' type='file' inputProps={{ accept: 'image/*' }} style={{ display: 'none' }} />
         <BootstrapDialog open={showModal} onClose={handleClose} aria-labelledby="customized-dialog-title">
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
               Crop Picture
            </DialogTitle>
            <IconButton
               aria-label="close"
               onClick={handleClose}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
               }}
            >
               <CloseIcon />
            </IconButton>
            <DialogContent dividers>
               <div style={{ width: "100%" }}>
                  <Cropper
                     style={{ height: 400, width: "100%" }}
                     zoomTo={0.5}
                     initialAspectRatio={1}
                     // preview=".img-preview"
                     src={image}
                     viewMode={1}
                     minCropBoxHeight={10}
                     minCropBoxWidth={10}
                     background={false}
                     responsive={true}
                     autoCropArea={1}
                     checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                     onInitialized={(instance) => {
                        setCropper(instance);
                     }}
                     guides={true}
                  />
               </div>
            </DialogContent>
            <DialogActions>
               <Button variant="secondary" onClick={handleClose}> Close </Button>
               <Button variant="primary" onClick={getCropData}> Save Changes </Button>
            </DialogActions>
         </BootstrapDialog>
      </div>
   );

};

export default ProfileCropping;

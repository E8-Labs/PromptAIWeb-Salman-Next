import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Modal,Button} from 'react-bootstrap';

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
   handleShow();
};

const getCropData = () => {
    console.log("Get Crop Data Profile Cropper " + props.change_logo)
   if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      let ImageCropData = cropper.getCroppedCanvas().toDataURL();

      if(props.change_logo == 0 ){
        console.log("Get Crop Data Profile Cropper One")
         props.afterCropImage(ImageCropData,1);
      }

      if(props.change_logo == 1 ){
        console.log("Get Crop Data Profile Cropper Two")
         props.afterCropImage(ImageCropData,1);
      }

      handleClose();
   }
   else{
    console.log("Get Crop Data Profile Cropper Undefined")
   }
};

   return (
      <div>
      <input   onChange={onChange} id='input-file' type='file' inputProps={{ accept: 'image/*' }} style={{display: 'none'}}/>
         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}> Close </Button>
               <Button variant="primary" onClick={getCropData}> Save Changes </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
   
};

export default ProfileCropping;

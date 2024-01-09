import React, { useState, useEffect, useCallback, Component } from "react";

//Images
import ProfileCropping from './ProfileCropping';
const background = '/banner-bg.png'
const crossIcon = '/assets/cross.svg'
const upload_image = '/assets/upload_image.svg';



class AddProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save Upload image
            file: '',
            imagePreviewUrl: this.props.Team_imagePreviewUrl,
            company_name:this.props.Team_Name,
            // Fome data erroe
            logo:"",
            valid_logo : "",
            change_logo: 0,// this.props.change_logo,
            valid_company_name : "", 
        };
        // add form value
        this.user_name = React.createRef();
    }

    // Fileupload before privew;
    // changeLogo(e) {
    //     e.preventDefault();
    //     this.setState({ valid_logo: "" });

    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //     }
    
    //     reader.readAsDataURL(file)
    // }
    //
    handleKeyPress(e){
        if(e.target.name == "User_Name"){
            this.setState({ 
                user_name : e.target.value,
                valid_company_name: "" 
            });
        }
    }
    //Fome submit function
    Save_company_data(event){
        event.preventDefault();

        let log = false;
       
        if(this.state.imagePreviewUrl == ""){
            this.setState({ valid_logo: "Please upload a profile picture" });
            log = true;
        }     

        if(!this.user_name.current.value){
            this.setState({ valid_company_name: "Please enter a company name" });
            log = true;
        }
       
        if(log === true){ 
            return 
        }

        this.state.user_name = this.user_name.current.value;
        this.setState({user_name: this.state.user_name});
        this.props.savedata(this.state.file, this.state.imagePreviewUrl, this.state.user_name);

        this.props.clickEvent("Team_member_stap3");
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    //set_image_after_update
    afterCropImage(data,times){
        console.log("Image cropped")
        let cropImage = data;
        let first_time = times;
        let filedata = this.dataURLtoFile(cropImage,"changeprofile.png");
        this.setState({imagePreviewUrl:cropImage,file:filedata,change_logo:first_time});
    }

    nextBtnClicked(){
        this.props.getImage(this.state.imagePreviewUrl, this.state.file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            //   $imagePreview = (<img src={imagePreviewUrl} />);
            $imagePreview = imagePreviewUrl;
        } else {
            //   $imagePreview = (<img src={upload_image} />);
            $imagePreview = upload_image;
        }
        return (
            
            <div className="flex flex-grow  h-full" >
                <div className="col-md-12  ">
                    <div className="row  ms-auto"> 
                        <div className="col justify-content-end">
                            <img src={crossIcon} alt=""></img>
                        </div>
                    </div>
                    
                    <div className="row row-cols-1 mt-md-5 gap-2  mt-5 d-flex align-items-center justify-content-center">
                        <form className="col-md-12 col-12 mx-3 mx-md-0 d-flex align-items-center justify-content-center">
                            <div className="row  d-flex align-items-center justify-content-center">
                                <div className="col-md-12 fileUpload" style={{position: "relative", maxWidth: "300px",margin:"auto"}} >
                                    <div className="upload_image" style={{margin:'0 auto',borderRadius:'100%',width:'82px',height:'80px',backgroundSize:'cover',backgroundImage: `url(${$imagePreview})`}}>
                                       
                                    </div>
                                </div>
                                <div className="col-auto singup_input mt-3" >
                                    
                                    <label className="text-app-primary title2-text fs-5" htmlFor='input-file'> Upload Picture </label>
                                    
                                </div>
                                
                                <ProfileCropping change_logo={this.state.change_logo} edit_data = {false} afterCropImage={this.afterCropImage.bind(this)} />
                                
                                
                            </div>
                        </form>
                        
                        
                    </div>

                    <div className="row d-flex align-items-end justify-content-center mt-5 " style={{maxHeight:"70%", minHeight: "60%"}}>
                        <div className="col-6  d-flex align-items-center justify-content-center p-md-2 p-0 gap-1 bg-app-primary rounded-pill" onClick={this.nextBtnClicked.bind(this)}>
                            <button className="btn btn-md d-flex align-items-center justify-content-center signinbtn   gap-0">
                              <span className="fs-6 fw-bold text-white ">Next</span>
                            </button>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
        
        );
    }
}
export default AddProfilePicture;
import React, { useEffect, useState } from "react";
import "./img.css";
import { connect } from "react-redux";
import {
  setImg
} from "../redux/actions/inputs.action";
import  handleSubmit  from "../uploadImg/UploadImg";



const ImgUpload = ({
  onChange,
  src,
})=>{
  return (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img htmlhtmlFor="photo-upload" src={src} alt="upload" />
      </div>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </label>
  );
}

const Profile =({
  onSubmit,
  src
})=>{
  return(
    <form className="frmImgPrfl"  onSubmit={onSubmit}>
      <label className="custom-file-upload fas">
        <div className="img-wrap" >
          <img htmlFor="photo-upload" src={src} alt="upload"/>
        </div>
      </label>
      {/* <button type="submit" className="edit">Edit Profile </button> */}
    </form>
  );
}
      
const Edit =({
  onSubmit,
  children,
})=>{
  return(
      <form className="frmImgPrfl" onSubmit={onSubmit}>
        {children}
      </form>
  );
}

function CardProfile(props) {

  const [active, setActive] = useState('edit');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    sessionStorage.getItem("prflImg")
  );
  useEffect(() => {
    let statusUConnect = sessionStorage.getItem("status connect user");
    if (statusUConnect && sessionStorage.getItem("prflImg") != null) {
      setImagePreviewUrl(sessionStorage.getItem("prflImg"));
    } else {
      setImagePreviewUrl(
        "https://cdn-icons-png.flaticon.com/512/1946/1946392.png"
      );
    }
  }, [imagePreviewUrl]);

  useEffect(() => {
    console.log("imagePreviewUrl");
  }, [imagePreviewUrl]);

  const photoUpload = (e) => {
    e.preventDefault();
    handleSubmit(e, 0); // Send file to handleSubmit
    const reader = new FileReader();
    const file = e.target.files[0]; // Assuming only one file is selected
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result); // Set image preview URL after uploading
      // const img = JSON.stringify({ image: reader.result });
      sessionStorage.setItem("prflImg", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Read file as data URL (base64)
    }
  };;
   return (
     <div>
       {active === "edit" ? (
         <Edit onChange={(e) => props.changeImg(e)}>
           <ImgUpload onChange={(e) => photoUpload(e)} src={imagePreviewUrl} />
         </Edit>
       ) : (
         <Profile onChange={(e) => props.changeImg(e)} src={imagePreviewUrl} />
       )}
     </div>
   );
}


export default connect(
  (state) => {
    return {
      userStatus: state.userStatus,
      img: state.img,
    };
  },
  {
    changeImg: setImg,
  }
)(CardProfile);


// class CardProfile extends React.Component {
 
//   constructor(props) {
//     super(props);
//      this.state = {
//        file: '',
//        active: 'edit'
//     };
//   }
//   photoUpload (e) {
//     e.preventDefault();
//     const reader = new FileReader();
//     const file = e.target.files[0];
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//       this.props.changeImg(toString(reader.result));
//     }
//     reader.readAsDataURL(file);
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
//     this.setState({
//       active: activeP,
//     })
//   }
  
//   render() {
//       const {
//           imagePreviewUrl,
//            active} = this.state;
//     return (
//       <div>
//         {(active === 'edit')  
//           ?<Edit onSubmit={(e)=>this.handleSubmit(e)}>
//               <ImgUpload onChange={(e)=>this.photoUpload(e)} src={imagePreviewUrl}/>
//             </Edit>
//           :<Profile onSubmit={(e)=>this.handleSubmit(e)} src={imagePreviewUrl} />}
        
//       </div>
//     )
//   }
// }


// import { useState } from "react";
import { storage } from "./firebase";
import {
  ref,
  uploadBytesResumable,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { uploadImage } from "../server/images";

function upload(file) {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    }
  );
}

export default function handleSubmit(e, isProfil) {
  const files = e.target.files;
  const detailsImg = {
    userType: sessionStorage.getItem("user type"),
    pUser: sessionStorage.getItem("user"),
    bUser: sessionStorage.getItem("user"),
    imageType: isProfil,
  };

  if (!files) return;

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    const file = files[fileIndex];
    upload(file); // Assuming upload function is defined elsewhere
    console.log("Uploading file:", file.name);

    uploadImage(Object.assign(detailsImg, { image: file.name }))
      .then((res) => {
        console.log("Upload successful:", res);

        if (res.data.deletedImageName) {
          const storage = getStorage();
          const imageRef = ref(storage, `files/${res.data.deletedImageName}`);

          deleteObject(imageRef)
            .then(() => {
              console.log(
                "Old image deleted from Firebase:",
                res.data.deletedImageName
              );
            })
            .catch((error) => {
              console.error("Error deleting old image from Firebase:", error);
            });
        }
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  }
}

// export default function UploadImage() {
//     const [imgUrl, setImgUrl] = useState(null);
//     const [progresspercent, setProgresspercent] = useState(0);

// function upload(file) {
//   const storageRef = ref(storage, `files/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );      
//     },
//     (error) => {
//       alert(error);
//     },
//   );
// }
// export default function handleSubmit(e) {
//   console.log(e);
//   // e.preventDefault();
//   const detailsImg = {
//        userType: sessionStorage.getItem("user type"),
//        pUser: sessionStorage.getItem("user"),
//        bUser: sessionStorage.getItem("user"),
//      };
//   const files = e.target.files;
//   console.log(files);
//   if (!files) return;
//   for (let file = 0; file < files.length; file++) {
//     upload(files[file]);
//      console.log("ok upload");
     
//      uploadImage(Object.assign(detailsImg, { image: files[file].name})).then(
//        (res, err) => {
//          console.log(res);
//          if (err) console.log(err);
//        }
//      );
//   }
// };
// export default function handleSubmit(e, isProfil) {
//   const files = e.target.files;
//    const detailsImg = {
//      userType: sessionStorage.getItem("user type"),
//      pUser: sessionStorage.getItem("user"),
//      bUser: sessionStorage.getItem("user"),
//      imageType: isProfil,
//    };
    
//   if (!files) return;
// for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
//   const file = files[fileIndex];
//   upload(file); // Assuming upload function is defined elsewhere
//   console.log("Uploading file:", file.name);
//     uploadImage(Object.assign(detailsImg, { image: file.name }))
//       .then((res) => {
//         console.log("Upload successful:");
//       })
//       .catch((err) => {
//         console.error("Error uploading image:", err);
//       });
//   };
//  };

    // return (
    //   <div className="App">
    //     <form onSubmit={handleSubmit} className="form">
    //       <input type="file" multiple />
    //       <button type="submit">Upload</button>
    //     </form>
    //     {!imgUrl && (
    //       <div className="outerbar">
    //         <div className="innerbar" style={{ width: `${progresspercent}%` }}>
    //           {progresspercent}%
    //         </div>
    //       </div>
    //     )}
    //     {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    //   </div>
    // );

// }

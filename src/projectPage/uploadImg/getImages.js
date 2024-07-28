// import React from "react";
import { getImagesByIdUser } from "../server/images";
import { storage } from "./firebase";
import { ref, getDownloadURL } from "firebase/storage";


export default async function getImages(idUser, isProfile) {
    let arrImg;
    let arrLinkImg = [];
    await getImagesByIdUser({ idUser: idUser, "isProfile": isProfile })
      .then(async(res) => {
          arrImg = res.data;         
      })
        .catch((err) => console.log(err));
          for (let i = 0; i < arrImg?.length; i++){
            arrLinkImg.push(
              await getDownloadURL(ref(storage, "files/" + arrImg[i].image))
        );
    }
    return arrLinkImg
}
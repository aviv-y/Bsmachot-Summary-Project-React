import axios from "axios";

export function uploadImage(img) {
  console.log(img);
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/upload-image`, img)
    .then(
      (res) => {
        console.log("react success upload image!! " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

export function getImagesByIdUser(idUser) {
  console.log(idUser);
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/getImagesByIdUser`, idUser)
    .then(
      (res) => {
        console.log("react success upload image!! ", res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

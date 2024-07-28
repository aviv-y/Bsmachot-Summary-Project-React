import axios from "axios";

export function uploadImage(img) {
  console.log(img);
  let ans = axios.post("http://localhost:4000/upload-image", img).then(
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
  let ans = axios.post("http://localhost:4000/getImagesByIdUser", idUser).then(
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

import axios from "axios";

export function signUpBUser(bUser) {
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/signUpBUser `, bUser)
    .then(
      (res) => {
        console.log("react success sign-up bUser!! " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

export function loginBUser(bUser) {
  console.log(process.env.REACT_APP_API_URL);
  return axios.post(`${process.env.REACT_APP_API_URL}/loginBUser`, bUser).then(
    (res) => {
      console.log("react success login bUser!! " + res);
      return res;
    },
    (err) => {
      console.log("react filed... " + err);
    }
  );
}

export function showBUser(bUDetails) {
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/showBUser`, bUDetails)
    .then(
      (res) => {
        console.log("react success reset pass!! " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

export function updateBUser(bUDetails) {
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/updateBUser`, bUDetails)
    .then(
      (res) => {
        console.log("react success reset pass!! " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

export function displayRemarkByBUserId(bUser) {
  let ans = axios
    .post(`${process.env.REACT_APP_API_URL}/showRemarkByBUserId`, bUser)
    .then(
      (res) => {
        console.log("react success " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}


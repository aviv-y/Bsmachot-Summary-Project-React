import axios from "axios";

export function signUpBUser(bUser) {
    let ans = axios.post('http://localhost:4000/signUpBUser', bUser)
        .then(res => {
            console.log("react success sign-up bUser!! " + res)
            return res;
        },
            err => { console.log("react filed... " + err) })
    return ans;
}

export function loginBUser(bUser) {
    return axios.post('http://localhost:4000/loginBUser', bUser)
        .then(res => {
            console.log("react success login bUser!! " + res)
            return res;
        },
          err=>{console.log("react filed... "+err)})
}

export function showBUser(bUDetails) {
    let ans = axios.post('http://localhost:4000/showBUser', bUDetails)
        .then(res => {
            console.log("react success reset pass!! " + res)
            return res;
        },
            err => { console.log("react filed... " + err) })
    return ans;
}

export function updateBUser(bUDetails) {
  let ans = axios.post("http://localhost:4000/updateBUser", bUDetails).then(
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
    .post("http://localhost:4000/showRemarkByBUserId", bUser)
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

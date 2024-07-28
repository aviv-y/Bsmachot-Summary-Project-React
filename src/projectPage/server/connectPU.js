import axios from "axios";

export function signUpPUser(pUser) {
  let ans = axios.post("http://localhost:4000/signUpPUser", pUser).then(
    (res) => {
      console.log("react success sign-up pUser!! ", res);
      console.log(res.status);
      return res;
    },
    (err) => {
      console.log("react filed... " + err);
    }
  );
  return ans;
}

export function loginPUser(pUser) {
  let ans = axios
    .post("https://bsmahot-summary-project.vercel.app/routers/api/loginPUser", pUser)
    .then(
      (res) => {
        console.log("react success login pUser!! ", res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    );
  return ans;
}

export function reqResetPass(mailpUser) {
  let ans = axios
    .post("http://localhost:4000/reqResetPass", mailpUser)
    .then(
      (res) => {
        console.log("react success send request reset pass!! " + res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    )
    .catch((err) => console.log("catch!!!!  " + err));
  return ans;
}

export function resetPass(pUDetails) {
  let ans = axios
    .post("http://localhost:4000/resetPass", pUDetails)
    .then(
      (res) => {
        console.log("react success reset pass!! ", res);
        return res;
      },
      (err) => {
        console.log("react filed... " + err);
      }
    )
    .catch((err) => console.log("catch!!!!  " + err));
  return ans;
}

export function showPUser(pUDetails) {
  let ans = axios.post("http://localhost:4000/showPUser", pUDetails).then(
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

export function updatePUser(pUDetails) {
  let ans = axios.post("http://localhost:4000/updatePUser", pUDetails).then(
    (res) => {
      console.log("react success reset pass!! " + res);
      return res;
    },
    (err) => {
      console.log("react filed update user... " + err);
    }
  );
  return ans;
}

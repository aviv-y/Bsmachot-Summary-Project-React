import axios from "axios";

//שליפה של ערים בישראל מAPI
export function showCity() {
    return  axios("https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json")
    
  
}

//אירוע חדש
export function newEvent(event) {
    let ans=axios.post(`${process.env.REACT_APP_API_URL}/newEvent`, event)
        .then(res => {
            // console.log("react success create new event!! ", res);
            // console.log(res.status);
            return res;
        },
            err => { console.log("react filed create new event... " + err) })
    return ans;
}

export function sendMess(txt) {
    let ans=axios.post(`${process.env.REACT_APP_API_URL}/sendMess`, txt)
        .then(res => {
            console.log("react success send message!! ", res);
            console.log(res.status);
            return res;
        },
            err => { console.log("react filed send message... " + err) })
    return ans;
}

export function showMess(tkn) {
    let ans = axios.post(`${process.env.REACT_APP_API_URL}/showMess`,{tkn})
        .then(res => { return res })
        .catch(err => console.log("error in show mess! ", err))
    return ans;
}

export async function showChatR(user) {
     let ans = await axios
      .post(`${process.env.REACT_APP_API_URL}/showChatR`,  user )
        .then((res) => {
          console.log(res)
        return res;
      })
      .catch((err) => console.log("error in show mess room! ", err));
    return ans;
}

export async function showEvents(user) {
     let ans = await axios
       .post(`${process.env.REACT_APP_API_URL}/showEvents`, { user })
       .then((res) => {
         console.log(res);
         return res;
       })
       .catch((err) => console.log("error in show mess room! ", err));
    return ans;
}


export async function sendAttachment(blob) {
     let ans = await axios
       .post(`${process.env.REACT_APP_API_URL}/sendAttachment`,  blob )
       .then((res) => {
         console.log(res);
         return res;
       })
       .catch((err) => console.log("error! ", err));
    return ans;
}

export async function showEventById(idEvent) {
     let ans = await axios
       .post(`${process.env.REACT_APP_API_URL}/showEventById`, idEvent)
       .then((res) => {
         console.log(res);
         return res;
       })
       .catch((err) => console.log("error in show event! ", err));
    return ans;
}

export async function SendForClientsSignature(detailesContract) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/showEventById`, detailesContract)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in show event! ", err));
  return ans;
}

export async function showContract(tkn) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/showContract`, tkn)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in show event! ", err));
  return ans;
}

export async function updateContract(pdf) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/updateContract`, pdf)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in update contract! ", err));
  return ans;
}

export async function updateEvent(eventD) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/updateEvent`, eventD)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in update event! ", err));
  return ans;
}

export async function showContractByIdEvent(eventID) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/showContractByIdEvent`, eventID)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in update event! ", err));
  return ans;
}

export async function sendReminder() {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/sendReminder`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in update event! ", err));
  return ans;
}


export async function sendFeedbackOnBU(remarkD) {
  console.log(remarkD);
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/addRemark`, remarkD)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in update event! ", err));
  return ans;
}

export async function showAllContracts(user) {
  let ans = await axios
    .post(`${process.env.REACT_APP_API_URL}/showAllContracts`, user)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log("error in showAllContracts! ", err));
  return ans;
}








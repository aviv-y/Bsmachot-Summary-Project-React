import axios from "axios";

export function showAllProfession() {
  return axios.post(`${process.env.REACT_APP_API_URL}/showAllProfession`);
}
export function showSubsProfession(idProf) {
  return axios.post(`${process.env.REACT_APP_API_URL}/showSubProfession`, {
    id: idProf,
  });
}
export function showBUByProf(prof) {
  return axios.post(`${process.env.REACT_APP_API_URL}/showBUByProf`, {
    category: prof,
  });
}
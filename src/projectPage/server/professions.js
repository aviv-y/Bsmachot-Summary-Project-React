import axios from "axios";

export function showAllProfession() {

    return axios.get('http://localhost:4000/showAllProfession')
        
}
export function showSubsProfession(idProf) {

    return axios.post('http://localhost:4000/showSubProfession', {id:idProf})
}
export function showBUByProf(prof) {
    return axios.post("http://localhost:4000/showBUByProf", { category: prof });

}
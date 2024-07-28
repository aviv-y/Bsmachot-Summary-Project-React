import { signUpBUser } from "../server/connectBU";
import { signUpPUser } from "../server/connectPU";

export function signUpFunc(allField, userType, changeUserStts) {
  let details;
  console.log(allField);
  const sU = async () => {
    if (userType) {
      await signUpBUser(allField)
        .then((res) => {
          console.log(" משתמש עסקי נרשם", res.data);
          if (res.data.status === "errExist") {
            alert("שגיאה: מייל זה כבר קיים במערכת");
            sessionStorage.setItem("mesAction", "error exist");
          }else{
          details = res.data;
          sessionStorage.setItem("status connect user", 1);
        }})
        .catch((err) => console.log("שגיאה ברישום משתמש עסקי ", err));
      console.log(allField);
    } else {
      await signUpPUser(allField).then((res) => {
        console.log("מה קיבלנו מנוד חזרה לאחר רישום משתמש פרטי", res.data);
        if (res.data.status === "errExist") {
          alert("שגיאה: מייל זה כבר קיים במערכת");
          sessionStorage.setItem("mesAction", "error exist");
        }else{
        details = res.data;
        sessionStorage.setItem("status connect user", 1);
      }});
    }
    if (sessionStorage.getItem("status connect user")) {
      console.log("לאחר הרישום למה דיטיילס שווה", details);
      console.log("מה סטטוס המשתמש עכשיו", userType);
      sessionStorage.setItem("user", details.id);
      sessionStorage.setItem("user name", details.name);
      changeUserStts(1);
      
      sessionStorage.setItem("mesAction", "success sU");
    }
  };
  // sU();
}

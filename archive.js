/**fullDrtailsInput*/
// // import React, { useRef, useState, useEffect } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./inputUsers.css";
// // import { Row, Button } from "react-bootstrap";
// // import Form from "react-bootstrap/Form";
// // import { showPUser, updatePUser, signUpPUser } from "../server/connectPU";
// // import { showAllProfession, showSubsProfession } from "../server/professions";
// // import { showBUser, updateBUser, signUpBUser } from "../server/connectBU";
// // import { connect } from "react-redux";
// // import {
// //   setInptName,
// //   setInptPass,
// //   setInptPhon,
// //   setInptMail,
// //   setTypeProf,
// //   setUserStatus,
// //   setImg,
// // } from "../redux/actions/inputs.action";
// // import validFields from "./validFields";
// // import Select from "react-select";
// // import makeAnimated from "react-select/animated";
// // import { useHistory } from "react-router-dom";
// // import SelectAreaCity from "../Home/SelectAreaCity";
// // // import { signUpFunc } from "./SignUpFunc";
// // import handleSubmit from "../uploadImg/UploadImg";

// // function FullDetailsInputs(props) {
// //   const history = useHistory();
// //   console.log(props)
// //   const {
// //     inptName,
// //     inptPass,
// //     inptPhon,
// //     inptMail,
// //     typeProf,
// //     userType,
// //     changeInptName,
// //     changeInptPass,
// //     changeInptPhon,
// //     changeInptMail,
// //     changeTypeProf,
// //     changeUserStts,
// //   } = props;

// //   let statusUConnect = sessionStorage.getItem("status connect user");

// //   //סטייטים מקומיים של הפונק' שיציגו את הנתונים הנשלפים
// //   const [phon, setPhon] = useState("");
// //   const [mail, setMail] = useState("");
// //   const [nameCmpny, setNameCmpny] = useState("");
// //   const [prof, setProf] = useState("");
// //   const [subProf, setSubProf] = useState("");
// //   const [area, setArea] = useState("");
// //   const [city, setCity] = useState("");
// //   const [about, setAbout] = useState("");
// //   const [seniority, setSeniority] = useState("");
// //   const [priceRange, setPriceRange] = useState("");
// //   const [more, setMore] = useState("");
// //   const [profSelect, setProfSelect] = useState("");
// //   const [selectSubProf, setSelectSubProf] = useState();
// //   const [images, setImages]=useState()
// //   const nameRef = useRef("");
// //   const passwordRef = useRef("");
// //   const cellphonRef = useRef("");
// //   const mailRef = useRef("");
// //   const nameCompanyRef = useRef("");
// //   const aboutRef = useRef("");
// //   const seniorityRef = useRef("");
// //   const priceRangeRef = useRef("");
// //   const moreRef = useRef("");
// //   const imagesRef = useRef('')


// //   let allProf = [{}];
// //   let allSubProf = [{}];
// //   let details;
// //   let textBtn;

// //   //מה יהיה רשום על הכפתור
// //   statusUConnect ? (textBtn = "עדכון פרטים") : (textBtn = "הרשמה");

// //   //איפוס ולידציית השדות בטעינת הקומפוננטה
// //   //שליפת המקצועות בטעינת הקומפוננטה
// //   useEffect(async () => {
// //     resetInpt();
// //     changeTypeProf(0);
// //     if (!statusUConnect) {
// //       //במידה ואין משתמש רשום
// //       //שליפה של כל המקצועות
// //       await showAllProfession()
// //         .then(async (res) => {
// //           res.data.map((item, i) => {
// //             allProf[i] = {
// //               id: item._id,
// //               value: item.name,
// //               label: item.name,
// //             };
// //           });
// //           console.log(allProf);
// //           await setProf(allProf);
// //         })
// //         .catch((err) => {
// //           console.log("react filed get all... " + err);
// //         });
// //     }
// //   }, []);

// //   //האם יטען דף הרשמה או עדכון פרטים
// //   useEffect(() => {
// //     const howLoad = async () => {
// //       console.log("יוז אפקט ");
// //       //קיים משתמש-יטען דף עם פרטי המשתמש
// //       if (statusUConnect)
// //         if (userType == "0") {
// //           console.log("פרטי")
// //           //משתמש פרטי
// //           await showPUser({ id: sessionStorage.getItem("user") }).then(
// //             (res) => {
// //               details = res.data[0];
// //               console.log(res);
// //               setPhon(details.phone);
// //               setMail(details.userMail);
// //               // setImg(details.image)
// //             }
// //           );
// //         }
// //         else
// //         {
// //           //משתמש עסקי
// //           await showBUser({ id: sessionStorage.getItem("user") }).then(
// //             (res) => {
// //               details = res.data[0];
// //               console.log(res);
// //               setPhon(details.phone);
// //               setMail(details.userMail);
// //               setNameCmpny(details.nameCmpny);
// //               setProf(details.prof);
// //               setSubProf(details.subProf);
// //               setArea(details.area);
// //               setCity(details.city);
// //               setAbout(details.about);
// //               setSeniority(details.seniority);
// //               setPriceRange(details.priceRange);
// //               setMore(details.more);
// //               // setImg(details.image);
// //             }
// //           );
// //         }
// //     };
// //     howLoad();
// //   }, [statusUConnect]);

// //   //פונקציה שבוחנת ולידציה של שדות החובה
// //   // const outFocus = (e) => {
// //   //   const valid = validFields(e);
// //   //   console.log(eval(`inpt${e.target.name}`));
// //   //   if (valid) eval(
// //   //     `props.changeInpt${
// //   //       e.target.name
// //   //     }(${e.target.name.toLowerCase()}Ref.current.value)`
// //   //   );
// //   //   else eval(`props.changeInpt${e.target.name}(0)`);
// //   // };
// // const outFocus = (e) => {
// //   const valid = validFields(e);
// //   const fieldName = e.target.name;
// //   const fieldValue = e.target.value;
// //   // eval(`set${e.target.name}(${e.target.value})`);
// //   setPhon(e.target.value);
// // console.log(phon);
// //   // Construct the function name based on the field name
// //   const changeFunctionName = `changeInpt${
// //     fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
// //   }`;
// //   // Call the corresponding function directly
// //   if (valid) {
// //     props[changeFunctionName](fieldValue);
    
// //     eval(`set${e.target.name}(${e.target.value})`);
// //     console.log(phon);
// //   }
// //   // else {
// //   //   props;
// //   // }
// // };
// //   //פונקציה לשליפת תתי מקצוע לפי המקצוע הנבחר
// //   const oCListProf = async (e) => {
// //     setProfSelect(e.value);
// //     console.log(profSelect);
// //     await showSubsProfession(e.id)
// //       .then(async (res) => {
// //         console.log("פונק' כל תתי המקצועות סרבר ריאקט");
// //         res.data.map((item, i) => {
// //           allSubProf[i] = { value: item.name, label: item.name };
// //         });
// //         props.changeTypeProf(1);
// //         console.log(allSubProf);
// //         await setSubProf(allSubProf);
// //       })
// //       .catch((err) => {
// //         console.log("react filed get all... " + err);
// //       });
// //   };

// //   //פונקציה שמכניסה למערך כל תת מקצוע שנבחר

// //   const oCselectSubProf = (e) => {
// //     setSelectSubProf(e);
// //     console.log(selectSubProf);
// //   };

// //   const resetInpt = () => {
// //     if (!sessionStorage.getItem("status connect user")) {
// //       nameRef.current.value = "";
// //       passwordRef.current.value = "";
// //       cellphonRef.current.value = "";
// //       mailRef.current.value = "";
// //     }
// //     props.changeInptName(0);
// //     props.changeInptPass(0);
// //     props.changeInptPhon(0);
// //     props.changeInptMail(0);
// //     return;
// //   };

// //   // פונקציית לחיצת הכפתור
// //   const hendlSM = async () => {
// //     /** אובייקט המכיל את כל ערכי השדות שהוזנו **/
// //     let baseFieldsValue = {
// //       name: nameRef.current.value,
// //       password: passwordRef.current.value,
// //       phone: cellphonRef.current.value,
// //       userMail: mailRef.current.value,
// //     };
// //     let athoFildsValue, allBUField;
// //     if (userType) {
// //       //משתמש עסקי=שדות נוספים
// //       console.log(profSelect);
// //       athoFildsValue = {
// //         company: nameCompanyRef.current.value,
// //         profession: profSelect,
// //         subProfession: selectSubProf,
// //         area: sessionStorage.getItem("areaSelected"),
// //         city: sessionStorage.getItem("citySelected"),
// //         about: aboutRef.current.value,
// //         seniority: seniorityRef.current.value,
// //         priceRange: priceRangeRef.current.value,
// //         more: moreRef.current.value,
// //       };
      
// //       allBUField = Object.assign(baseFieldsValue, athoFildsValue);
// //       console.log(allBUField);
// //     }
// //     if (!statusUConnect) {
// //       //רישום משתמש
// //       if (inptName && inptPass && inptPhon && inptMail) {
// //         if (userType) {
// //           await signUpBUser(allBUField)
// //             .then((res) => {
// //               console.log(" משתמש עסקי נרשם", res.data);
// //               if (res.data.status === "errExist") {
// //                 alert("שגיאה: מייל זה כבר קיים במערכת");
// //                 return resetInpt();
// //               } else {
// //                 details = res.data;
// //                 sessionStorage.setItem("status connect user", 1);
// //                 props.connectStatus(1)
// //               }
// //             })
// //             .catch((err) => console.log("שגיאה ברישום משתמש עסקי ", err));
// //         } else {
// //           await signUpPUser(baseFieldsValue).then((res) => {
// //             console.log("מה קיבלנו מנוד חזרה לאחר רישום משתמש פרטי", res);
// //             if (res.data.status === "errExist") {
// //               alert("שגיאה: מייל זה כבר קיים במערכת");
// //               return resetInpt();
// //             } else {
// //               details = res.data;
// //               sessionStorage.setItem("status connect user", 1);
// //             }
// //           });
// //         }
// //         if (sessionStorage.getItem("status connect user")) {
// //           console.log("לאחר הרישום למה דיטיילס שווה", details);
// //           console.log("מה סטטוס המשתמש עכשיו", userType);
// //           sessionStorage.setItem("user", details.id);
// //           sessionStorage.setItem("user name", details.name);
// //           changeUserStts(1);
          
// //           //העלאת תמונת פרופיל
// //           handleSubmit(props.img);
// //           //העלאת תמונה עסקית
// //           handleSubmit(images)
// //           //העברה למסך הבית במקרה של הצלחה
// //           history.push("/Home");
// //         } else {
// //           //חוסר תקינות שדות-הודעה למשתמש
// //           if (!inptName) {
// //             console.log("err name");
// //             nameRef.current.value = "";
// //             nameRef.current.placeholder = " נא להזין שם תקין מאותיות בלבד";
// //             console.log(nameRef.current.placeholder);
// //           }
// //           if (!inptPass) {
// //             passwordRef.current.value = "";
// //             passwordRef.current.placeholder =
// //               "נא להזין סיסמא לפחות ב6 תווים המכילה אות ומספר";
// //           }
// //           if (!inptPhon) {
// //             cellphonRef.current.value = "";
// //             cellphonRef.current.placeholder = "נא להזין מספר טלפון ישראלי תקין";
// //           }
// //           if (!inptMail) {
// //             mailRef.current.value = "";
// //             mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";
// //           }
// //           console.log("err");
// //         }
// //       } else {
// //         if (userType) {
// //           let id = { id: sessionStorage.getItem("user") };
// //           let allDtls = Object.assign(id, baseFieldsValue);
// //           await updateBUser(allDtls).then((res) => {
// //             console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש עסקי", res.data);
// //             history.push("/Home");
// //           });
// //         } else {
// //           let id = { id: sessionStorage.getItem("user") };
// //           let allDtls = Object.assign(id, baseFieldsValue);
// //           await updatePUser(allDtls).then((res) => {
// //             handleSubmit(props.img);
// //             console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש פרטי", res.data);
// //             history.push("/Home");
// //           });
// //         }
// //       }
// //     }
// //   };
// //   useEffect(() => {
// //   console.log(nameRef.current.value);
// // },[])
// //   return (
// //     <Form>
// //       <Form.Control //שם
// //         name="Name"
// //         ref={nameRef}
// //         type="text"
// //         maxLength={20}
// //         onChange={(e) => outFocus(e)}
// //         className={statusUConnect ? "fieldOk" : "fieldErr"}
// //         placeholder="שם"
// //         value={statusUConnect ? sessionStorage.getItem('user name') : ""}
// //         readOnly={!statusUConnect}
// //       />
// //       {!statusUConnect && (
// //         <div>
// //           <Form.Control //סיסמא
// //             name="Pass"
// //             ref={passwordRef}
// //             onChange={(e) => outFocus(e)}
// //             className={inptPass ? "fieldOk" : "fieldErr"}
// //             type="password"
// //             placeholder="סיסמא"
// //           />
// //         </div>
// //       )}
// //       <Form.Control
// //         name="Phon"
// //         onChange={(e) => outFocus(e)}
// //         className={statusUConnect ? "fieldOk" : "fieldErr"}
// //         type="text"
// //         placeholder="טלפון"
// //         value={statusUConnect ? phon : ""}
// //         readOnly={!statusUConnect} // Make the input read-only if user is not connected
// //       />
// //       <Form.Control //מייל
// //         name="Mail"
// //         ref={mailRef}
// //         onChange={(e) => outFocus(e)}
// //         className={inptMail ? "fieldOk" : "fieldErr"}
// //         type="mail"
// //         placeholder="מייל"
// //         value={statusUConnect ? mail : ""}
// //         readOnly={!statusUConnect}
// //       />

// //       {userType && (
// //         <div>
// //           <Form.Control // שם חברה
// //             name="nameCompany"
// //             ref={nameCompanyRef}
// //             type="text"
// //             maxLength={10}
// //             className="athorityField"
// //             placeholder={statusUConnect ? nameCmpny : "שם החברה / העסק"}
// //           />
// //           <Select //רשימה נפתחת של מקצועות
// //             name="profession"
// //             type="text"
// //             onChange={(e) => oCListProf(e)}
// //             placeholder={statusUConnect ? prof : "מקצוע"}
// //             clearable={true}
// //             options={prof}
// //           />
// //           {typeProf && (
// //             <div>
// //               <Select //רשימה נפתחת של תתי מקצועות
// //                 name="subProfession"
// //                 type="text"
// //                 onChange={(e) => oCselectSubProf(e)}
// //                 placeholder={statusUConnect ? subProf : "תתי מקצוע"}
// //                 clearable={true}
// //                 components={makeAnimated()}
// //                 isMulti
// //                 options={subProf}
// //               />
// //             </div>
// //           )}
// //           <SelectAreaCity city={city} area={area} /> {/*//אזור ועיר */}
// //           <Form.Control //אודות
// //             name="about"
// //             ref={aboutRef}
// //             className="athorityField"
// //             type="text"
// //             placeholder={statusUConnect ? about : "אודות"}
// //           />
// //           <Form.Control //ותק
// //             name="seniority"
// //             ref={seniorityRef}
// //             className="athorityField"
// //             type="text"
// //             placeholder={statusUConnect ? seniority : "וותק"}
// //           />
// //           <Form.Control //טווח מחירים
// //             name="priceRange"
// //             ref={priceRangeRef}
// //             className="athorityField"
// //             type="text"
// //             placeholder={statusUConnect ? priceRange : "טווח מחירים"}
// //           />
// //           <Form.Control //עוד...
// //             name="more"
// //             as="textarea"
// //             ref={moreRef}
// //             className="athorityField"
// //             type="text"
// //             style={{ height: "100px" }}
// //             placeholder={
// //               statusUConnect ? more : "מה עוד היית רוצה שלקוחותיך ידעו"
// //             }
// //           />
// //           <label className="lblField">תמונות להתרשמות</label>
// //           <Form.Control //תמונות
// //             name="images"
// //             ref={imagesRef}
// //             className="athorityField"
// //             type="file"
// //             multiple
// //             accept="image/*"
// //             onChange={(e) => setImages(e)}
// //           />
// //         </div>
// //       )}

// //       <Button id="signBtn" className="d-grid gap-2" as={Row} onClick={hendlSM}>
// //         {textBtn}
// //       </Button>
// //     </Form>
// //   );
// // }

// // export default connect(
// //   (state) => {
// //     return {
// //       inptName: state.inptName,
// //       inptPass: state.inptPass,
// //       inptPhon: state.inptPhon,
// //       inptMail: state.inptMail,
// //       typeProf: state.typeProf,
// //       userType: state.userType,
// //       userStatus: state.userStatus,
// //       img: state.img
// //     };
// //   },
// //   {
// //     changeInptName: setInptName,
// //     changeInptPass: setInptPass,
// //     changeInptPhon: setInptPhon,
// //     changeInptMail: setInptMail,
// //     changeTypeProf: setTypeProf,
// //     changeUserStts: setUserStatus,
// //   }
// // )(FullDetailsInputs);
// import React, { useRef, useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./inputUsers.css";
// import { Row, Button } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import { showPUser, updatePUser, signUpPUser } from "../server/connectPU";
// import { showAllProfession, showSubsProfession } from "../server/professions";
// import { showBUser, updateBUser, signUpBUser } from "../server/connectBU";
// import validFields from "./validFields";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { useHistory } from "react-router-dom";
// import SelectAreaCity from "../Home/SelectAreaCity";
// import handleSubmit from "../uploadImg/UploadImg";
// import { connect } from "react-redux";
// import {
//   setInptName,
//   setInptPass,
//   setInptPhon,
//   setInptMail,
//   setTypeProf,
//   setUserStatus,
//   setImg,
// } from "../redux/actions/inputs.action";
// function FullDetailsInputs(props) {
//   const {
//     inptName,
//     inptPass,
//     inptPhon,
//     inptMail,
//     typeProf,
//     userType,
//     changeTypeProf,
//     changeUserStts,
//   } = props;

//   let allProf = [{}];
//     let allSubProf = [{}];
//     let details;
//   let textBtn;
  
//   const history = useHistory();
//   const [phon, setPhon] = useState("");
//   const [mail, setMail] = useState("");
//   const [nameCmpny, setNameCmpny] = useState("");
//   const [prof, setProf] = useState("");
//   const [subProf, setSubProf] = useState("");
//   const [area, setArea] = useState("");
//   const [city, setCity] = useState("");
//   const [about, setAbout] = useState("");
//   const [seniority, setSeniority] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [more, setMore] = useState("");
//   const [profSelect, setProfSelect] = useState("");
//   const [selectSubProf, setSelectSubProf] = useState();
//   const [images, setImages] = useState();

//   const nameRef = useRef("");
//   const passwordRef = useRef("");
//   const cellphonRef = useRef("");
//   const mailRef = useRef("");
//   const nameCompanyRef = useRef("");
//   const aboutRef = useRef("");
//   const seniorityRef = useRef("");
//   const priceRangeRef = useRef("");
//   const moreRef = useRef("");
//   const imagesRef = useRef("");

//   let statusUConnect = sessionStorage.getItem("status connect user");

//   //שליפת המקצועות בטעינת הקומפוננטה
//   useEffect(async () => {
//     resetInpt();
//     changeTypeProf(0);
//     if (!statusUConnect) {
//       //במידה ואין משתמש רשום
//       //שליפה של כל המקצועות
//       await showAllProfession()
//         .then(async (res) => {
//           res.data.map((item, i) => {
//             allProf[i] = {
//               id: item._id,
//               value: item.name,
//               label: item.name,
//             };
//           });
//           console.log(allProf);
//           await setProf(allProf);
//         })
//         .catch((err) => {
//           console.log("react filed get all... " + err);
//         });
//     }
//   }, []);

//   //האם יטען דף הרשמה או עדכון פרטים
//   useEffect(() => {
//     const howLoad = async () => {
//       console.log("יוז אפקט ");
//       //קיים משתמש-יטען דף עם פרטי המשתמש
//       if (statusUConnect)
//         if (userType == "0") {
//           console.log("פרטי");
//           //משתמש פרטי
//           await showPUser({ id: sessionStorage.getItem("user") }).then(
//             (res) => {
//               details = res.data[0];
//               console.log(res);
//               setPhon(details.phone);
//               setMail(details.userMail);
//               // setImg(details.image)
//             }
//           );
//         } else {
//           //משתמש עסקי
//           await showBUser({ id: sessionStorage.getItem("user") }).then(
//             (res) => {
//               details = res.data[0];
//               console.log(res);
//               setPhon(details.phone);
//               setMail(details.userMail);
//               setNameCmpny(details.nameCmpny);
//               setProf(details.prof);
//               setSubProf(details.subProf);
//               setArea(details.area);
//               setCity(details.city);
//               setAbout(details.about);
//               setSeniority(details.seniority);
//               setPriceRange(details.priceRange);
//               setMore(details.more);
//               // setImg(details.image);
//             }
//           );
//         }
//     };
//     howLoad();
//   }, [statusUConnect]);

//   function outFocus(e){
//     const valid = validFields(e);
//     const fieldValue = e.target.value;
//     const fieldName = e.target.name;
//     eval(`set${e.target.name}(${e.target.value})`)
//     const changeFunctionName = `changeInpt${
//       fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//     }`;
//     if (valid) {
//       props[changeFunctionName](fieldValue);
//     }
//   };
//   // פונקציה לשליפת תתי מקצוע לפי המקצוע הנבחר
//   const oCListProf = async (e) => {
//     setProfSelect(e.value);
//     console.log(profSelect);
//     await showSubsProfession(e.id)
//       .then(async (res) => {
//         console.log("פונק' כל תתי המקצועות סרבר ריאקט");
//         res.data.map((item, i) => {
//           allSubProf[i] = { value: item.name, label: item.name };
//         });
//         props.changeTypeProf(1);
//         console.log(allSubProf);
//         await setSubProf(allSubProf);
//       })
//       .catch((err) => {
//         console.log("react filed get all... " + err);
//       });
//   };

//   //פונקציה שמכניסה למערך כל תת מקצוע שנבחר

//   const oCselectSubProf = (e) => {
//     setSelectSubProf(e);
//     console.log(selectSubProf);
//   };

//   const resetInpt = () => {
//     if (!sessionStorage.getItem("status connect user")) {
//       nameRef.current.value = "";
//       passwordRef.current.value = "";
//       cellphonRef.current.value = "";
//       mailRef.current.value = "";
//     }
//     props.changeInptName(0);
//     props.changeInptPass(0);
//     props.changeInptPhon(0);
//     props.changeInptMail(0);
//     return;
//   };

//   // פונקציית לחיצת הכפתור
//   const hendlSM = async () => {
//     /** אובייקט המכיל את כל ערכי השדות שהוזנו **/
//     let baseFieldsValue = {
//       name: nameRef.current.value,
//       password: passwordRef.current.value,
//       phone: cellphonRef.current.value,
//       userMail: mailRef.current.value,
//     };
//     let athoFildsValue, allBUField;
//     if (userType) {
//       //משתמש עסקי=שדות נוספים
//       console.log(profSelect);
//       athoFildsValue = {
//         company: nameCompanyRef.current.value,
//         profession: profSelect,
//         subProfession: selectSubProf,
//         area: sessionStorage.getItem("areaSelected"),
//         city: sessionStorage.getItem("citySelected"),
//         about: aboutRef.current.value,
//         seniority: seniorityRef.current.value,
//         priceRange: priceRangeRef.current.value,
//         more: moreRef.current.value,
//       };

//       allBUField = Object.assign(baseFieldsValue, athoFildsValue);
//       console.log(allBUField);
//     }
//     if (!statusUConnect) {
//       //רישום משתמש
//       if (inptName && inptPass && inptPhon && inptMail) {
//         if (userType) {
//           await signUpBUser(allBUField)
//             .then((res) => {
//               console.log(" משתמש עסקי נרשם", res.data);
//               if (res.data.status === "errExist") {
//                 alert("שגיאה: מייל זה כבר קיים במערכת");
//                 return resetInpt();
//               } else {
//                 details = res.data;
//                 sessionStorage.setItem("status connect user", 1);
//                 props.connectStatus(1);
//               }
//             })
//             .catch((err) => console.log("שגיאה ברישום משתמש עסקי ", err));
//         } else {
//           await signUpPUser(baseFieldsValue).then((res) => {
//             console.log("מה קיבלנו מנוד חזרה לאחר רישום משתמש פרטי", res);
//             if (res.data.status === "errExist") {
//               alert("שגיאה: מייל זה כבר קיים במערכת");
//               return resetInpt();
//             } else {
//               details = res.data;
//               sessionStorage.setItem("status connect user", 1);
//             }
//           });
//         }
//         if (sessionStorage.getItem("status connect user")) {
//           console.log("לאחר הרישום למה דיטיילס שווה", details);
//           console.log("מה סטטוס המשתמש עכשיו", userType);
//           sessionStorage.setItem("user", details.id);
//           sessionStorage.setItem("user name", details.name);
//           changeUserStts(1);

//           //העלאת תמונת פרופיל
//           handleSubmit(props.img);
//           //העלאת תמונה עסקית
//           handleSubmit(images);
//           //העברה למסך הבית במקרה של הצלחה
//           history.push("/Home");
//         } else {
//           //חוסר תקינות שדות-הודעה למשתמש
//           if (!inptName) {
//             console.log("err name");
//             nameRef.current.value = "";
//             nameRef.current.placeholder = " נא להזין שם תקין מאותיות בלבד";
//             console.log(nameRef.current.placeholder);
//           }
//           if (!inptPass) {
//             passwordRef.current.value = "";
//             passwordRef.current.placeholder =
//               "נא להזין סיסמא לפחות ב6 תווים המכילה אות ומספר";
//           }
//           if (!inptPhon) {
//             cellphonRef.current.value = "";
//             cellphonRef.current.placeholder = "נא להזין מספר טלפון ישראלי תקין";
//           }
//           if (!inptMail) {
//             mailRef.current.value = "";
//             mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";
//           }
//           console.log("err");
//         }
//       } else {
//         if (userType) {
//           let id = { id: sessionStorage.getItem("user") };
//           let allDtls = Object.assign(id, baseFieldsValue);
//           await updateBUser(allDtls).then((res) => {
//             console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש עסקי", res.data);
//             history.push("/Home");
//           });
//         } else {
//           let id = { id: sessionStorage.getItem("user") };
//           let allDtls = Object.assign(id, baseFieldsValue);
//           await updatePUser(allDtls).then((res) => {
//             handleSubmit(props.img);
//             console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש פרטי", res.data);
//             history.push("/Home");
//           });
//         }
//       }
//     }
//   };

//   return (
//     <Form>
//       <Form.Control //שם
//         name="Name"
//         ref={nameRef}
//         type="text"
//         maxLength={20}
//         onChange={(e) => outFocus(e)}
//         className={statusUConnect ? "fieldOk" : "fieldErr"}
//         placeholder="שם"
//         value={statusUConnect ? sessionStorage.getItem("user name") : ""}
//         readOnly={!statusUConnect}
//       />
//       {!statusUConnect && (
//         <div>
//           <Form.Control //סיסמא
//             name="Pass"
//             ref={passwordRef}
//             onChange={(e) => outFocus(e)}
//             className={inptPass ? "fieldOk" : "fieldErr"}
//             type="password"
//             placeholder="סיסמא"
//           />
//         </div>
//       )}
//       <Form.Control
//         name="Phon"
//         onChange={(e) => outFocus(e)}
//         className={statusUConnect ? "fieldOk" : "fieldErr"}
//         type="text"
//         placeholder="טלפון"
//         value={statusUConnect ? phon : ""}
//         readOnly={!statusUConnect} // Make the input read-only if user is not connected
//       />
//       <Form.Control //מייל
//         name="Mail"
//         ref={mailRef}
//         onChange={(e) => outFocus(e)}
//         className={inptMail ? "fieldOk" : "fieldErr"}
//         type="mail"
//         placeholder="מייל"
//         value={statusUConnect ? mail : ""}
//         readOnly={!statusUConnect}
//       />

//       {userType && (
//         <div>
//           <Form.Control // שם חברה
//             name="nameCompany"
//             ref={nameCompanyRef}
//             type="text"
//             maxLength={10}
//             className="athorityField"
//             placeholder={statusUConnect ? nameCmpny : "שם החברה / העסק"}
//           />
//           <Select //רשימה נפתחת של מקצועות
//             name="profession"
//             type="text"
//             onChange={(e) => oCListProf(e)}
//             placeholder={statusUConnect ? prof : "מקצוע"}
//             clearable={true}
//             options={prof}
//           />
//           {typeProf && (
//             <div>
//               <Select //רשימה נפתחת של תתי מקצועות
//                 name="subProfession"
//                 type="text"
//                 onChange={(e) => oCselectSubProf(e)}
//                 placeholder={statusUConnect ? subProf : "תתי מקצוע"}
//                 clearable={true}
//                 components={makeAnimated()}
//                 isMulti
//                 options={subProf}
//               />
//             </div>
//           )}
//           <SelectAreaCity city={city} area={area} /> {/*//אזור ועיר */}
//           <Form.Control //אודות
//             name="about"
//             ref={aboutRef}
//             className="athorityField"
//             type="text"
//             placeholder={statusUConnect ? about : "אודות"}
//           />
//           <Form.Control //ותק
//             name="seniority"
//             ref={seniorityRef}
//             className="athorityField"
//             type="text"
//             placeholder={statusUConnect ? seniority : "וותק"}
//           />
//           <Form.Control //טווח מחירים
//             name="priceRange"
//             ref={priceRangeRef}
//             className="athorityField"
//             type="text"
//             placeholder={statusUConnect ? priceRange : "טווח מחירים"}
//           />
//           <Form.Control //עוד...
//             name="more"
//             as="textarea"
//             ref={moreRef}
//             className="athorityField"
//             type="text"
//             style={{ height: "100px" }}
//             placeholder={
//               statusUConnect ? more : "מה עוד היית רוצה שלקוחותיך ידעו"
//             }
//           />
//           <label className="lblField">תמונות להתרשמות</label>
//           <Form.Control //תמונות
//             name="images"
//             ref={imagesRef}
//             className="athorityField"
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => setImages(e)}
//           />
//         </div>
//       )}

//       <Button id="signBtn" className="d-grid gap-2" as={Row} onClick={hendlSM}>
//         {textBtn}
//       </Button>
//     </Form>
//   );
// }

// export default connect(
//   (state) => {
//     return {
//       inptName: state.inptName,
//       inptPass: state.inptPass,
//       inptPhon: state.inptPhon,
//       inptMail: state.inptMail,
//       typeProf: state.typeProf,
//       userType: state.userType,
//       userStatus: state.userStatus,
//       img: state.img
//     };
//   },
//   {
//     changeInptName: setInptName,
//     changeInptPass: setInptPass,
//     changeInptPhon: setInptPhon,
//     changeInptMail: setInptMail,
//     changeTypeProf: setTypeProf,
//     changeUserStts: setUserStatus,
//   }
// )(FullDetailsInputs);

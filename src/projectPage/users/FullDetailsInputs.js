

import React, { useEffect, useRef, useState } from 'react'
import { showBUser, signUpBUser, updateBUser } from '../server/connectBU'
import { showPUser, signUpPUser, updatePUser } from '../server/connectPU';
import { showAllProfession, showSubsProfession } from '../server/professions';
import { useHistory } from "react-router-dom";
import { Row, Button, } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import handleSubmit from '../uploadImg/UploadImg';
import validFields from "./validFields";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SelectAreaCity from "../Home/SelectAreaCity";
import { connect } from 'react-redux';

function FullDetailsInputs(props) {
  /** states for fields' values */
  const [name, setName] = useState({ txt: "", val: 0 });
  const [pass, setPass] = useState({ txt: "", val: 0 });
  const [phon, setPhon] = useState({ txt: "", val: 0 });
  const [mail, setMail] = useState({ txt: "", val: 0 });
  const [nameCmpny, setNameCmpny] = useState();
  const [prof, setProf] = useState();
  const [profs, setProfs] = useState([]);
  const [subProf, setSubProf] = useState([]);
  const [subProfs, setSubProfs] = useState([]);
  const [about, setAbout] = useState();
  const [seniority, setSeniority] = useState();
  const [priceRange, setPriceRange] = useState();
  const [more, setMore] = useState();
  const [images, setImages] = useState([]);
  const [area, setArea] = useState();
  const [city, setCity] = useState();

  const [profSelect, setProfSelect] = useState("");

  const nameRef = useRef();
  const passRef = useRef();
  const phonRef = useRef();
  const mailRef = useRef();

  const history = useHistory();

  let allProf = [];
  let textBtn;

  //מה יהיה רשום על הכפתור
  sessionStorage.getItem("status connect user")
    ? (textBtn = "עדכון פרטים")
    : (textBtn = "הרשמה");

  const changeStates = (data, isBUser) => {
    console.log(data);
    setName({
      txt: data.name,
      val: validFields({ target: { value: data.name, name: "Name" } }),
    });
    setPhon({
      txt: data.phone,
      val: validFields({ target: { value: data.phone, name: "Phon" } }),
    });
    setMail({
      txt: data.userMail,
      val: validFields({ target: { value: data.userMail, name: "Mail" } }),
    });
    if (isBUser) {
      console.log(data);
      setNameCmpny(data.company);
      setProf(data.profession);
      setSubProf(data.subProfession);
      setAbout(data.about);
      setSeniority(data.seniority);
      setPriceRange(data.priceRange);
      setMore(data.more);
      // setImages()
      sessionStorage.getItem("status connect user")
    }
  };

  /** if has not user connected, get all the professions */
  useEffect(async () => {
    resetInpt();
    if (!sessionStorage.getItem("status connect user")){
      //שליפה של כל המקצועות
      await showAllProfession()
        .then(async (res) => {
          res.data.map((item, i) => {
            allProf[i] = {
              id: item._id,
              value: item.name,
              label: item.name,
            };
          });
          console.log(allProf);
          await setProfs(allProf);
        })
        .catch((err) => {
          console.log("react filed get all... " + err);
        });
    }
  }, []);

  /** get the subProff by the prof selected */
  const oCListProf = async (e) => {
    let allSubProf = [];
    setProf(e.value);
    console.log(profSelect);
    await showSubsProfession(e.id)
      .then(async (res) => {
        res.data.map((item, i) => {
          allSubProf[i] = { value: item.name, label: item.name };
        });
        setProfSelect(1);
        await setSubProfs(allSubProf);
      })
      .catch((err) => {
        console.log("react filed get all... " + err);
      });
  };

  //פונקציה שמכניסה למערך כל תת מקצוע שנבחר

  const oCselectSubProf = (e) => {
    setSubProf(e);
    console.log(subProf);
  };

  /* Check user connect - if display "SignUp" or "Update" */
  useEffect(async () => {
    if (sessionStorage.getItem("status connect user"))
      if (sessionStorage.getItem("user type")) {
        /** business user */
        await showBUser({ _id: sessionStorage.getItem("user") }).then((res) => {
          changeStates(res.data[0], 1);
        });
      } else {
        await showPUser({ id: sessionStorage.getItem("user") }).then((res) => {
          changeStates(res.data[0], 0);
        });
      }
  }, []);

  /* clear the fields */
  const resetInpt = () => {
    if (!sessionStorage.getItem("status connect user")) {
      nameRef.current.value = "";
      passRef.current.value = "";
      phonRef.current.value = "";
      mailRef.current.value = "";
    }
  };

  const outFocus = (e) => {
    eval(`set${e.target.name}(prevStt=>(
            {
            txt: e.target.value, val:prevStt.val}
            ))`);
    const valid = validFields(e);
    if (valid) {
      eval(`set${e.target.name}(prevStt=>({
            txt:prevStt.txt,
            val:1
          }))`);
    } else {
      eval(`set${e.target.name}(prevStt=>({
            txt:prevStt.txt,
            val:0
          }))`);
    }
    
  };

  const onChngBUserFields = (e) => {
    console.log(e.target.name);
    eval(`set${
      e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)
    }(prevStt=>(e.target.value))`);
  };

  /** submit function */
  const hendlSM = async () => {
    /** אובייקט המכיל את כל ערכי השדות שהוזנו **/
    let baseFieldsValue = {
      name: name.txt,
      password: pass.txt,
      phone: phon.txt,
      userMail: mail.txt,
    };
    let athoFildsValue, allBUField;
    if (sessionStorage.getItem("user type") != 0) {
      console.log(nameCmpny);
      //משתמש עסקי=שדות נוספים
      athoFildsValue = {
        company: nameCmpny,
        profession: prof,
        subProfession: subProf,
        area: sessionStorage.getItem("areaSelected"),
        city: sessionStorage.getItem("citySelected"),
        about: about,
        seniority: seniority,
        priceRange: priceRange,
        more: more,
      };

      allBUField = Object.assign(baseFieldsValue, athoFildsValue);
    }
    if (!sessionStorage.getItem("status connect user")) {
      //רישום משתמש
      if (name.val && pass.val && phon.val && mail.val) {
        if (sessionStorage.getItem("user type") ==1) {
          await signUpBUser(allBUField)
            .then((res) => {
              if (res.data.status === "errExist") {
                alert("שגיאה: מייל זה כבר קיים במערכת");
                return resetInpt();
              } else {
                sessionStorage.setItem("status connect user", 1);
                sessionStorage.setItem("user", res.data.id);
                sessionStorage.setItem("user name", res.data.name);
                // history.push("/Home");
                history.push(sessionStorage.getItem("url"));
                
              }
            })
            .catch((err) => console.log("שגיאה ברישום משתמש עסקי ", err));
        } else {
          await signUpPUser(baseFieldsValue).then((res) => {
            if (res.data.status === "errExist") {
              alert("שגיאה: מייל זה כבר קיים במערכת");
              return resetInpt();
            } else {
              console.log(res.data);
              sessionStorage.setItem("status connect user", 1);
              sessionStorage.setItem("user", res.data.id);
              sessionStorage.setItem("user name", res.data.name);
              // history.push("/Home");
              history.push(sessionStorage.getItem("url"));
            }
          });
        }
        //העלאת תמונת פרופיל
        // handleSubmit(sessionStorage.getItem("prflImg"), 0);
        //העלאת תמונה עסקית
        console.log('***********', images);
        if (images && images.files && images.files.length > 0)
          console.log(images);
          handleSubmit(images, 1);
      } else {
        // חוסר תקינות שדות-הודעה למשתמש
        if (!name.val) {
          console.log("err name");
          setName({ txt: "", val: 0 });
          nameRef.current.placeholder = " נא להזין שם תקין מאותיות בלבד";
        }
        if (!pass.val) {
          setPass({ txt: "", val: 0 });
          passRef.current.placeholder =
            "נא להזין סיסמא לפחות ב6 תווים המכילה אות ומספר";
        }
        if (!phon.val) {
          setPhon({ txt: "", val: 0 });
          phonRef.current.placeholder = "נא להזין מספר טלפון ישראלי תקין";
        }
        if (!mail.val) {
          setMail({ txt: "", val: 0 });
          mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";
        }
        console.log("err");
      }
    } else {
      if (sessionStorage.getItem("user type")) {
        let id = { _id: sessionStorage.getItem("user") };
        let allDtls = Object.assign(id, baseFieldsValue);
        await updateBUser(allDtls).then((res) => {
          console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש עסקי", res);
          history.push("/Home");
        });
        //העלאת תמונה עסקית
        console.log(images);
        if (images && images.files && images.files.length > 0)
          handleSubmit(images, 1);
      } else {
        let id = { id: sessionStorage.getItem("user") };
        let allDtls = Object.assign(id, baseFieldsValue);
        await updatePUser(allDtls).then((res) => {
          // handleSubmit(sessionStorage.getItem("prflImg"), 0);
          console.log("מה קיבלנו מנוד חזרה לאחר עדכון משתמש פרטי", res.data);
          history.push("/Home");
        });
      }
      // // //העלאת תמונת פרופיל
      // handleSubmit(sessionStorage.getItem("prflImg"), 0);
      
    }
  };
  return (
    <Form>
      <Form.Control //שם
        name="Name"
        type="text"
        ref={nameRef}
        maxLength={20}
        onChange={(e) => outFocus(e)}
        className={name.val ? "fieldOk" : "fieldErr"}
        placeholder="שם"
        value={name.txt}
      />
      {!sessionStorage.getItem("status connect user") && (
        <div>
          <Form.Control //סיסמא
            name="Pass"
            ref={passRef}
            onChange={(e) => outFocus(e)}
            className={pass.val ? "fieldOk" : "fieldErr"}
            type="password"
            placeholder="סיסמא"
          />
        </div>
      )}
      <Form.Control
        name="Phon"
        ref={phonRef}
        onChange={(e) => outFocus(e)}
        className={phon.val ? "fieldOk" : "fieldErr"}
        type="text"
        placeholder="טלפון"
        value={phon.txt}
      />
      <Form.Control //מייל
        name="Mail"
        ref={mailRef}
        onChange={(e) => outFocus(e)}
        className={mail.val ? "fieldOk" : "fieldErr"}
        type="mail"
        placeholder="מייל"
        value={mail.txt}
      />

      {(props.userType || sessionStorage.getItem("user type")) && (
        <div>
          <Form.Control // שם חברה
            name="nameCmpny"
            type="text"
            maxLength={10}
            className="athorityField"
            placeholder="שם החברה / העסק"
            value={nameCmpny}
            onChange={(e) => onChngBUserFields(e)}
          />
          {!sessionStorage.getItem("status connect user") && (
            <>
              <Select //רשימה נפתחת של מקצועות
                name="profession"
                type="text"
                onChange={(e) => oCListProf(e)}
                placeholder="מקצוע"
                // value={prof}
                clearable={true}
                options={profs}
                className="athorityField"
              />

              {profSelect && (
                <div>
                  <Select //רשימה נפתחת של תתי מקצועות
                    name="subProfession"
                    type="text"
                    onChange={(e) => oCselectSubProf(e)}
                    placeholder="תתי מקצוע"
                    // value={subProf}
                    clearable={true}
                    components={makeAnimated()}
                    isMulti
                    options={subProfs}
                    className="athorityField"
                  />
                </div>
              )}
            </>
          )}
          <SelectAreaCity city={city} area={area} className="athorityField" />
          <Form.Control //אודות
            name="about"
            className="athorityField"
            type="text"
            placeholder="אודות"
            value={about}
            onChange={(e) => onChngBUserFields(e)}
          />
          <Form.Control //ותק
            name="seniority"
            className="athorityField"
            type="text"
            placeholder="וותק"
            value={seniority}
            onChange={(e) => onChngBUserFields(e)}
          />
          <Form.Control //טווח מחירים
            name="priceRange"
            className="athorityField"
            type="text"
            placeholder="טווח מחירים"
            value={priceRange}
            onChange={(e) => onChngBUserFields(e)}
          />
          <Form.Control //עוד...
            name="more"
            as="textarea"
            className="athorityField"
            type="text"
            style={{ height: "100px" }}
            placeholder="מה עוד היית רוצה שלקוחותיך ידעו"
            value={more}
            onChange={(e) => onChngBUserFields(e)}
          />
          <label className="lblField">תמונות להתרשמות</label>
          <Form.Control //תמונות
            name="images"
            className="athorityField"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e)}
          />
        </div>
      )}

      <Button id="signBtn" className="d-grid gap-2" as={Row} onClick={hendlSM}>
        {textBtn}
      </Button>
    </Form>
  );
};
export default connect(
  (state) => {
    return {
      userType: state.userType,
    };
  },
)(FullDetailsInputs);
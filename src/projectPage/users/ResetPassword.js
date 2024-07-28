import React, {useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inputUsers.css"
import { Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { resetPass } from "../server/connectPU";
import { connect } from "react-redux";
import { setInptMail, setInptPass } from "../redux/actions/inputs.action"




function ResetPassword(props) {
    
    const mailRef = useRef('');
    const newPassRef = useRef('');
  const [successPass, setSuccessPass] = useState(0)
  const [expiredToken, setExpiredToken] = useState(0)

    const { inptMail, inptPass } = props;

    /** ביטוי רגולרי לבדיקת תקינות המייל והסיסמא **/
    let validRgxField = {
        pass: new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$'),
        mail: new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    }
    
    /** פונקציה לבדיקת ולידציה **/
    const outFocus = (e) => {
        switch (e.target.name) {
            case "mail":
                if (validRgxField.mail.test(mailRef.current.value)) props.changeInptMail(1)
                else props.changeInptMail(0)
                break;
            case "password":
                if (validRgxField.pass.test(newPassRef.current.value)) props.changeInptPass(1)
                else props.changeInptPass(0)
                break;
            default: console.log("default case");
        }
    }


    /** פונקציית לחיצת הכפתור **/
    const HendlSM =async (props)  => {
        const token = props.view.location.search.substring(7);
        const resPassDetails = {
            mail: mailRef.current.value,
            newPass: newPassRef.current.value,
            token: token
        };
        if (inptMail && inptPass) {
            console.log(resPassDetails);
          await resetPass(resPassDetails).then(
              
            res => {
              console.log(res)
              if (res.data === true)
                  setSuccessPass(1)
              if (res.data === "Expired token")
                  setExpiredToken(1)
              }
            )
        }
        else if (!inptMail) {
            mailRef.current.value = "";
            mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";
            console.log("err- unvalid mail");
        }
        else {
            newPassRef.current.value = "";
            newPassRef.current.placeholder = "נא להזין סיסמא לפחות ב6 תווים המכילה אות ומספר";
            console.log("err- unvalid pass");
        }
    }

    return (
      <>
        {!successPass && !expiredToken &&(
          <Form>
            <Form.Control //מייל
              name="mail"
              ref={mailRef}
              onChange={(e) => outFocus(e)}
              className={inptMail ? "fieldOk" : "fieldErr"}
              type="mail"
              placeholder="מייל"
            />

            <Form.Control //סיסמא
              name="password"
              ref={newPassRef}
              onChange={(e) => outFocus(e)}
              className={inptPass ? "fieldOk" : "fieldErr"}
              type="password"
              placeholder="סיסמא חדשה"
            />

            <Button
              id="signBtn"
              className="d-grid gap-2"
              as={Row}
              onClick={HendlSM}
            >
              איפוס סיסמא
            </Button>
          </Form>
        )}
        {successPass && <h3>סיסמתך שונתה בהצלחה!</h3>}
        {expiredToken && <h3>פג תוקפו של טוקן איפוס הסיסמא</h3>}
      </>
    );
}

export default connect(
       (state) => {
        return{
            inptMail: state.inptMail,
            inptPass: state.inptPass,
        };
    },
	{
        changeInptMail: setInptMail,
        changeInptPass: setInptPass,

    }
)(ResetPassword)
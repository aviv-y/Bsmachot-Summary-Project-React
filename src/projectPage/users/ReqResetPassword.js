import React, {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./inputUsers.css"
import { Row, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { reqResetPass } from "../server/connectPU";
import { connect } from "react-redux";
import { setInptMail } from "../redux/actions/inputs.action"



function RequestResetPassword(props) {
    
    const mailRef = useRef('');
    const [successPass, setSuccessPass]=useState(0);
    const {inptMail} = props;

    /** ביטוי רגולרי לבדיקת תקינות המייל **/
    const mail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    
    /** פונקציה לבדיקת ולידציה **/
    const outFocus = () => {
        if (mail.test(mailRef.current.value)) props.changeInptMail(1);
        else props.changeInptMail(0);

    }        


    /** פונקציית לחיצת הכפתור **/
    const hendlSM = () => {
        const mailObj = {
            mail: mailRef.current.value
    }
        if (inptMail)
        {
            console.log(mailObj);
            reqResetPass(mailObj).then(
                res => {
                    if (res)
                        setSuccessPass(1)
                }
            );
        }
        else {
            mailRef.current.value = "";
            mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";
            console.log("err");
        }
    }

    return (
        <>
            {!successPass &&
                <Form>
                    <Form.Control    //מייל
                        name="mail"
                        ref={mailRef}
                        onChange={e => outFocus(e)}
                        className={inptMail ? "fieldOk" : "fieldErr"}
                        type="mail"
                        placeholder="מייל" />

                    < Button
                        id="signBtn"
                        className="d-grid gap-2"
                        as={Row}
                        onClick={hendlSM}>
                        שלח לי קוד לאיפוס סיסמא
                    </Button>
                </Form>
            }
            {successPass &&
                <h3>הודעת איפוס סיסמא נשלחה לתיבת המייל שלך</h3>
            }
       </>
    )
}

export default connect(
       (state) => {
        return{
            inptMail: state.inptMail,
        };
    },
	{
        changeInptMail: setInptMail,
    }
)(RequestResetPassword)
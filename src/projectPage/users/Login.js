import React, {useEffect, useRef} from "react";
import "./inputUsers.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { loginPUser } from "../server/connectPU"
import { loginBUser } from "../server/connectBU"
import { Form, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setInptPass, setInptMail, setBtnNavB, setUserStatus } from "../redux/actions/inputs.action"
import { Switch, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";
import RequestResetPassword from "./ReqResetPassword";
import { useHistory } from "react-router-dom";
import getImages from "../uploadImg/getImages";



function Login(props){

    const history = useHistory();
    const mailRef = useRef('');
    const passwordRef = useRef('');

    const { inptPass, inptMail, userType, text, link, url} = props;
        
    useEffect(() => {
        props.changeInptMail(0);
        props.changeInptPass(0);  
    },[])
    

    let validRgxField = {
        pass: new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$'),
        mail: new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    }

    
    async function loginClick() {
        let details = {
            userMail: mailRef.current.value.toLowerCase(),
            password: passwordRef.current.value
        }
        let respons;
        if (inptPass && inptMail){
            if (userType) {
                await loginBUser(details).then(async(res) => {
                    console.log(res);  
                    console.log(res.data);  
                    respons = res.data;
                    if (respons.mess!="success") {//למה הוא לא נותן לי לשים את זה בחוץ ולהמנע מרי-קוד
                        alert("נתוני הכניסה אינם תואמים");
                        console.log(respons);
                        props.changeInptMail(0);
                        props.changeInptPass(0);
                        passwordRef.current.value=""; 
                        mailRef.current.value="";
                    }
                    else {
                        sessionStorage.setItem('user', respons.id);
                        sessionStorage.setItem('status connect user', 1);
                        sessionStorage.setItem('user name', respons.name);
                        props.changeInptMail(0);
                        props.changeInptPass(0);
                        props.changeBtnNavB(0);
                        console.log(url);
                        const imgs = await getImages(
                          sessionStorage.getItem("user"),
                          1
                        );
                        if(imgs.length>0);
                            sessionStorage.setItem("prflImg", imgs);
                        if (sessionStorage.getItem("url").indexOf("Login") >= 0)
                          history.push("/Home");
                        else history.push(sessionStorage.getItem("url"));
                       window.location.reload();
                    }
                })
            }
            else {
                await loginPUser(details).then(async(res) => {
                    console.log(res); 
                    respons = res.data;
                    if (respons.mess!="success") {//למה הוא לא נותן לי לשים את זה בחוץ ולהמנע מרי-קוד
                        alert("נתוני הכניסה אינם תואמים");
                        console.log("opppppsss");
                        console.log(respons);
                        props.changeInptMail(0);
                        props.changeInptPass(0);
                        passwordRef.current.value=""; 
                        mailRef.current.value="";
                    }
                    else {
                        sessionStorage.setItem('user', respons.id);
                        sessionStorage.setItem('status connect user', 1);
                        sessionStorage.setItem('user name', respons.name);
                        props.changeUserStts(1);
                        props.changeInptMail(0);
                        props.changeInptPass(0);
                        const imgs = await getImages(
                          sessionStorage.getItem("user"),
                          1
                        );
                        if (imgs.length>0) {
                             sessionStorage.setItem("prflImg", imgs);
                        }
                           
                        // history.push("/Home");
                        if (sessionStorage.getItem("url").indexOf('Login') >= 0)                           
                            history.push('/Home');
                        else  history.push(sessionStorage.getItem("url"));
                        window.location.reload();
                    }
                })
            }
            
            
                    
        }
        else {
            if (!inptPass) { details.pass = ""; passwordRef.current.placeholder = "נא להזין סיסמא לפחות ב6 תווים המכילה אות ומספר";}
            if (!inptMail) { details.mail = ""; mailRef.current.placeholder = "נא להזין כתובת מייל תקינה";}
            console.log("err");
        }
    }

    const outFocus = (e) => {
        const mail = mailRef.current.value;
        const pass = passwordRef.current.value;

        switch (e.target.name) {
             case "mail":
                    if(validRgxField.mail.test(mail)) props.changeInptMail(1)
                    else props.changeInptMail(0)
                break;
            case "password":
                    if(validRgxField.pass.test(pass)) props.changeInptPass(1)
                    else props.changeInptPass(0)
                break;
            default: console.log("default case");
        }
    }

    return (
        <>
            <h3>כניסה</h3>
            <Form>
             <Form.Control    //מייל
                name="mail"
                ref={mailRef}
                onChange={e => outFocus(e)}                
                className={inptMail? "fieldOk":"fieldErr"}
                type="mail"
                placeholder="מייל" />
            <Form.Control      //סיסמא
                name="password"
                ref={passwordRef}
                onChange={e => outFocus(e)}                
                className={inptPass? "fieldOk":"fieldErr"}
                type="password"
                placeholder="סיסמא" />    
            < Button
                id="signBtn"
                className="d-grid gap-2" 
                as={Row}
                onClick={loginClick}>
                הכנס
                </Button>
            </Form>
            <table id="tblQ">
                <tr>
                  <th> <p className="forgot-password text-right" id="pswrdQ"> <Link to={"/ReqResetPass"}>שכחת סיסמא?</Link></p></th>
                  <th> <p className="forgot-password " id="acntQ">אין לך חשבון? <Link to={"/Sign-Up"}>הרשם!</Link></p></th>
                </tr>
            </table>
            <Switch>
                <Route path="/Sign-Up" component={SignUp}/>
                <Route path="/ReqResetPass" component={RequestResetPassword}/>
            </Switch>
            
        </>
    );

}
export default connect(
       (state) => {
        return {   
            url: state.url,
            inptPass: state.inptPass,
            inptMail: state.inptMail,
            userType: state.userType,
            userStatus: state.userStatus,
        };
    },
	{
        changeInptPass: setInptPass,
        changeInptMail: setInptMail,
        changeBtnNavB: setBtnNavB,
        changeUserStts: setUserStatus
    }
)(Login)
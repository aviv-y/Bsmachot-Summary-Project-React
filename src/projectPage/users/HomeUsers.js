import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import RequestResetPassword from "./ReqResetPassword";
import ResetPassword from "./ResetPassword";
import "./inputUsers.css";
import { connect } from "react-redux";
import { setBtnNavB } from "../redux/actions/inputs.action";



/**
 * זהו דף הבסיס של כניסה ורישום למשתמש פרטי
 * כאן כתוב קוד הסרגל העליון של הדף, ופה מוכלות הקומפוננטות של רישום וכניסה המוצגות לפי ראוטר המופעל ע"י כפתורי הסרגל
 */
function HomeUsers(props) {
  
  // useEffect(() => { //הגדרת לקוח פרטי בברירת מחדל בטעינת הקומפוננטה  
  //   sessionStorage.setItem("user type", 0);
  //   console.log("יוזאפקט");
  //   props.changeBtnNavB(1);
  //   },[])


  return (
    <>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route path="/Login" component={Login} />
              <Route
                path="/CommentMess"
                component={Login}
              />
              {!sessionStorage.getItem("user") && (
                <Route path="/Sign-Up" component={SignUp} />
              )}
              <Route path="/ReqResetPass" component={RequestResetPassword} />
              <Route path="/ResetPass" component={ResetPassword} />
              <Route exact path="/Details-User" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
export default connect(
       (state) => {
        return{
            btnNavB: state.btnNavB,
        };
    },
	{
        changeBtnNavB: setBtnNavB,
    }
)(HomeUsers)
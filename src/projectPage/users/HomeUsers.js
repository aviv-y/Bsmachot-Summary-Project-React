import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import RequestResetPassword from "./ReqResetPassword";
import ResetPassword from "./ResetPassword";
import "./inputUsers.css";
import { setBtnNavB } from "../redux/actions/inputs.action";
import { connect } from "react-redux";

function HomeUsers(props) {
  useEffect(() => {
    props.changeBtnNavB(1);
  }, []);

  return (
    <>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route path="/Login" component={Login} />
              <Route path="/CommentMess" component={Login} />
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

export default connect(null, {
  changeBtnNavB: setBtnNavB,
})(HomeUsers);
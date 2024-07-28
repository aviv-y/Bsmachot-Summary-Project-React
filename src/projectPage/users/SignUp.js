import React, {useState, useEffect} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import FullDetailsInputs from "./FullDetailsInputs";
import RequestResetPassword from "./ReqResetPassword";
import CardProfile from "./img.js";



export default function SignUp(props){

  let statusUConnect = sessionStorage.getItem('status connect user');
  const [img, setImg] = useState();
  const propsImg = (i) => {
    setImg(i);
  }

    return (
      <>
        <CardProfile upImg={propsImg} />
        {!statusUConnect && (
          <>
            <h3>הרשמה</h3>
            <h6 className="text-center ">נעים להכיר:)</h6>
          </>
        )}
        {statusUConnect && <h3>עדכון פרטים</h3>}

        <FullDetailsInputs image={img} />
        {!statusUConnect && (
          <p className="forgot-password text-right">
            כבר נרשמת? <Link to="/Login">הכנס</Link>
          </p>
        )}
        {statusUConnect && (
          <p className="forgot-password text-left">
            <Link to="/ReqResetPass">לשינוי סיסמתך</Link>
          </p>
        )}
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/ReqResetPass" component={RequestResetPassword} />
          <Route exact path="/" component={Login} />
          <Route path="/CommentMess" component={Login} />
        </Switch>
      </>
    );
}


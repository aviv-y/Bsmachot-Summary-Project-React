import Home from './projectPage/Home/Home';
import HomeUsers from './projectPage/users/HomeUsers';
import { Navbar } from 'react-bootstrap';
import MenuBtn from "./projectPage/menuBtn/MenuBtn";
import { Switch, Route, Link } from "react-router-dom";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import "./projectPage/users/inputUsers.css";
import { connect } from 'react-redux';
import {
  setUserStatus,
  setUserType,
  setURL,
  setBtnNavB,
} from "./projectPage/redux/actions/inputs.action";
import ContactUs from './projectPage/Home/ContactUs/ContactUs';
import { useEffect, useState } from 'react';
import YouNeed from './projectPage/Home/YouNeed';
import { sendReminder } from './projectPage/server/event';
import BaseContract from './projectPage/Home/Contracts/BaseContract';
import MyMess from "./projectPage/Home/ContactUs/MyMess";
import ShowEvents from './projectPage/Home/MyEvent';
import SignClient from './projectPage/Home/Contracts/SignClient';
import GiveFeedback from "./projectPage/Home/GiveFeedback";
import WriteFeedback from './projectPage/Home/WriteFeedback';
import MyContracts from './projectPage/Home/MyContracts';
import About from './projectPage/Home/About';
import { useLocation } from 'react-router-dom';


function App(props) {
  const { userType, userStatus, btnNavB, changeURL, setBtnNavB } = props;
  const[ isHome, setIsHome]=useState(null)
const location = useLocation();
  useEffect(() => {
    console.log(window.location.href);
    const fullUrl = window.location.href;
    const url = new URL(fullUrl);
    const pathAndQuery = url.pathname + url.search;
    sessionStorage.setItem("url", pathAndQuery);
      if (location.pathname == "/" || location.pathname == "/Home") {
        setIsHome(1);
      } else {
        setIsHome(null);
      }
  }, []);

  const sMSttsUser = () => {
    if (userType) {
      console.log("no user type");
      props.changeUserType(0);
      sessionStorage.setItem("user type", 0);
    } else {
      console.log("yes user type");
      props.changeUserType(1);
      sessionStorage.setItem("user type", 1);
    }
  };

  const on = () => {
    console.log("hi");
    sendReminder();
  };

  sessionStorage.getItem("user")
    ? props.changeUserStts(1)
    : props.changeUserStts(0);
  return (
    <>
      {!userStatus && isHome && <About />}
      <Navbar dir="ltr" className="hmIcnMnu" fixed="top">
        {userStatus && <MenuBtn />}
        <div dir="rtl" className="container">
          <Link className="navbar-brand" to={"/Home"}>
            בשמחות
          </Link>
          {!userStatus && (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/Login"}>
                    היכנס
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={"/Sign-Up"}
                  >
                    הרשם
                  </Link>
                </li>

                {btnNavB && (
                  <li className="nav-item swchUserBtn">
                    <BootstrapSwitchButton
                      checked={false}
                      onlabel="עסקי"
                      offlabel="פרטי"
                      width="100"
                      size="sm"
                      onstyle="danger"
                      onChange={sMSttsUser}
                    />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </Navbar>
      <Switch>
        <Route path="/Login" component={HomeUsers} />
        <Route path="/Sign-Up" component={HomeUsers} />
        <Route exact path="/Details-User" component={HomeUsers} />
        <Route path="/ReqResetPass" component={HomeUsers} />
        <Route path="/ResetPass" component={HomeUsers} />
        <Route exact path="/Details-User" component={HomeUsers} />
        <Route exact path="/MessTo" component={ContactUs} />
        <Route path="/CommentMess" component={ContactUs} />
        <Route exact path="/MyMess" component={MyMess} />
        <Route exact path="/MyEvents" component={ShowEvents} />
        <Route exact path="/Contract" component={BaseContract} />
        <Route exact path="/SignClient" component={SignClient} />
        <Route exact path="/YouNeed" component={YouNeed} />
        <Route exact path="/feedback" component={WriteFeedback} />
        <Route exact path="/GiveFeedback" component={GiveFeedback} />
        <Route exact path="/MyContracts" component={MyContracts} />
        <Route exact path="" component={Home} />
      </Switch>
    </>
  );
}
export default connect(
  (state) => {
    return {
      btnNavB: state.btnNavB,
      userType: state.userType,
      userStatus: state.userStatus,
    };
  },
  {
    changeUserType: setUserType,
    changeUserStts: setUserStatus,
    changeBtnNavB: setBtnNavB,
    changeURL: setURL,
  }
)(App);
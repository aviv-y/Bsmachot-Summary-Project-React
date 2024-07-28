import Home from './projectPage/Home/Home';
import HomeUsers from './projectPage/users/HomeUsers';
import { Navbar } from 'react-bootstrap';
import MenuBtn from "./projectPage/menuBtn/MenuBtn";
import { Switch, Route, Link } from "react-router-dom";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import "./projectPage/users/inputUsers.css";
import { connect } from 'react-redux';
import { setUserStatus, setUserType, setURL } from './projectPage/redux/actions/inputs.action';
import ContactUs from './projectPage/Home/ContactUs/ContactUs';
import { useEffect } from 'react';
import YouNeed from './projectPage/Home/YouNeed';
import { sendReminder } from './projectPage/server/event';
import BaseContract from './projectPage/Home/Contracts/BaseContract';
import MyMess from "./projectPage/Home/ContactUs/MyMess";
import ShowEvents from './projectPage/Home/MyEvent';
import getImages from './projectPage/uploadImg/getImages';
import SignClient from './projectPage/Home/Contracts/SignClient';
import GiveFeedback from "./projectPage/Home/GiveFeedback";
import WriteFeedback from './projectPage/Home/WriteFeedback';
import MyContracts from './projectPage/Home/MyContracts';
import { useHistory } from "react-router-dom";


function App(props) {
  
  const { userType, userStatus, btnNavB, changeURL } = props;
const history = useHistory();

// useEffect(() => {
//   const previousUrl = sessionStorage.getItem("previousUrl");
//   if (previousUrl) {
//     sessionStorage.removeItem("previousUrl");
//     history.push(previousUrl);
//   }
// }, [history]);

  useEffect(() => {
    console.log(window.location.href);
    // if (window.location.href.length > 26) {
    //   changeURL(window.location.href);
    // sessionStorage.setItem("url", window.location.href);
    // Get the full URL
    const fullUrl = window.location.href;

    // Create a URL object
    const url = new URL(fullUrl);

    // Get the pathname and search parts
    const pathAndQuery = url.pathname + url.search;
sessionStorage.setItem("url",pathAndQuery)
    // console.log(pathAndQuery);

    // }
  }, [])

  
  const sMSttsUser = () => {
    if (userType) {
      console.log("no user type");
      props.changeUserType(0);
      sessionStorage.setItem('user type', 0);
    }
    else {
      console.log("yes user type");
      props.changeUserType(1);
      sessionStorage.setItem("user type", 1);
    }    
  }

  const on = () => {
    console.log("hi");
    sendReminder();
  }


  sessionStorage.getItem("user") ? props.changeUserStts(1) : props.changeUserStts(0);
  return (
    <>
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
                  <Link className="nav-link" to={"/Sign-Up"}>
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
    changeURL: setURL
  }
)(App)
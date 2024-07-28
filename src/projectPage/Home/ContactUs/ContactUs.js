import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contactUs.css";
import Form from "react-bootstrap/Form";
import { BiSend } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiSubdirectoryLeft } from "react-icons/bi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { sendMess, showMess } from "../../server/event";
import HistoryMess from "./HistoryMess";
import { connect } from "react-redux";
import Login from "../../users/Login";
import { useHistory } from "react-router-dom";
import { BsFileEarmarkMedical } from "react-icons/bs";
import { showPUser } from "../../server/connectPU";
import { setUserData } from "../../redux/actions/inputs.action";
import { showBUser } from "../../server/connectBU";

function ContactUs(props) {
  const history = useHistory();
  const [hiMess, setHiMess] = useState([]);
  const [newMessD, setNewMessD] = useState();
  const [initialText, setInitialText] = useState();
  const [wantContract, setWantContract] = useState(
    new URLSearchParams(window.location.search).get("contract") ? 1 : 0
  );
  const [istoken, setIstoken] = useState(0);
  useEffect(() => {
    console.log(wantContract);
  }, []);
  let id;
  useEffect(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let tokenToUse = istoken;

    if (window.location.href.includes("MyMess")) {

      tokenToUse = props.propMess.token;
    } else {
      tokenToUse = urlSearchParams.get("token") || istoken;
    }

    const isContract = urlSearchParams.get("contract");

    if (isContract) {
      setWantContract(1);
    } else {
      setWantContract(0);
    }

    if (!tokenToUse && !window.location.href.includes("MyMess")) {
      const time = new Date().getTime();
      const last3PU = sessionStorage.getItem("user").slice(-3);
      const last3BU = sessionStorage.getItem("user selected")?.slice(-3) || 999;
      sessionStorage.setItem("token", time + last3PU + last3BU);
      setInitialText(
        `שלום שמי ${sessionStorage.getItem(
          "user name"
        )}:), יש לי ${sessionStorage.getItem(
          "typeEvent"
        )} ב${sessionStorage.getItem(
          "dateEvent"
        )} בשעות ה${sessionStorage.getItem(
          "timeEvent"
        )}.  ואני מחפש שירותי ${sessionStorage.getItem(
          "prof selected"
        )} באזור ${sessionStorage.getItem(
          "areaSelected"
        )}. אשמח מאוד לשמוע על שירותך, ולקבל הצעת מחיר.`
      );
      
    } else {
      sessionStorage.setItem("token", tokenToUse);

      await showMess(tokenToUse).then((res) => {
        setHiMess(res.data.details);
        id = {
          pUser: res.data.pUser,
          bUser: res.data.bUser,
        };

        setUserData({
          token: sessionStorage.getItem("token"),
          pUser: res.data.pUser,
          bUser: res.data.bUser,
          pUserName: res.data.pUserName,
          bUserName: res.data.bUserName,
          prof: res.data.prof,
          event: sessionStorage.getItem("idEvent"),
        });

        let txt;
        if (wantContract) txt = "אני רוצה לחתום חוזה!";
        else txt = txtMessRef.current.value;

        if (window.location.href.includes("MyMess")) {
          setNewMessD({
            token: props.propMess.token,
            pUser: props.propMess.pUser,
            bUser: props.propMess.bUser,
            pUserName: props.propMess.pUserName,
            bUserName: props.propMess.bUserName,
            prof: props.propMess.prof,
            event: sessionStorage.getItem("idEvent"),
            details: [
              {
                date: new Date().getTime(),
                text: txt,
                userType: sessionStorage.getItem("user type"),
              },
            ],
          })
        } else {
          setNewMessD({
            token: sessionStorage.getItem("token"),
            pUser: res.data.pUser,
            bUser: res.data.bUser,
            pUserName: res.data.pUserName,
            bUserName: res.data.bUserName,
            prof: res.data.prof,
            event: sessionStorage.getItem("idEvent"),
            details: [
              {
                date: new Date().getTime(),
                text: txt,
                userType: sessionStorage.getItem("user type"),
              },
            ],
          });
        }
      });

      if (wantContract) {
        sendMessBtn();
      }
    }
  }, [istoken, props.propMess?.token]);


  const { bUSelect } = props;
  const [isLogin, setIsLogin] = useState(0);
  useEffect(() => {
    if (sessionStorage.getItem("user")) setIsLogin(1);
  }, []);

  const txtMessRef = useRef("");
  const sendMessBtn = async () => {
  try {
    let messDetails;

    // Create messDetails based on istoken and window location
    if (istoken === 0 && !window.location.href.includes("MyMess")) {
      messDetails = {
        token: sessionStorage.getItem("token"),
        pUser: sessionStorage.getItem("user"),
        bUser: sessionStorage.getItem("user selected"),
        pUserName: sessionStorage.getItem("user name"),
        bUserName: bUSelect.name,
        prof: sessionStorage.getItem("prof selected"),
        event: sessionStorage.getItem("idEvent"),
        details: [
          {
            data: new Date().getTime(),
            text: txtMessRef.current.value,
            userType: sessionStorage.getItem("user type"),
          },
        ],
      };
    } else {
      messDetails = { ...newMessD };
    }

    // If not wantContract, update text and create details if needed
    if (!wantContract) {
      messDetails.details = messDetails.details || [
        { text: "", userType: sessionStorage.getItem("user type") ? 1 : 0 },
      ];
      messDetails.details[0].text = txtMessRef.current.value;
      txtMessRef.current.value = "";
    }
    else {
      messDetails.details = messDetails.details
      messDetails.details[0].text="אני אשמח לחתום איתך חוזה"
    }
    // Update hiMess state
    const updatedMess = [...hiMess, messDetails.details[0]];
    setHiMess(updatedMess);

    // Send message
    await sendMess(messDetails).then(r=>console.log(r));

    // If user type is not set, redirect to "/YouNeed"
    if (!sessionStorage.getItem("user type")) {
      history.push("/Home");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

  const deleteMess = () => {
    txtMessRef.current.value = "";
  };

  const returnMess = () => {
    txtMessRef.current.value = initialText;
  };

  
  const createContract = async () => {
    console.log();
    await showPUser({'id': props.userData.idClient}).then(res => {
      setUserData({
        ...props.userData, pUMail: res.data.userMail})
    })
    await showBUser({ '_id': sessionStorage.getItem("user") }).then((res) => {
      setUserData({
        ...props.userData,
        bUMail: res.data.userMail,
      });
    });
    console.log(props.userData);
    return history.push("/Contract");
  };

  return (
    <>
      {!isLogin && (
        <div className="outer">
          <div className="inner">
            <Login />
          </div>
        </div>
      )}
      {isLogin && (
        <div className="outer">
          <div className="inner">
            {wantContract && <h1>בקשתך לסגירת חוזה נשלחה לבעל העסק!</h1>}
            {!wantContract && (
              <>
                <HistoryMess mess={hiMess} />
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      ref={txtMessRef}
                      as="textarea"
                      rows={5}
                      className="messBox"
                      placeholder="כתוב כאן את תגובתך....."
                    >
                      {initialText}
                    </Form.Control>
                  </Form.Group>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">טקסט מקור</Tooltip>}
                  >
                    <span>
                      <BiSubdirectoryLeft
                        id="origin"
                        className="icons sendIcn"
                        onClick={returnMess}
                      />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">מחק</Tooltip>}
                  >
                    <span>
                      <BiTrash className="icons" onClick={deleteMess} />
                    </span>
                  </OverlayTrigger>
                  {sessionStorage.getItem("user type") == 1 && (
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">חתימת חוזה</Tooltip>
                      }
                    >
                      <span>
                        <BsFileEarmarkMedical
                          className="icons"
                          onClick={createContract}
                        />
                      </span>
                    </OverlayTrigger>
                  )}

                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">שלח</Tooltip>}
                  >
                    <span>
                      <BiSend className="icons sendIcn" onClick={sendMessBtn} />
                    </span>
                  </OverlayTrigger>
                </Form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default connect((state) => {
  return {
    bUSelect: state.bUSelect,
    userData: state.userData
  };
}, {
  setUserData: setUserData
}


)(ContactUs);

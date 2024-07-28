/**כאן שליפה של כל חדרי ההודעות */
import React, { useEffect, useState, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import {Container, Col, Row} from 'react-bootstrap';
import { showChatR } from "../../server/event";
import "../categoryCard.css";
import HistoryMess from "./HistoryMess";
import "./contactUs.css";
import ContactUs from "./ContactUs";
// import Form from "react-bootstrap/Form";
// import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { sendMess, showMess } from "../../server/event";
import { connect } from "react-redux";
// import { BiSend } from "react-icons/bi";
// import { isDate } from "moment";
import { setUserData } from "../../redux/actions/inputs.action";


function ShowChatRooms(props) {

  const [data, setData] = useState([]);
    const txtMessRef = useRef("");
  const [newMess, setNewMess] = useState([])
  const [propMess, setPropMess] = useState(0);
  useEffect(async ()=> {
    await showChatR({
      userId: sessionStorage.getItem("user"),
      userType: sessionStorage.getItem("user type"),
    })
      .then((res) => {
        setData(Array.from(res.data));
        console.log(data);
      })
      .catch((err) => console.log(err));

  }, [])
     

  function showHMess(i){
    console.log(i)
    sessionStorage.setItem('idEvent', i.event)
    props.changeUserData({ nameBU: i.bUserName, nameClient: i.pUserName, idClient: i.pUser, prof: i.prof });
    setPropMess(i)
  }

  //   const sendMessBtn = () => {
  //     console.log("new mess!!!!!!!");
  //     let messDetails = {
  //       token: propMess.token,
  //       pUser: propMess.pUser,
  //       bUser: propMess.bUser,
      
  //         pUserName: propMess.pUserName,
  //         bUserName: propMess.bUserName,
  //         prof: propMess.prof,
  //         details: [{
  //           text: txtMessRef.current.value,
  //           userType: sessionStorage.getItem("user type"),
  //         }],
  //     };
  //     console.log(messDetails)
  //     setNewMess(messDetails.details[0]);
  //     sendMess(messDetails).catch((err) => console.log("oppppsssss  ", err));
  //     txtMessRef.current.value = "";
  // };

    return (
      <>
        
          <div className="outer cards">
            <br />
            <br />
          <br />
          {data.length == 0 && (sessionStorage.getItem('user type')===0||!sessionStorage.getItem('user type')) &&<div className="innerCard rowMess">
            <h3>
            עדיין לא יצרתם קשר עם אחד המקצוענים שלנו :)
            </h3>
          </div>}
          {data.length == 0 && sessionStorage.getItem('user type') &&<div className="innerCard rowMess">
            <h3>
            עדיין לא יצרו אתך קשר :)
            </h3>
          </div>}
          {data.length > 0 &&
            <Container>
              <Row className="rowMess">
                <Col className="innerCard">
                  {data.map((item) => {
                    console.log(item.bUserName);
                    return (
                      <>
                        <button
                          onClick={() => {
                            showHMess(item);
                          }}
                        >
                          <Card
                            id="cardChatR"
                            className="cardCategory linkCard"
                            style={{ width: "18rem" }}
                          >
                            <Card.Body>
                              <Card.Title>
                                {sessionStorage.getItem("user type") == 1 && (
                                  <Row className="rowCName">
                                    {item.pUserName}
                                  </Row>
                                )}
                                {sessionStorage.getItem("user type") != 1 && (
                                  <Row className="rowCName">
                                    {item.bUserName}
                                  </Row>
                                )}
                              </Card.Title>
                              {sessionStorage.getItem("user type") != 1 && (
                                <Card.Text>{item.prof}</Card.Text>
                              )}
                              <Card.Text>
                                {item.details[item.details.length - 1]?.date}
                              </Card.Text>
                              <Card.ImgOverlay src="" />
                            </Card.Body>
                          </Card>
                        </button>
                      </>
                    );
                  })}
                
                </Col>

                <Col className="inner innerMess">
                  {/* {propMess && (
                    <HistoryMess mess={propMess.details.concat(newMess)} />
                  )}
      */}
                  <div className="writeMess">
                    <ContactUs propMess={propMess} />
                  </div>
                </Col>
              </Row>
            </Container>}
          </div>
        
      </>
    );
}
export default connect(
  (state) => {
    return {
      userData: state.userData,
    };
  },
  {
    changeUserData: setUserData,
  }
)(ShowChatRooms);
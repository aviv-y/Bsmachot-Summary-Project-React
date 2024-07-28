import React, { useState } from "react";
import "./contactUs.css";
import { BiSubdirectoryLeft } from "react-icons/bi";
import { Container, Col, Row } from "react-bootstrap";
import Moment from "react-moment";

export default function HistoryMess(props) {
  const { mess } = props;
  console.log(mess)
    let stlMess = (i) => {
       return i.userType=='1' ? "bu" : "pu";
    }
  const dateObj = new Date();
  const day = dateObj.toLocaleDateString();
  const hour = dateObj.getHours();
  const minut = dateObj.getMinutes();
  const date = day + "\n" + ", " + hour + ":" + minut;
  return (
    <>
      <br />
      <Container className="containR">
        {mess?mess.map((i) => {
          return (
            <>
              <Moment className="timeLbl" format="DD/MM/YY HH:mm">
                {i.date}
              </Moment>
              <Row className={stlMess(i)}>
                {/* <label className="messLbl"></label> */}

                <label>{i.text}</label>
              </Row>
            </>
          );
        }):null}
        <Row>
          <Col>
            {/* <label className="messLbl"></label> */}
            <br />
            <label className="timeLbl">{date}</label>
            
          </Col>
        </Row>
      </Container>
    </>
  );
}

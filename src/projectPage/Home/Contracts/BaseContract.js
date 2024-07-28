

import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import SignaPad from "./SignatureCanvas";
import "./contract.css";
import { createPDF } from "../../PDFs/GeneratePDF";
import { connect } from "react-redux";
import { showEventById, showContractByIdEvent, SendForClientsSignature, showContract } from "../../server/event";
import { useHistory } from "react-router-dom";


function BaseContract(props) {

  // console.log(props.userData);
  const dateObj = new Date();
  const day = dateObj.toLocaleDateString();
  const date = day + "\n" + ",";

  const history = useHistory();
  const refService = useRef('');
  const refCoust = useRef('');
  const refTime = useRef("");
  const refpaymentUntill = useRef('');
  const refAdvancePayment = useRef('');
  const refDayCancel = useRef('');
  const refCancelPayment = useRef('');
  const refRemark = useRef("");
  
  const [signature, setSignature] = useState();
  const [eventD, setEventD] = useState({});
  const [sended, setSended] = useState(0);
  const [contractID, setContractID] = useState("")
  const[btnSave, setBtnSave]=useState("שמור ושלח ללקוח")
  useEffect(() => {
    showContractByIdEvent({ idEvent: sessionStorage.getItem("idEvent") })
      .then((res => {
        console.log(res)
        
        if (res.data != "") {
          alert("במערכת כבר קיים בינכם חוזה, ניתן לעדכן אותו בכל עת");
          setContractID(res.data._id);
          setBtnSave("עדכן ושלח ללקוח")
        }
        
      }));
  showEventById({ "idEvent": sessionStorage.getItem("idEvent") })
    .then(res => {
      console.log(res);
      setEventD({
        city: res.data.city,
        category: res.data.category,
        time: res.data.time,
        date: res.data.date,
        pUser: res.data.pUser
      });
      console.log(eventD);
        })
      },[])
      
  const sendConstract = () => {

    

    console.log(signature);
    const saveData = {
      title: "חוזה ופירוט הסכמים",
      subTitle: `בין ${props.userData.nameBU} לבין ${props.userData.nameClient}\n
                בתאריך ${date} הוסכם בין הצדדים למתן שירותי ${props.userData.prof}\n לאירוע ${eventD.category}
                שיתקיים בע"ה בתאריך: ${eventD.date} ב${eventD.city}.
                `,
      text: `במסגרת השירות יכלל ${refService.current.value}\nהשירות יחל להנתן בשעה ${refTime.current.value}\n\nעלות השירות כולל הכל הינו: ${refCoust.current.value} ₪\nדמי המקדמה ישולמו עד לתאריך ${refpaymentUntill.current.value}ע"ס ${refAdvancePayment.current.value}₪\nבמקרה של ביטול ${refDayCancel.current.value} ימים לפני האירוע\nיחוייב הלקוח בתשלום ע"ס ${refCancelPayment.current.value}₪
      `,
      remark: refRemark.current.value,
      signaTtl: `על החתום: ${props.userData.nameBU} `,
      signature: signature,
    };
    createPDF(saveData, props.userData.nameBU, props.userData.nameClient, eventD.pUser, contractID);
    setSended(1);
    setTimeout(() => {
      history.push('/Home');
    }, 7000);
  }
  const formRef = useRef("");


    return (
      <>
        <div className="outer">
          <div id="bodyCntrct" className="inner">
            {sended && <h3>החוזה נשלח לחתימה ללקוח:)</h3>}
            {!sended && (
              <>
                <div>
                  <div className="titleCntrct">
                    <h3>חוזה ופירוט הסכמים</h3>
                    <h5 dir="rtl">
                      בין {sessionStorage.getItem("user name")} לבין{" "}
                      {props.userData.nameClient}
                    </h5>
                    <p>
                      בתאריך {date} הוסכם בין הצדדים למתן שירותי{" "}
                      {props.userData.prof} לאירוע {eventD.category} שיתקיים
                      בע"ה בתאריך: {eventD.date} ב{eventD.city}.
                    </p>
                  </div>
                  <br />

                  <div className="bodyTxtCntrct">
                    <p>במסגרת השירות יכלל:</p>
                    <Form ref={formRef}>
                      <Form.Group className="sm-3" controlId="formBasicEmail">
                        <Form.Control
                          as="textarea"
                          ref={refService}
                          className="inpt"
                          defaultValue={""}
                        />
                      </Form.Group>
                      <br />
                      <div className="oneLine">
                        <p className="txtCntrct"> השירות יחל להנתן בשעה:</p>
                        <Form.Control
                          className="littleInpt inpt"
                          type="time"
                          ref={refTime}
                        />
                      </div>
                      <br />
                      <div className="oneLine">
                        <p className="txtCntrct">עלות השירות כולל הכל הינו:</p>
                        <Form.Control
                          className="littleInpt NISInpt inpt"
                          type="number"
                          ref={refCoust}
                        />
                        <h5 className="txtCntrct"> &nbsp;&#8362;.&nbsp;</h5>
                      </div>
                      <br />
                      <div className="oneLine">
                        <p className="txtCntrct">
                          דמי המקדמה ישולמו עד לתאריך&nbsp;
                        </p>
                        <Form.Control
                          className="littleInpt inpt"
                          type="date"
                          ref={refpaymentUntill}
                        />
                        <p className="txtCntrct">&nbsp;ע"ס &nbsp;</p>
                        <Form.Control
                          className="littleInpt NISInpt inpt"
                          type="number"
                          ref={refAdvancePayment}
                        />
                        <h5 className="txtCntrct"> &nbsp;&#8362;.&nbsp;</h5>
                      </div>
                      <br />
                      <div className="oneLine">
                        <p className="txtCntrct">במקרה של ביטול&nbsp;</p>
                        <Form.Control
                          className="littleInpt NISInpt inpt"
                          type="number"
                          ref={refDayCancel}
                        />

                        <p className="txtCntrct">ימים לפני האירוע,&nbsp;</p>
                        <p> יחוייב הלקוח בתשלום דמי ביטול ע"ס</p>
                        <Form.Control
                          className="littleInpt NISInpt inpt"
                          type="number"
                          ref={refCancelPayment}
                        />
                        <h5 className="txtCntrct"> &nbsp;&#8362;.&nbsp;</h5>
                      </div>
                      <p> הערות נוספות ודגשים חשובים:</p>
                      <Form.Group className="sm-3" controlId="formBasicEmail">
                        <Form.Control
                          as="textarea"
                          ref={refRemark}
                          className="inpt"
                        />
                      </Form.Group>
                      <br />
                      <SignaPad setSign={setSignature} />

                      <Button
                        id="sendBtn"
                        variant="primary"
                        // onClick={sendConstract}
                        onClick={sendConstract}
                      >
            {btnSave}
                      </Button>
                    </Form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
}

export default connect(
  (state) => {
    return {
      userData: state.userData
    };
  },
  null
)(BaseContract);
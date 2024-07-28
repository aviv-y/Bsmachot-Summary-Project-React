
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { showBUser } from "../server/connectBU";
import { useHistory } from "react-router-dom";

export default function Models(props) {

  const history = useHistory();

  const eventD = props.eventD;
  sessionStorage.setItem("idEvent", eventD._id);
  const [isBUser, setIsBUser] = useState(
    Array.isArray(eventD.closeBUser) && eventD.closeBUser.length > 0
  );
  const [bUserName, setBUserName] = useState([]);

  useEffect(() => {
    const fetchBUsers = async () => {
      for (let i = 0; i < eventD.closeBUser.length; i++) {
        try {
          const res = await showBUser({ _id: eventD.closeBUser[i] });
          setBUserName((prevNames) => [...prevNames, res.data[0].name]);
          console.log(res);
        } catch (error) {
          console.error(`Error fetching user ${eventD.closeBUser[i]}:`, error);
        }
      }
    };
    fetchBUsers();
  }, []); // Run only once when the component mounts
  const toYouNeed = () => {
    console.log(eventD);
    sessionStorage.setItem("dateEvent", eventD.date)
    sessionStorage.setItem("timeEvent", eventD.time)
    sessionStorage.setItem("areaSelected", eventD.area)
    sessionStorage.setItem("typeEvent", eventD.category);
    sessionStorage.setItem(
      "profs",
      eventD.closeProfession.length ? eventD.closeProfession.join() : ""
    );
    history.push('/YouNeed')
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.eventD.category}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.eventD.date}</h4>
        <p>
          {props.eventD.category} באזור {props.eventD.area} בשעות ה
          {props.eventD.time}
          <br />
          <br />
          {isBUser && eventD.closeProfession && (
            <p>
              דרך אתר "בשמחות" סגרתם בראש שקט:{" "}
              {eventD.closeProfession.map((item) => {
                console.log(item);
                //  switch (item) {
                //    case "אולם":
                //      StrCloseCtgry = StrCloseCtgry.concat(0);
                //      break;
                //    case "צילום":
                //      StrCloseCtgry = StrCloseCtgry.concat(1);
                //      break;
                //    case "סירוק":
                //      StrCloseCtgry = StrCloseCtgry.concat(2);
                //      break;
                //    case "עיצוב אירועים":
                //      StrCloseCtgry = StrCloseCtgry.concat(3);
                //      break;
                //    case "תזמורת / D.J":
                //      StrCloseCtgry = StrCloseCtgry.concat(4);
                //      break;
                //    case "איפור":
                //      StrCloseCtgry = StrCloseCtgry.concat(5);
                //      break;
                //  }
                // console.log(StrCloseCtgry);
                
                return <p>{item}, </p>;
                
              })}
              {/* <br /> */}
              עם בעלי המקצוע הבאים:{" "}
              {bUserName.map((item) => {
                console.log(item);
                return <p>{item}, </p>;
              })}
            </p>
          )}
          <br />
        </p>
        <h5>בשמחות מאחלים לכם המון מזל טוב, ותמיד רק בשמחות!!</h5>
      </Modal.Body>
      <Modal.Footer>
        {props.youNeed && (
          <Button onClick={toYouNeed}>לאינדקס נותני שירות</Button>
        )}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
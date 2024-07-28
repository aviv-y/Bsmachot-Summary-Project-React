

// import React, { useEffect, useState } from "react";
// import { showEvents } from "../server/event";
// import "./event.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Col, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Models from "./Models";
// import { BiExpand } from "react-icons/bi";

// export default function ShowEvents() {
//   const [events, setEvents] = useState([]);
//   const [modalShow, setModalShow] = useState(false);
//   const [selectedEventIndex, setSelectedEventIndex] = useState(-1);

//   useEffect(() => {
//     showEvents(sessionStorage.getItem("user"))
//       .then((res) => {
//         const sortedEvents = [...res.data].sort((a, b) =>
//           sortByDate(a.date, b.date)
//         );
//         setEvents(sortedEvents);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const findTodayOrFutureIndex = (datesArray) => {
//     const today = new Date();
//     for (let i = 0; i < datesArray.length; i++) {
//       const dateParts = datesArray[i].date.split(".");
//       const dateObject = new Date(
//         `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
//       );
//       if (dateObject >= today) {
//         return i;
//       }
//     }
//     return -1;
//   };

//   const sortByDate = (a, b) => {
//     const datePartsA = a.split(".");
//     const datePartsB = b.split(".");
//     const dateA = new Date(
//       `${datePartsA[2]}-${datePartsA[1]}-${datePartsA[0]}`
//     );
//     const dateB = new Date(
//       `${datePartsB[2]}-${datePartsB[1]}-${datePartsB[0]}`
//     );
//     return dateA - dateB;
//   };

//   const handleModalShow = (index) => {
//     setSelectedEventIndex(index);
//     setModalShow(true);
//   };

//   const handleModalClose = () => {
//     setModalShow(false);
//   };

//   return (
//     <div className="outer">
//       {/* <h1>אירועים קרובים</h1> */}
//       <Row className="eventP" id="topRow">
//         {events.map((item, i) => {
//           if (i >= findTodayOrFutureIndex(events)) {
//             return (
//               <Col key={i} className="inner eventC">
//                 <Button
//                   className="btnNotCss"
//                   variant="primary"
//                   onClick={() => handleModalShow(i)}
//                 >
//                   <BiExpand />
//                 </Button>
//                 <Models
//                   show={modalShow && selectedEventIndex === i}
//                   onHide={handleModalClose}
//                   eventD={item}
//                   youNeed={1}
//                 />
//                 <h3>{item.category}</h3>
//                 <p>{item.date}</p>
//               </Col>
//             );
//           }
//           return null;
//         })}
//       </Row>
//       <h1 id="wasEvent">אירועים שהיו</h1>
//       <Row className="eventP">
//         {events.map((item, i) => {
//           if (i < findTodayOrFutureIndex(events)) {
//             return (
//               <Col key={i} className="inner eventC">
//                 <Button
//                   className="btnNotCss"
//                   variant="primary"
//                   onClick={() => handleModalShow(i)}
//                 >
//                   <BiExpand />
//                 </Button>
//                 <Models
//                   show={modalShow && selectedEventIndex === i}
//                   onHide={handleModalClose}
//                   eventD={item}
//                 />
//                 <h3>{item.category}</h3>
//                 <p>{item.date}</p>
//               </Col>
//             );
//           }
//           return null;
//         })}
//       </Row>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { showEvents } from "../server/event";
// import "./event.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Col, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Models from "./Models";
// import { BiExpand } from "react-icons/bi";

// export default function ShowEvents() {
//   const [events, setEvents] = useState([]);
//   const [modalShow, setModalShow] = useState(false);
//   const [selectedEventIndex, setSelectedEventIndex] = useState(-1);

//   useEffect(() => {
//     showEvents(sessionStorage.getItem("user"))
//       .then((res) => {
//         console.log(res.data);
//         const sortedEvents = [...res.data].sort((a, b) =>
//           sortByDate(a.date, b.date)
//         );
//         setEvents(sortedEvents);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const findTodayOrFutureIndex = (datesArray) => {
//     const today = new Date();
//     for (let i = 0; i < datesArray.length; i++) {
//       const dateParts = datesArray[i].date.split(".");
//       const eventDate = new Date(
//         parseInt(dateParts[2]),
//         parseInt(dateParts[1]) - 1,
//         parseInt(dateParts[0])
//       );
//       if (eventDate >= today) {
//         return i;
//       }
//     }
//     return -1;
//   };

//   const sortByDate = (a, b) => {
//     const datePartsA = a.split("/");
//     const datePartsB = b.split("/");
//     const dateA = new Date(
//       parseInt(datePartsA[2]),
//       parseInt(datePartsA[1]) - 1,
//       parseInt(datePartsA[0])
//     );
//     const dateB = new Date(
//       parseInt(datePartsB[2]),
//       parseInt(datePartsB[1]) - 1,
//       parseInt(datePartsB[0])
//     );
//     return dateA - dateB;
//   };

//   const handleModalShow = (index) => {
//     setSelectedEventIndex(index);
//     setModalShow(true);
//   };

//   const handleModalClose = () => {
//     setModalShow(false);
//   };

//   // Retrieve future events
//   const futureEventsIndex = findTodayOrFutureIndex(events);
//   const futureEvents =
//     futureEventsIndex !== -1 ? events.slice(futureEventsIndex) : [];

//   // Retrieve past events
//   const pastEvents =
//     futureEventsIndex !== -1 ? events.slice(0, futureEventsIndex) : events;
  
//   console.log(futureEvents);
//   console.log(pastEvents);
//   return (
//     <div className="outer">
//       <Row className="eventP" id="topRow">
//         {futureEvents.map((item, i) => (
//           <Col key={i} className="inner eventC">
//             <Button
//               className="btnNotCss"
//               variant="primary"
//               onClick={() => handleModalShow(i)}
//             >
//               <BiExpand />
//             </Button>
//             <Models
//               show={modalShow && selectedEventIndex === i}
//               onHide={handleModalClose}
//               eventD={item}
//               youNeed={1}
//             />
//             <h3>{item.category}</h3>
//             <p>{item.date}</p>
//           </Col>
//         ))}
//       </Row>
//       <h1 id="wasEvent">אירועים שהיו</h1>
//       <Row className="eventP">
//         {pastEvents.map((item, i) => (
//           <Col key={i} className="inner eventC">
//             <Button
//               className="btnNotCss"
//               variant="primary"
//               onClick={() => handleModalShow(i)}
//             >
//               <BiExpand />
//             </Button>
//             <Models
//               show={modalShow && selectedEventIndex === i}
//               onHide={handleModalClose}
//               eventD={item}
//             />
//             <h3>{item.category}</h3>
//             <p>{item.date}</p>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { showEvents } from "../server/event";
import "./event.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Models from "./Models";
import { BiExpand } from "react-icons/bi";

export default function ShowEvents() {
  const [events, setEvents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(-1);

  useEffect(() => {
    showEvents(sessionStorage.getItem("user"))
      .then((res) => {
        const sortedEvents = [...res.data].sort((a, b) =>
          sortByDate(a.date, b.date)
        );
        setEvents(sortedEvents);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortByDate = (a, b) => {
    const datePartsA = a.split(".");
    const datePartsB = b.split(".");
    const dateA = new Date(
      parseInt(datePartsA[2]),
      parseInt(datePartsA[1]) - 1,
      parseInt(datePartsA[0])
    );
    const dateB = new Date(
      parseInt(datePartsB[2]),
      parseInt(datePartsB[1]) - 1,
      parseInt(datePartsB[0])
    );
    return dateA - dateB;
  };

  const handleModalShow = (index) => {
    console.log(index);
    setSelectedEventIndex(index);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const today = new Date();
  const futureEvents = events.filter((event) => {
    const dateParts = event.date.split(".");
    const eventDate = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );
    return eventDate >= today;
  });

  const pastEvents = events.filter((event) => {
    const dateParts = event.date.split(".");
    const eventDate = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );
    return eventDate < today;
  });

  return (
    <div className="outer">
      <br />
      <br />
      <br />
      {events.length < 1 && sessionStorage.getItem("user type") == 1 && (
        <h3>טרם סגרו איתך אירוע דרך אתר בשמחות!</h3>
      )}
      {events.length < 1 && !sessionStorage.getItem("user type") && (
        <h3>עדיין לא סגרת אירוע דרך אתר בשמחות!</h3>
      )}
      {events.length > 0 && (
        <>
          <h1>אירועים עתידיים</h1>
          <Row className="eventP" id="topRow">
            {futureEvents.map((item, i) => (
              <Col key={i} className="inner eventC">
                <Button
                  className="btnNotCss"
                  variant="primary"
                  onClick={() => handleModalShow(i)}
                >
                  <BiExpand />
                </Button>
                <Models
                  show={modalShow && selectedEventIndex === i}
                  onHide={handleModalClose}
                  eventD={item}
                  youNeed={1}
                />
                <h3>{item.category}</h3>
                <p>{item.date}</p>
              </Col>
            ))}
          </Row>
          <h1 id="wasEvent">אירועים שהיו</h1>
          <Row className="eventP">
            {pastEvents.map((item, i) => (
              <Col key={i} className="inner eventC">
                <Button
                  className="btnNotCss"
                  variant="primary"
                  onClick={() => handleModalShow(i + futureEvents.length)}
                >
                  <BiExpand />
                </Button>
                <Models
                  show={
                    modalShow && selectedEventIndex === i + futureEvents.length
                  }
                  onHide={handleModalClose}
                  eventD={item}
                />
                <h3>{item.category}</h3>
                <p>{item.date}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

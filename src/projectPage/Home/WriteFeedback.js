import React, { useEffect, useState } from "react";
import { showEventById } from "../server/event";
import "./getFeedback.css";
import { showBUser } from "../server/connectBU";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { showPUser } from "../server/connectPU";
import GiveFeedback from "./GiveFeedback";


export default function WriteFeedback() {
  const [bUserClosed, setBUserClosed] = useState([]);
  // const [bUserDtls, setBUserDtls] = useState();
   useEffect(() => {
     const fetchData = async () => {
       const urlSearchParams = new URLSearchParams(window.location.search);
       const idEvent = urlSearchParams.get("event");
      //  console.log(idEvent);

       try {
         const res = await showEventById({ idEvent: idEvent });
         console.log(res);

         const bUserDetailsArray = [];

         for (let index = 0; index < res.data.closeBUser.length; index++) {
           const response = await showBUser({
             _id: res.data.closeBUser[index],
           });
           console.log(response);
             const bUserDtls = {
               idUser: response.data[0]._id,
               company: response.data[0].company,
               name: response.data[0].name,
               userMail: response.data[0].userMail,
               profession: response.data[0].profession,
             };
           bUserDetailsArray.push(bUserDtls);
         }

         setBUserClosed((prevState) => [...prevState, ...bUserDetailsArray]);
         const pUser = await showPUser({ id: res.data.pUser })
         sessionStorage.setItem("user", pUser.data[0]._id);
         sessionStorage.setItem("status connect user", 1);
         sessionStorage.setItem("user name", pUser.data[0].name);
        //  console.log(pUser);
       } catch (err) {
         console.log(err);
       }
     };

     fetchData();
   }, []);
    
    useEffect(() => {
      console.log("Updated state:", bUserClosed);
    }, [bUserClosed]);
  const [writeRmrk, setWriteRmrk] = useState(null);
  const history = useHistory();
  const writeRemarkBtn = (pUser) => {
    console.log(pUser);
    setWriteRmrk(pUser);
  };
  return (
    <>
      <div className="outer">
        <>
          {!writeRmrk && (
            <>
              {bUserClosed.length == 0 && (
                <div className="inner">
                  <h2>הפעם לא סגרת דרכנו חוזה עם אחד המומחים שלנו</h2>
                  <h4>מחכים לכם באירועים הבאים!</h4>
                  <h5>ושתמיד יהיה רק בשמחות!</h5>
                </div>
              )}
              {bUserClosed.length > 0 && (
                <>
                  {bUserClosed.map((item) => {
                    return (
                      <div className="inner cardBU">
                        <h5>{item.company}</h5>
                        <p>{item.name}</p>
                        <p>{item.profession}</p>
                        <Button onClick={() => writeRemarkBtn(item)}>
                          כתוב תגובה
                        </Button>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
          {writeRmrk && (
            <GiveFeedback bUserDtls={writeRmrk} setEnd={setWriteRmrk} />
          )}
        </>
      </div>
    </>
  );
}

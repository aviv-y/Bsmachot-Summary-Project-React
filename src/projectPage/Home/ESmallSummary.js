import React, {useEffect} from "react"
import 'react-calendar/dist/Calendar.css';
import './selectDate.css';
import { Row, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './selectDate.css';
import { newEvent } from "../server/event";



export default function ESmallSummary() {

    const [day, setDay] = useState('');
    const history = useHistory();
    useEffect(() => {
        switch (sessionStorage.getItem('dayEvent')) {
            case '1':
                setDay("ראשון");
                break;
            case '2':
                setDay("שני");
                break;
            case '3':
                setDay("שלישי");
                break;
            case '4':
                setDay("רביעי");
                break;
            case '5':
                setDay("חמישי");
                break;
            case '6':
                setDay("שישי");
                break;
            case '7':
                setDay("שבת");
                break;
        }
    },[])
  
    const hendlSM = async() => {
        let event = {
            category: sessionStorage.getItem('typeEvent'),
            pUser: sessionStorage.getItem('user'),
            date: sessionStorage.getItem('dateEvent'),
            time: sessionStorage.getItem('timeEvent'),
            city: sessionStorage.getItem('citySelected'),
            area: sessionStorage.getItem('areaSelected'),
        }
        await newEvent(event).then(res => {
            sessionStorage.setItem("idEvent", res.data._id)
            console.log(res.data)
        })
            .catch(err => console.log("err in create event ", err));
        history.push("/YouNeed");
    }

  return (
    <div className="outer">
      <div className="inner">
              <h3>סיכום קטן-</h3>
              <p id="eventSmry">יש לכם {sessionStorage.getItem('typeEvent')}, 
                  ביום {day} ב{sessionStorage.getItem('timeEvent')}, <br/>
                  בתאריך {sessionStorage.getItem('dateEvent')} <br/>
                  בישוב {sessionStorage.getItem('citySelected')} שבאזור {sessionStorage.getItem('areaSelected')}
              </p>
        < Button
                id="signBtn"
                className="d-grid gap-2" 
                as={Row}
                onClick={hendlSM}>
                בדיוק!
        </Button>

      </div>
    </div>
  );

}
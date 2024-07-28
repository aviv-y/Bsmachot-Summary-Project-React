import React, {useEffect, useState} from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './selectDate.css';
import { Row, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Select from 'react-select'



export default function SelectDate() {

  const history = useHistory();
  useEffect(() => {
    if (sessionStorage.getItem("user") === null)
      history.push('/Login');
  }, [])
  
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const time=[{value: "בוקר", label: "בוקר"},{value: "צהריים", label: "צהריים"},{value: "ערב", label: "ערב"},]
  console.log(value);
  
  const hendlSM = () => {
    sessionStorage.setItem('dateEvent', value.toLocaleDateString());
    sessionStorage.setItem('dayEvent', value.getDay()+1);
    history.push("/SelectLocation");
  }

  const oCTime = (e) => {
    sessionStorage.setItem('timeEvent', e.value);
  }

  return (
    <div className="outer">
      <div className="inner">
        <h3>תאריך האירוע</h3>
        <Calendar
          className="calender"
          onChange={onChange}
          value={value}
          CalendarType="Hebrew"
          locale="he"
          start={1}
          dir="rtl"
          minDate={today}
        />
        <Select  //רשימה נפתחת של אזורים
                    name="time"
                    type="text"
                    onChange={ e => oCTime(e)} 
                    placeholder="האירוע יתקיים בשעות...."
                    clearable={true}
                    options={time} />
        < Button
                id="signBtn"
                className="d-grid gap-2" 
                as={Row}
                onClick={hendlSM}>
                הבא
        </Button>

      </div>
    </div>
  );

}
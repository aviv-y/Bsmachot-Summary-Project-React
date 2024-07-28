import React, {useEffect, useState} from "react"
import 'react-calendar/dist/Calendar.css';
import './selectDate.css';
import { showCity } from "../server/event";
import { Row, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import SelectAreaCity from "./SelectAreaCity";




export default function SelectLocation() {

    const history = useHistory();

    const hendlSM = () => {
        history.push("/ESmallSummary");
    }

  return (
    <div className="outer">
      <div className="inner">
        <h3>מקום האירוע</h3>
        <SelectAreaCity/>
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
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ESmallSummary from './ESmallSummary';
import Home from './Home';
import SelectDate from './SelectDate';
import SelectLocation from './SelectLocation';
import YouNeed from './YouNeed';
import './homeStyle.css'
import HomeUsers from '../users/HomeUsers';
import IndexProffesions from "./IndexProfesions";
import MyMess from './ContactUs/MyMess';
import ShowEvents from './MyEvent';



export default function ApiHome() {
    return (
      <>
        <Switch>
          <Route path="/SelectLocation" component={SelectLocation} />
          <Route path="/SelectDate" component={SelectDate} />
          <Route path="/YouNeed" component={YouNeed} />
          <Route path="/ESmallSummary" component={ESmallSummary} />
          <Route path="/IndexProfessions" component={IndexProffesions} />
          <Route exact path="/Details-User" component={HomeUsers} />
          <Route exact path="/MessTo" component={ContactUs} />
          <Route exact path="/MyMess" component={MyMess} />
          <Route exact path="/MyEvent" component={ShowEvents} />
          {/* <Route exact path="" component={Home} /> */}
          <Route path="/Home" component={Home} />
        </Switch>
      </>
    );
}
import React,{useEffect} from 'react';
import { Carousel, Navbar, Container, Col, Row } from 'react-bootstrap';
import './homeStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useHistory } from "react-router-dom";
import SelectDate from './SelectDate';
import SelectLocation from './SelectLocation';
import ESmallSummary from './ESmallSummary';
import YouNeed from './YouNeed';
import IndexProfessions from "./IndexProfessions";
import { connect } from "react-redux";
import { setBtnNavB } from "../redux/actions/inputs.action";
import HomeBUser from './HomeBUser';
import ContactUs from './ContactUs/ContactUs';
import MyMess from "./ContactUs/MyMess";
import WriteFeedback from './WriteFeedback';
import { useLocation } from "react-router-dom";

function Home(props) {
  const location = useLocation();
  useEffect(() => {
    props.changeBtnNavB(null);
  }, []);

  let isHome;
  if (location.pathname == "/" || location.pathname == "/Home") {
    console.log("אין ניתוב פנימי");
    isHome = 1;
  } else {
    console.log("יש ניתוב פנימי:", location.pathname);
    isHome = null;
  }

  const history = useHistory();
  let existsUser = 1;
  if (sessionStorage.getItem("user") === null) existsUser = 0;

  const oCTypEvent = (e) => {
    sessionStorage.setItem("typeEvent", e);
    history.push("/SelectDate");
  };
  return (
    <div id="all">
      <div className="hmImgCrsl">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.besame.co.il/wp-content/uploads/jeremy-wong-304240-1024x684.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>גם כששוברים כוס</h3>
              <p>
                בשיא ההתרגשות של בית חדש, תנו למקצוענים להנציח ולהשלים רגעים
                מרגשים
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.saramoyal.co.il/wp-content/uploads/2021/07/95667093_4385969014762285_99550100606418944_n.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>חיים חדשים פועמים</h3>
              <p>אלו רגעים של אושר לא מהעולם, חייבים כאן את השיאנים!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://image.jimcdn.com/app/cms/image/transf/dimension=4000x3000:format=jpg/path/sa4feb62c23158fd3/image/ic9f530e259bdfb13/version/1617818180/%D7%94%D7%A0%D7%97%D7%AA-%D7%AA%D7%A4%D7%99%D7%9C%D7%99%D7%9F-%D7%9E%D7%A0%D7%99%D7%97%D7%99%D7%9D-%D7%A0%D7%9B%D7%95%D7%9F.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>כניסה לנועם עול מצוות</h3>
              <p>בואו נצלול לארגון ארוע של פעם בחיים</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images8.design-editor.com/93/9336028/3958/83A53711-3208-E012-537A-07D19DC1E92E.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>בת מצווה</h3>
              <p>רגעי בגרות כאלה חייבים את הטופ!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {isHome && (
        <Navbar className="hmIcnMnu" fixed="bottom">
          <Container>
            <Row id="rowMnu">
              <Col xs={12} md={3} className="lnkHmMnu">
                <button
                  className="btnHmMnu"
                  onClick={() => oCTypEvent("חתונה")}
                >
                  <h5 className="lblHmMnu">חתונה</h5>
                </button>
              </Col>
              <Col xs={12} md={2} className="lnkHmMnu">
                <button
                  className="btnHmMnu"
                  onClick={() => oCTypEvent("בר מצווה")}
                >
                  <h5 className="lblHmMnu">בר מצווה</h5>
                </button>
              </Col>
              <Col xs={12} md={2} className="lnkHmMnu">
                <button
                  className="btnHmMnu"
                  onClick={() => oCTypEvent("בת מצווה")}
                >
                  <h5 className="lblHmMnu">בת מצווה</h5>
                </button>
              </Col>
              <Col xs={12} md={2} className="lnkHmMnu">
                <button
                  className="btnHmMnu"
                  onClick={() => oCTypEvent("אירוסין")}
                >
                  <h5 className="lblHmMnu">אירוסין</h5>
                </button>
              </Col>
              <Col xs={12} md={3} className="lnkHmMnu">
                <button className="btnHmMnu" onClick={() => oCTypEvent("ברית")}>
                  <h5 className="lblHmMnu">ברית</h5>
                </button>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
      <Switch>
        <Route path="/SelectDate" component={SelectDate} />
        <Route path="/SelectLocation" component={SelectLocation} />
        <Route path="/ESmallSummary" component={ESmallSummary} />
        <Route path="/YouNeed" component={YouNeed} />
        <Route path="/IndexProfessions" component={IndexProfessions} />
        <Route path="/HomeBUser" component={HomeBUser} />
        <Route path="/CommentMess" component={ContactUs} />
        <Route exact path="/MessTo" component={ContactUs} />
        <Route exact path="/MyMess" component={MyMess} />
        <Route exact path="/feedback" component={WriteFeedback} />
      </Switch>
    </div>
  );
}
export default connect(
       (state) => {
        return{
            profSelect: state.profSelect
        };
    },
	{
        changeBtnNavB: setBtnNavB,
    }
)(Home)
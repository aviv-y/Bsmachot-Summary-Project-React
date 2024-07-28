import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import "./categoryCard.css";
// import MenuBtn from "../menuBtn/MenuBtn";


export default function CategoryCard(props) {
    let { category, img } = props;
    return (
      <Card className="cardCategory" style={{ width: "18rem" }}>
        <div className="rowImg">
          <Card.Img className="imgCrd" variant="top" src={img} />
        </div>
        <Card.Body>
          <Card.Title>
            <Row className="rowCName">
              {category}
              <Col>
              {props.isClose&&
                <img id="imgV"
                  src="https://as1.ftcdn.net/v2/jpg/05/57/72/02/1000_F_557720237_tKXQE4MGcQdFDMcsP3nTyYQ3Ia0T1qE9.jpg"
                                width={"10% !important"}               
                />}
              </Col>
            </Row>
          </Card.Title>
        </Card.Body>
      </Card>
    );
}
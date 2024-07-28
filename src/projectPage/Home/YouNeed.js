import React, {useState, useEffect} from "react"
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import "./categoryCard.css";
import { Row, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CategoryCard from './CategoryCard';
import { showAllProfession } from "../server/professions";
import { setProfSelect } from "../redux/actions/inputs.action";
import { connect } from "react-redux";





function YouNeed(props) {
  let allProf = [];
    const [prof, setProf] = useState([]);

  useEffect(async() => {
    await showAllProfession()
        .then(async (res) => {
          res.data.map((item, i) => {
            allProf[i] = {
              id: item._id,
              category: item.name,
              img: item.img,
            };
          });
          console.log(allProf);
          await setProf(allProf);
        })
        .catch((err) => {
          console.log("react filed get all... " + err);
        });
    },[]
  )

  const selectProf = (idP) => {
    console.log(idP);
    props.changeProfSelect(idP)
  }

  return (
    <>
      <div className="outer">
        <div id="innerCtgry" className="inner">
          <Container>
            <Row className="titleNeed">
              <h3>
                ל{sessionStorage.getItem("typeEvent")} שלכם ב{" "}
                {sessionStorage.getItem("dateEvent")} אתם צריכים:
              </h3>
            </Row>
            <Row>
              {prof.map((item, i) => (
                <Link
                  className="linkCard"
                  to={"./IndexProfessions"}
                  onClick={() => {
                    sessionStorage.setItem("prof selected", item.category);
                    selectProf(item.category);
                  }}
                >
                  <CategoryCard
                    category={item.category}
                    img={item.img}
                    id={item.id}
                    isClose={
                      sessionStorage.getItem("profs")?.indexOf(item.category)>=0
                        ? 1
                        : 0
                    }
                  ></CategoryCard>
                </Link>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );

}
export default connect(
  (state) => {
    return {
      state
    };
  },
  {
    changeProfSelect: setProfSelect,
  }
)(YouNeed);
import React, { useState, useEffect } from "react";
import { showBUByProf } from "../server/professions";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { setBUSelect } from "../redux/actions/inputs.action";
import './indexProfessions.css'


function IndexProfesions(props) {
  const { changeBUSelect } = props;
  const [bUsers, setBUsers] = useState([{}]);
  let a = [{}];
  const { profSelect } = props;
  useEffect(async () => {
    console.log(profSelect);
    await showBUByProf(profSelect)
      .then(async (req) => {
        a = req.data;
        console.log(a);
        await setBUsers(a);
      })
      .catch((err) => console.log(err + "error!!!"));
  }, []);

  const selectProf = (bus) => {
    sessionStorage.setItem("user selected", bus._id);
    changeBUSelect(bus);
  };

  return (
    <div className="outer">
      <div id="innerCtgry" className="inner">
        <Table dir="rtl" striped>
          <thead>
            <tr>
              <th>שם</th>
              <th />
              <th>חברה</th>
              <th />
              <th>אזור</th>
            </tr>
          </thead>
          <tbody>
            {bUsers.map((item) => {
              console.log(item.name);
              return (
                <>
                  <tr>
                    <Link to={"./HomeBUser"} onClick={() => selectProf(item)}>
                      <td className="name">{item.name}</td>
                      
                    </Link><td />
                    <td>{item.company}</td>
                    <td />
                    <td>{item.area}</td>
                  </tr>
                  <hr />
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      profSelect: state.profSelect,
    };
  },
  {
    changeBUSelect: setBUSelect,
  }
)(IndexProfesions);

// // const BusinessProps = props => (
// //   <tr>
// //     <td>{props.business.name}</td>
// //     <td>{props.business.profession}</td>
// //     <td>{props.business.area}</td>
// //     <td>{props.business.seniority}</td>
// //     <td>{props.business.description}</td>
// //     <td>{props.business.minPrice}</td>
// //     <td>{props.business.url}</td>
// //   </tr>
// // )
// // const Business = props =>{
// //     console.log(props);
// //     return
// //     <li>{props.name}</li>
// // }
//  /*<Link to={"/Login" + props._id}>*//*</Link>*/

// const Business = props => (
//     <h1>{ props.business.name}</h1>
// //   <li> <Link to={"/businessPage/" + props.business._id}>{props.business.name}</Link></li>
// )

// export default function BusinessIndex(props) {

//   const [businessNames, setBusinessNames] = useState([]);
//   const profession ={profession:'צילומים'} ;//צריך להתקבל בפרופס
//     const allBusiness = [
//         [],
//         [],
//         [],
//         [],
//         [],
//         [],
//         []
// ];
//     const a = [];
//     let i = 0;
//     const areas = [
//         "ירושלים",
//         "מרכז",
//         "צפון",
//         "השרון",
//         "חיפה",
//         "דרום",
//         "שפלה"];
//   useEffect(async() => {//מייבא את העסקים שהם אולם
//     await axios.post('http://localhost:4000/showAllByProf',profession)
//         .then(async response => {
//            await response.data.map(item => a[i++] = item);
//             // console.log(response.data);
//             //  setBusinessNames(arr=> [...arr, response.data]);
//             console.log(a);
//             a.forEach(currentBusiness => {//עובר על כל העסקים ומחלק אותם לאיזורים אח"כ ממפה אותם בצורת קישור
//                 console.log(currentBusiness);
//                 switch (currentBusiness.area) {
//                 case "שפלה": allBusiness[4].push(currentBusiness); break;
//                 case "דרום": allBusiness[3].push(currentBusiness); break;
//                 case "צפון": allBusiness[2].push(currentBusiness); break;
//                 case "מרכז": allBusiness[1].push(currentBusiness); break;
//                 case "ירושלים": {console.log(currentBusiness); allBusiness[0].push(currentBusiness); break;}
//                 default: {console.log(currentBusiness); allBusiness[1].push(currentBusiness); break;}
//       }
//             });
//             console.log(allBusiness);
//         }) // set businessNames in state
//       .catch((error) => {
//         console.log(error);
//       })
//   }, []);

// //   const AreasList = () => {

// //     //   console.log(allBusiness);
// //     return areas.map((current, index) => {
// //       return <>
// //           {/* <h3>{current}</h3>
// //           <h1>{allBusiness[0].name}</h1>
// //         <ul>
// //           {
// //                   allBusiness[index].map(currentBusiness => {
// //                       <Business business={allBusiness[index]} />
// //                   })
// //           }
// //         </ul> */}
// //       </>
// //     })
// //   }

//   return (
//     <div>
//           <h1>אינדקס עסקים</h1>
//           {areas.map((current, index) => {return(<><h2>{profession.profession}</h2>
//       <h3>{current}</h3>
//           {/* <h1>{allBusiness[0].name}</h1> */}
//         <ul>
//           {
//                   allBusiness[index].map(currentBusiness => {
//                     //   <Business business={currentBusiness[index]} />

//                       <li>{currentBusiness[index].name}</li>
//                   })
//           }
//         </ul></>)
//           }
//           )}

//     </div>
//   )

// }

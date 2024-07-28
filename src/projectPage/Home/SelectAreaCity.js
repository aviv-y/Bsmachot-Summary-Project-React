

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { showCity } from "../server/event";
import "./selectStyle.css";

export default function SelectAreaCity(props) {
  const [areas, setAreas] = useState([
    { value: "ירושלים", label: "ירושלים" },
    { value: "מרכז", label: "מרכז" },
    { value: "השרון", label: "השרון" },
    { value: "צפון", label: "צפון" },
    { value: "חיפה", label: "חיפה" },
    { value: "דרום", label: "דרום" },
  ]);
  const [cities, setCities] = useState({});
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showCity();
        const data = Array.from(res.data);
        const areaMap = {};
        data.forEach((item) => {
          if (!areaMap[item.shem_napa]) {
            areaMap[item.shem_napa] = [];
          }
          areaMap[item.shem_napa].push({ value: item.name, label: item.name });
        });
        setCities(areaMap);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  const handleAreaChange = (selectedArea) => {
    setSelectedArea(selectedArea);
    sessionStorage.setItem("areaSelected", selectedArea.value);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedCity) => {
    setSelectedCity(selectedCity);
    sessionStorage.setItem("citySelected", selectedCity.value);
  };

  return (
    <>
      <Select
        name="area"
        value={selectedArea}
        onChange={handleAreaChange}
        placeholder="אזור"
        options={areas}
        isClearable
      />
      {selectedArea && (
        <Select
          name="city"
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="עיר"
          options={cities[selectedArea.value]}
          isClearable
        />
      )}
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { showCity } from "../server/event";
// import "./selectStyle.css";

// export default function SelectAreaCity(props) {
//   const [ci, setC] = useState([]);
//   const [selectedArea, setSelectedArea] = useState(0);
//   let statusUConnect = sessionStorage.getItem("status connect user");

//   let isarea = [
//     { id: 0, value: "ירושלים", label: "ירושלים" },
//     { id: 1, value: "מרכז", label: "מרכז" },
//     { id: 2, value: "השרון", label: "השרון" },
//     { id: 3, value: "חיפה", label: "חיפה" },
//     { id: 4, value: "צפון", label: "צפון" },
//     { id: 5, value: "דרום", label: "דרום" },
//   ];

//   let cities = [];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await showCity();
//         let data = Array.from(res.data);
//         let newCities = data.map((item) => ({
//           value: item.name,
//           label: item.name,
//           area: item.shem_napa,
//         }));
//         cities = [...cities, ...newCities];
//         // Update state after modifying cities array
//         setC([...cities]);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run the effect only once

//   const oCArea = async (e) => {
//     let c;
//     sessionStorage.setItem("areaSelected", e.value);
//     setSelectedArea(1);

//     switch (e.value) {
//       case "ירושלים":
//         c = cities.filter(
//           (item) => item.area === "חברון" || item.area === "ירושלים"
//         );
//         await setC(c);
//         console.log(ci);
//         break;
//       case "מרכז":
//         c = cities.filter(
//           (item) =>
//             item.area === "רחובות" ||
//             item.area === "פתח תקווה" ||
//             item.area === "תל אביב" ||
//             item.area === "רמת גן" ||
//             item.area === "נצרת" ||
//             item.area === "חולון" ||
//             item.area === "רמלה"
//         );
//         await setC(c);
//         console.log(ci);
//         break;
//       case "השרון":
//         c = cities.filter(
//           (item) => item.area === "השרון" || item.area === "חדרה"
//         );
//         console.log(c);
//         setC(c);
//         break;
//       case "חיפה":
//         c = cities.filter((item) => item.area === "חיפה");
//         console.log(c);
//         await setC(c);
//         break;
//       case "צפון":
//         c = cities.filter(
//           (item) =>
//             item.area === "כנרת" ||
//             item.area === "עכו" ||
//             item.area === "עפולה" ||
//             item.area === "צפת"
//         );
//         console.log(c);
//         await setC(c);
//         break;
//       case "דרום":
//         c = cities.filter(
//           (item) => item.area === "אשקלון" || item.area === "באר שבע"
//         );
//         console.log(c);
//         await setC(c);
//         break;
//     }
//   };

//   const oCCity = (e) => {
//     let selectedCity = e.value;
//     sessionStorage.setItem("citySelected", selectedCity);
//   };

//   return (
//     <>
//       <Select
//         name="are"
//         type="text"
//         onChange={(e) => oCArea(e)}
//         placeholder={statusUConnect ? props.area : "אזור"}
//         clearable={true}
//         options={isarea}
//       />
//       {selectedArea && (
//         <Select
//           name="city"
//           type="text"
//           onChange={(e) => oCCity(e)}
//           placeholder={statusUConnect ? props.city : "עיר"}
//           clearable={true}
//           options={ci}
//         />
//       )}
//     </>
//   );
// }
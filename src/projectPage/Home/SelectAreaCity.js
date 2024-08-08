

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
        className="selectAC"
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
          className="selectAC"
          onChange={handleCityChange}
          placeholder="עיר"
          options={cities[selectedArea.value]}
          isClearable
        />
      )}
    </>
  );
}


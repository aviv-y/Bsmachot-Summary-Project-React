import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './menuBtn.css'
import { AiOutlineUser } from "react-icons/ai"; 
import { useHistory } from "react-router-dom";
// import getImages from '../uploadImg/getImages';



export default function MenuBtn(){


  const [image, setImage]=useState(0)
  const [inOrOut, setInOrOut] = useState(() => {
    if (sessionStorage.getItem("user"))
      return "יציאה";
    return "כניסה";
  })
  const history = useHistory();

  const userSTLink = () => {
    if (sessionStorage.getItem("user")) {
      sessionStorage.clear();
      window.location.reload();
  }
    history.push("./Login");

  }
    useEffect(() => {
      const fetchImages = async () => {
        // const imgs = await getImages(sessionStorage.getItem('user'), 1);
        setImage(sessionStorage.getItem("prflImg"));
        // sessionStorage.setItem("prflImg", imgs);
        // console.log(imgs);
      };
      fetchImages();
    },);
  
  useEffect(() => {
    console.log();
  },[image])
  
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="white" className="drpdnBtn">
          {image != 0 && <img src={image} className="mnuBtnIcn" />}
          {!image && <AiOutlineUser className="mnuBtnIcn" />}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="drpdnItm">
            {" "}
            <Link className="lnkMenuBtn" to="/Details-User">
              לאזור האישי
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drpdnItm">
            <Link className="lnkMenuBtn" to="/MyEvents">
              האירועים שלי
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drpdnItm">
            <Link className="lnkMenuBtn" to="/MyMess">
              ההודעות שלי
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="drpdnItm">
            <Link className="lnkMenuBtn" to="/MyContracts">
              החוזים שלי
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="drpdnItm">
            <Link className="lnkMenuBtn" onClick={userSTLink}>
              {inOrOut}
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

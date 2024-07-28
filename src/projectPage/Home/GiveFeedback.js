
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import './getFeedback.css'
import {Button} from "react-bootstrap"
import { sendFeedbackOnBU } from "../server/event";

const StarRating = ({ totalStars, stars }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
        {[...Array(totalStars)].map((star, i) => {
          const starValue = i + 1;
          return (
            <label key={i}>
              <input
                id="inptStar"
                type="radio"
                name="rating"
                value={starValue}
                onClick={() => { setRating(starValue); stars(starValue)}}
              />
              <FaStar
                className="star"
                color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={25}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
  );
};



export default function GiveFeedback(props) {
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");

  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const idUser = urlSearchParams.get("user");

  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted feedback:", feedback);
    setFeedback("");
    console.log(props.bUserDtls);
    await sendFeedbackOnBU({
      bUser: props.bUserDtls.idUser,
      bUserName: props.bUserDtls.name,
      bUserMail: props.bUserDtls.userMail,
      pUser: sessionStorage.getItem("user"),
      pUserName: sessionStorage.getItem("user name"),
      stars: stars,
      remark: feedback,
    }).then(r => {
      console.log(r)
      props.setEnd(0);
      // window.location.reload();
    }).catch(err=>console.log(err));
  };

  
  return (
    <>
      {/* <div className="outer"> */}
        <div className="inner innrBckgrnd">
          <h1>דרג את החויה שלך</h1>
          <StarRating totalStars={5} stars={setStars} />
          <h4>מוזמנים גם לכתוב פידבק</h4>
          <form onSubmit={handleSubmit}>
            <textarea
              id="txtBxFeedback"
              value={feedback}
              onChange={handleInputChange}
              placeholder="כתוב את ההערה שלך כאן..."
              rows={4}
              cols={50}
            />
            <br />
            <Button type="submit">אישור</Button>
          </form>
        </div>
      {/* </div> */}
    </>
  );
}
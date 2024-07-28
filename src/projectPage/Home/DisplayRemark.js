import React, { useEffect, useState } from "react";
import { displayRemarkByBUserId } from "../server/connectBU";

export default function DisplayRemark(props) {
  const [remarks, setRemarks] = useState([]);

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const fetchedRemarks = await displayRemarkByBUserId({
          bUser: props.bUser,
        });
        setRemarks(fetchedRemarks.data);
      } catch (error) {
        console.error("Error fetching remarks:", error);
      }
    };

    fetchRemarks();
  }, [props.bUser]);

  return (<>
    {remarks.length&&<div>
      
      <h4>תגובות של לקוחות</h4>
      <ul>
        {remarks.map((remark, index) => (
          <li key={index}>
            <div>{"⭐️".repeat(remark.stars)}</div>
            <p>{remark.remark}</p>
          </li>
        ))}
      </ul>
    </div>}</>
  );
}

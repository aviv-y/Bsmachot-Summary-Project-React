import React, { useState, useEffect } from "react";
import "./Modal.css"; // סגנונות CSS למודאל

const About = () => {
  const [showModal, setShowModal] = useState(true); // המודאל מוצג בהתחלה

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false); // מסתיר את המודאל לאחר 30 שניות
    }, 30000);

    return () => clearTimeout(timer); // ניקוי הטיימר אם המודאל נסגר מוקדם
  }, []);

  if (!showModal) return null; // אם המודאל מוסתר, לא מציג אותו

  return (
    <div className="modal">
      <div className="modal-content">
              <h2>ברוכים הבאים לאתר "בשמחות"!</h2>
              <h4>יש לכם אירוע בקרוב?</h4>
        <p>הרשמו לאתר, ספרו לנו ע"י הכפתורים למטה איזה אירוע זה, מתי ואיפה הוא יתקיים, ותוכלו להתרשם ואפילו לסגור עם אחד מנותני השירות המקצועיים שיש לנו להציע לכם!</p>
              <br/>
              <h4>נותני שירות? בעלי עסקים?</h4>
              <p>הרשמו לאתר, תעלו תמונות להתרשמות, ספרו לנו וללקוחות שלכם על עצמכם, וזהו, לכו להכין קפה, ולא לשכוח להיות זמינים במייל לפניות של לקוחות!</p>
              <button onClick={() => setShowModal(false)}>סגור</button>
      </div>
    </div>
  );
};

export default About;

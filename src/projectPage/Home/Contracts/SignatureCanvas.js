import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './contract.css';

export default function SignaPad(props){
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPadRef = useRef(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  const clear = () => {
    if (sigPadRef.current) {
        sigPadRef.current.clear();
        
    }
  };

  useEffect(() => {
    console.log(trimmedDataURL);
    props.setSign(trimmedDataURL);

  }, [trimmedDataURL]);

  const trim =async () => {
    if (sigPadRef.current) {
      await setTrimmedDataURL(
        sigPadRef.current.getTrimmedCanvas().toDataURL("image/png")
        );
      handleClose()
    }
  };

  
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        חתימה
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>חתימה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignaturePad
            canvasProps={{ className: "convaSigna", width: 400, height: 150 }}
            ref={sigPadRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clear}>
            נקה
          </Button>
          <Button variant="primary" onClick={trim}>
            אישור
          </Button>
        </Modal.Footer>
      </Modal>

      {trimmedDataURL ? (
        <>
          <br />
          <img
            className="imgSign"
            src={trimmedDataURL}
            alt="Trimmed Signature"
          />
        </>
      ) : null}
    </div>
  );
};


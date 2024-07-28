import React, { useEffect, useState } from "react";
import {showAllContracts} from "../server/event"
import GeneratePDF from "../PDFs/GeneratePDF";
import { FaRegFilePdf } from "react-icons/fa6";
import "./myContract.css";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function MyContracts() {
  const [contract, setContract] = useState([]);
  let titleModal;
    const history = useHistory();

  useEffect(async () => {
    try {
      const res = await showAllContracts({
        userId: sessionStorage.getItem("user"),
        userType: sessionStorage.getItem("user type"),
      });
      setContract(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signaOnContract = (c) => {
      history.push("/SignClient", { contract: c });

}
        const formatDate = (date) => {
          const d = new Date(parseInt(date));
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = String(d.getFullYear()).slice(-2);
          return `${day}/${month}/${year}`;
        };
  return (
    <>
          <div className="outer">
              <div className="inner">
                  <h1>ארכיון חוזים</h1>
                  {contract.map((i) => {
                    const date = formatDate(i.date);
                    i.signaPU
                      ? (titleModal = ` חוזה חתום מתאריך ${date}`)
                      : (titleModal = `חוזה שטרם נחתם מתאריך ${date}`);
        return (
          <>
            <button key={i.id} onClick={handleShow}>
              {" "}
              <FaRegFilePdf className="icnPdf" size={90} />
              <br />
              <h7>{date.toString()}</h7>{" "}
            </button>

            <Modal>
              <ModalBody></ModalBody>
            </Modal>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{titleModal}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <GeneratePDF reports={i.contractValue} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {!i.signaPU && (
                  <Button variant="primary" onClick={()=>signaOnContract(i)}>
                    לחתימה
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </>
        );})}
              </div>
      </div>
      
    </>
  );
}


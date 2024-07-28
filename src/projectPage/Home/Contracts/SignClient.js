import React, { useEffect, useState } from "react";
import { showContract, updateContract, updateEvent } from "../../server/event";
import GeneratePDF, { createPDF } from "../../PDFs/GeneratePDF";
import { Button } from "react-bootstrap";
import "./contract.css";
import SignaPad from "./SignatureCanvas";
import { useHistory } from "react-router-dom";


export default function SignClient(props) {
    const history = useHistory();

    const [contract, setContract] = useState({ "contractValue": 0 })
  const [signature, setSignature] = useState();
  const [sent, setSent] = useState(0);
  useEffect(() => {
    if (props.contract) {
        setContract(props.contract)
    }
    else {
      const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        showContract({'token': token}).then(res=>{
            console.log(res);
            setContract(res.data[0])
        })
          .catch(err=>console.log(err))
    }        
      }, []);



    useEffect(async () => {
        if (signature) {
            console.log(contract);
            const name = contract.contractValue.subTitle
              .split("לבין")[1]
              .split("\n")[0]
              .trim();
          let updateContract = {
            ...contract,
            namePU: name,
            signaPU: true,
            contractValue: {
              ...contract.contractValue,
              namePU: name,
              signClient: signature,
            },
          };
            console.log(updateContract);
          await setContract(updateContract);
          console.log(contract);
          
        }
    }, [signature])

    //render to update the state
    useEffect(() => {
      console.log(contract);
    }, [contract]);



    const MessToBUser = () => {
        sessionStorage.setItem("user", contract.pUser);
        // history.push(`/MessTo?token=${contract.event}`);
        history.push(`/MyMess`);
    }

  const sendContract = async () => {
    console.log(contract);
    await updateContract(contract)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    await updateEvent({'bUser': contract.bUser, 'id': contract.event})
      .then((res) => {
        console.log(res)
        setSent(1);
        setTimeout(() => {
          history.push("/Home");
        }, 7000);
      })
      .catch((err) => console.log(err));

    return;
  }


    return (
      <>
        {sent && (
          <div className="outer">
            <div className="inner">
              <h3>החוזה החתום נשלח לנותן השירות :)</h3>
              <h6>תודה שבחרת באתר "בשמחות"!</h6>
            </div>
          </div>
        )}
        {!sent && (
          <>
            <br />
            <br />
            <br />
            {!signature && (
              <div id="signPad">
                <SignaPad setSign={setSignature} />
              </div>
            )}
            {signature && (
              <Button className="btnSign" id="btnMess" onClick={sendContract}>
                לשליחת החוזה לבעל העסק
              </Button>
            )}
            <Button className="btnSign" id="btnMess" onClick={MessToBUser}>
              לשליחת הודעה לבעל העסק
            </Button>
            <br />
            <GeneratePDF reports={contract.contractValue} />
          </>
        )}
      </>
    );
}
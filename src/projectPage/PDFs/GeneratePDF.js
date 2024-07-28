import jsPDF from "jspdf";
import "../../fonts/Heebo-Regular-normal.js";
import React, { useState, useEffect } from "react";
import { sendAttachment } from "../server/event.js";
import logo from '../../logo/logo.jpg';

export const createPDF = async (pdfD, nameBU, nameClient, toId, isUpdate) => {
  // console.log(isUpdate);
  const doc = new jsPDF();
  doc.addFont("Heebo-Regular-normal.ttf", "Heebo-Regular", "normal");
  doc.setFont("Heebo-Regular");
  doc.setR2L(true);
  doc.setFontSize(12);
  doc.addImage(logo, "jpg", -1, -3, 50, 60);
  doc.text(`אתר בשמחות\n\nבסיעתא דשמיא`, 100, 20, {
    align: "center",
  });
  doc.setFontSize(24);
  doc.text(pdfD.title, 100, 40, {
    align: "center",
  });
  doc.setFontSize(19);
  doc.text(pdfD.subTitle, 100, 55, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text(pdfD.text, 180, 110, {
    maxWidth: 150,
    align: "right",
  });
  doc.setFontSize(14);
  doc.text(pdfD.remark, 180, 220, {
    maxWidth: 150,
    align: "right",
  });
  doc.setFontSize(17);
  if (pdfD.signClient) {
    doc.text(`על החתום: ${pdfD.namePU}`, 190, 260, {
      maxWidth: 150,
      align: "right",
    });
    doc.addImage(pdfD.signClient, "PNG", 160, 270);
  }
  doc.text(pdfD.signaTtl, 20, 260, {
    align: "left",
  });

  doc.addImage(pdfD.signature, "PNG", 20, 270);

  const pdfurl = doc.output("datauristring");
  if (nameBU != 0) {
    
    doc.save(`report_.pdf`);

  let tkn =
      sessionStorage.getItem("user").slice(-6) + sessionStorage.getItem('idEvent').slice(-6)
  let attachDtls = {
    pdfValue: pdfD,
    user: sessionStorage.getItem("user"),
    name: nameBU,
    client: nameClient,
    toId: toId,
    token: tkn,
    event: sessionStorage.getItem("idEvent"),
    isUpdate
  };
  console.log(attachDtls);
  await sendAttachment(attachDtls)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  return pdfurl;
};

function GeneratePDF({ reports }) {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    async function generatePdf() {
      try {
        const url = await createPDF(reports, 0);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
    generatePdf();
  }, [reports]); // Re-run the effect when reports change

  return (
    <div>
      {/* Render the embed only when pdfUrl is not empty */}
      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="800px"
        />
      )}
    </div>
  );
}

export default GeneratePDF;
// function GeneratePDF({ reports }) {
//   const [pdfUrl, setPdfUrl] = useState("");
//   console.log(reports);

//   useEffect(() => {
//     // Call createPDF function when component mounts
//     async function generatePdf() {
//       try {
//         const url = await createPDF(reports, 0);
//         setPdfUrl(url);
//       } catch (error) {
//         console.error("Error generating PDF:", error);
//       }
//     }
//     generatePdf();
//   }, []);
  
//   useEffect(() => {
//     console.log(pdfUrl);
//   },[pdfUrl])

//   return (
//     <div>
//       {/* {pdfUrl && ( */}
//         <embed
//           src={pdfUrl}
//           type="application/pdf"
//           width="100%"
//           height="800px"
//         />
//       {/* )} */}
//     </div>
//   );
// }

// export default GeneratePDF;

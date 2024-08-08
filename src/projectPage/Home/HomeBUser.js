

import React, { useEffect, useState } from "react";
import {

  Carousel,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./homeUB.css";
import "./selectStyle.css";
import getImages from "../uploadImg/getImages";
import DisplayRemark from "./DisplayRemark";

function HomeBUser(props) {
  const { bUSelect } = props;
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await getImages(bUSelect._id, 0);
      setImages(imgs);
      console.log(images);
    };
    fetchImages();
  }, [bUSelect._id]);

  const handleImageError = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="outer">
      <div id="innerCtgry" className="inner innerBU">
        <Table>
          <tbody>
            <tr>
              <td>
                <h1>{bUSelect.company}</h1>
              </td>
              <td>
                <h3>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">שלח</Tooltip>}
                  >
                    <span id="sendBtn">
                      <Link to={"./MessTo"}>
                        <BiSend className="icons sendIcn" />
                      </Link>
                    </span>
                  </OverlayTrigger>
                </h3>
              </td>
            </tr>
            <tr>
              <td>
                <h4>{bUSelect.about}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h5>{bUSelect.more}</h5>
              </td>
            </tr>
            <tr>
              <td>
                {bUSelect.subProfession.map((item, index) => (
                  <p key={index} className="subProfession">
                    {item.value}, &nbsp;
                  </p>
                ))}
                <p>{bUSelect.city}</p>
                <p>ותק: {bUSelect.seniority} שנה</p>
                <p>טווח מחירים: {bUSelect.priceRange} ש"ח</p>
              </td>
            </tr>
            <tr>
              <td>
                <DisplayRemark bUser={bUSelect._id} />
              </td>
            </tr>
            <tr id="trImg">
              <td>
                <Carousel className="crslBU">
                  {images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="imgCrsl"
                        src={img}
                        onError={() => handleImageError(index)}
                        onClick={() => handleImageClick(index)}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Modal for Fullscreen Carousel */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>תמונות</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel
            activeIndex={currentImageIndex}
            onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}
          >
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect((state) => {
  return {
    bUSelect: state.bUSelect,
  };
}, null)(HomeBUser);


import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
function SellerInfoModalModal(props) {
  console.log(props.seller)
  const [matchingUser, setMatchingUser] = useState(null);

  useEffect(() => {
    if (props.users) {
      const foundUser = props.users.find(
        (user) => user.UserID === props.seller.UserID
      );
      setMatchingUser(foundUser);
    }
  }, [props.users, props.seller.UserID]);
  // Use the user's profile picture if a matching user is found
  const sellerProfilePicture = matchingUser?.UserPFP || props.seller.SellerPFP;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Seller Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Image src={sellerProfilePicture} thumbnail roundedCircle></Image>
            </Col>
          </Row>
          <Row>
            <Col>SellerID:</Col>
            <Col>{props.seller.SellerID}</Col>
          </Row>
          <Row>
            <Col>SellerName:</Col>
            <Col>{props.seller.SellerName}</Col>
          </Row>
          <Row>
            <Col>SellerAddress:</Col>
            <Col>{props.seller.SellerAddress}</Col>
          </Row>
          <Row>
            <Col>UserID:</Col>
            <Col>{props.seller.UserID}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SellerInfoModalModal;

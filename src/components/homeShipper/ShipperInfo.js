import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PropTypes from 'prop-types';

function ShipperInfo(props) {
  const { shipper, onHide } = props;

  if (!shipper) {
    return null;
  }

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
            <Col>SellerID:</Col>
            <Col>{shipper.ShipperID}</Col>
          </Row>
         
          <Row>
            <Col>UserID:</Col>
            <Col>{shipper.UserID}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

ShipperInfo.propTypes = {
  shipper: PropTypes.shape({
    ShipperID: PropTypes.string,
    UserID: PropTypes.string
  }), 
  onHide: PropTypes.func.isRequired
};

export default ShipperInfo;

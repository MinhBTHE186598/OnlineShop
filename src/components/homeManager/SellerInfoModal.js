import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PropTypes from 'prop-types';

function SellerInfoModalModal(props) {
  const { seller, onHide } = props;

  if (!seller) {
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
            <Col>{seller.SellerID}</Col>
          </Row>
          <Row>
            <Col>SellerName:</Col>
            <Col>{seller.SellerName}</Col>
          </Row>
          <Row>
            <Col>SellerAddress:</Col>
            <Col>{seller.SellerAddress}</Col>
          </Row>
          <Row>
            <Col>UserID:</Col>
            <Col>{seller.UserID}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

SellerInfoModalModal.propTypes = {
  seller: PropTypes.shape({
    SellerID: PropTypes.string,
    SellerName: PropTypes.string,
    SellerAddress: PropTypes.string,
    UserID: PropTypes.string
  }),
  onHide: PropTypes.func.isRequired
};

export default SellerInfoModalModal;

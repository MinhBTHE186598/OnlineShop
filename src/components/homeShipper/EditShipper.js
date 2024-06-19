import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EditShipper({ show, onHide,  Shipper = {}, onUpdate }) {
  EditShipper.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    Shipper: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  const [shipperID, setShipperID] = useState(Shipper.ShipperID || '');
  const [userID, setUserID] = useState(Shipper.UserID || '');

  useEffect(() => {
    if (Shipper) {
      setShipperID(Shipper.SellerID || '');
      setUserID(Shipper.UserID || '');
    }
  }, [Shipper]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/shipper/updateShipper/${shipperID}`, {
        shipperID,
        userID
      });

      if (response.status === 200) {
        onUpdate({ shipperID,userID });
        console.log('Seller edited successfully');
        onHide(); // Close the modal on successful update
      } else {
        console.log('Error editing shipper');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      
    </Modal>
  );
}

export default EditShipper;

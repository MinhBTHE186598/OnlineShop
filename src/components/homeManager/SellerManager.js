import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SellerInfoModal from './SellerInfoModal';
import EditSellerModal from './EditSellerModal';
import ConfirmModal from './ConfirmModal';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

export default function SellerManager() {
  const [sellers, setSellers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerIDToDelete, setSellerIDToDelete] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/seller/get")
      .then(response => response.json())
      .then(data => {
        setSellers(data);
      });
  }, []);

  const handleEditSeller = (seller) => {
    setSelectedSeller(seller);
    setShowEdit(true);
  };

  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
    setModalShow(true);
  };

  const handleUpdate = (updatedSeller) => {
    setSellers(sellers.map(seller =>
      seller.SellerID === updatedSeller.SellerID ? updatedSeller : seller
    ));
    setShowEdit(false);
  };

  const handleDeleteSeller = async (sellerID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/seller/delete/${sellerID}`);
      if (response.status === 200) {
        setSellers(sellers.filter(seller => seller.SellerID !== sellerID));
        console.log('Seller deleted successfully');
      } else {
        console.log('Error deleting seller');
      }
    } catch (error) {
      console.error('Error', error);
    }
    setShowConfirm(false);
  };

  const confirmDeleteSeller = (sellerID) => {
    setSellerIDToDelete(sellerID);
    setShowConfirm(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Seller ID</th>
            <th>Seller Name</th>
            <th>Seller Address</th>

            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={index}>
              <td>{seller.SellerID}</td>
              <td>{seller.SellerName}</td>
              <td>{seller.SellerAddress}</td>
          
              <td>{seller.UserID}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEditSeller(seller)}>
                  Edit
                </Button>
                <Button size="sm" variant="info" onClick={() => handleViewSeller(seller)} style={{ marginLeft: '10px' }}>
                  View
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedSeller && (
        <>
          <EditSellerModal
            show={showEdit}
            onHide={() => setShowEdit(false)}
            Seller={selectedSeller}
            onUpdate={handleUpdate}
          />
          <SellerInfoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            seller={selectedSeller}
          />
        </>
      )}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => handleDeleteSeller(sellerIDToDelete)}
        obj="seller"
      />
    </>
  );
}

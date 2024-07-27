import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SellerInfoModal from './SellerInfoModal';
import EditSellerModal from './EditSellerModal';
import axios from 'axios';

export default function SellerManager({ id }) {
  const [sellers, setSellers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const fetchSellers = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/seller/getSellerBySellManagerID/${id}`);
    console.log("Response Data:", response.data); // Kiểm tra dữ liệu trả về
    setSellers(response.data);
  } catch (error) {
    console.error('Error fetching sellers:', error);
  }
};

  useEffect(() => {
    fetchSellers();
  }, [id]);

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

  return (
    <div style={{overflowY: "scroll", height: "70vh"}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID người bán</th>
            <th>Tên người bán</th>
            <th>Địa chỉ người bán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={index}>
              <td>{seller.SellerID}</td>
              <td>{seller.SellerName}</td>
              <td>{seller.SellerAddress}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEditSeller(seller)}>
                  Chỉnh sửa
                </Button>
                <Button size="sm" variant="info" onClick={() => handleViewSeller(seller)} style={{ marginLeft: '10px' }}>
                  Xem thông tin
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
            seller={selectedSeller}
            onUpdate={handleUpdate}
          />
          <SellerInfoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            seller={selectedSeller}
          />
        </>
      )}
    </div>
  );
}

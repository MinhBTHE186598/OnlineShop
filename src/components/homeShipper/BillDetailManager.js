import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import BillDetailModal from './BillDetailModal';
import { useUser } from '../context/UserContext';

export default function BillDetailManager() {
  const [billDetails, setBillDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalBillDetails, setModalBillDetails] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [shipperList, setShipperList] = useState([]);
  const { user, setUser, setUserRole, setIsLogin } = useUser();

  useEffect(() => {
    // Fetch bill details
    axios.get("http://localhost:5000/bill/getBillDetail")
      .then(response => {
        setBillDetails(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bill details!", error);
      });

    // Fetch shipper list and get current user's ShipperID
    axios.get('http://localhost:5000/user/getShipper')
      .then(response => {
        if (response.data) {
          setShipperList(response.data);
          // Find the ShipperID for the current user
          const currentUser = response.data.find(shipper => shipper.UserID === user.UserID);
          if (currentUser) {
            setCurrentUserId(currentUser.ShipperID);
          } else {
            console.error('No ShipperID found for the current user!');
          }
        }
      })
      .catch(error => {
        console.error('There was an error fetching the shipper list!', error);
      });
  }, [user.UserID]);

  const handleViewProductsClick = (billId) => {
    const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
    setModalBillDetails(filteredBillDetails);
    setShowModal(true);
  };

  const handleAcceptOrderClick = (billId) => {
    setSelectedBillId(billId);
    setShowConfirmModal(true);
  };

  const handleConfirmAcceptOrder = () => {
    axios.put(`http://localhost:5000/bill/updateBill`, {
      BillID: selectedBillId,
      ShipperID: currentUserId,
      BillDetailStatus: "Đang vận chuyển"
    })
      .then(response => {
        const updatedBillDetails = billDetails.map(billDetail => {
          if (billDetail.BillID === selectedBillId) {
            return {
              ...billDetail,
              ShipperID: currentUserId,
              BillDetailStatus: "Đang vận chuyển"
            };
          }
          return billDetail;
        });
        setBillDetails(updatedBillDetails);
        setShowConfirmModal(false);
      })
      .catch(error => {
        console.error("There was an error updating the bill details!", error);
      });
  };

  const uniqueBillIds = [...new Set(billDetails
    .filter(billDetail => billDetail.BillDetailStatus === "Chưa xác nhận" || billDetail.BillDetailStatus === "Đang vận chuyển")
    .map(billDetail => billDetail.BillID)
  )];

  return (
    <>
      <div>
        <h3>ShipperID của bạn: {currentUserId ? currentUserId : 'Đang tải...'}</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Tổng sản phẩm</th>
            <th>Trạng thái đơn hàng</th>
            <th>Shipper ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillIds.map((billId, index) => {
            const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
            const billQuantity = filteredBillDetails.length;
            const billDetailStatus = filteredBillDetails[0]?.BillDetailStatus;
            const shipperId = filteredBillDetails[0]?.ShipperID || 'Vẫn chưa xác nhận';

            return (
              <tr key={index}>
                <td>{billId}</td>
                <td>{billQuantity}</td>
                <td>{billDetailStatus}</td>
                <td>{shipperId}</td>
                <td>
                  <Button variant="primary" onClick={() => handleViewProductsClick(billId)}>
                    Xem sản phẩm
                  </Button>
                  {billDetailStatus === "Chưa xác nhận" && (
                    <Button variant="success" onClick={() => handleAcceptOrderClick(billId)}>
                      Nhận đơn
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BillDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        billDetails={modalBillDetails}
      />

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận nhận đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn nhận đơn hàng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmAcceptOrder}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

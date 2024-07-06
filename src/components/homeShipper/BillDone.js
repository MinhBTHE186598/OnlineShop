import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import BillDetailModal from './BillDetailModal';
import { Button } from 'react-bootstrap';
import { useUser } from '../context/UserContext';

export default function BillDone() {
  const [billDetails, setBillDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalBillDetails, setModalBillDetails] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:5000/bill/getBillDetail")
        .then(response => {
          console.log('Bill Details:', response.data);
          setBillDetails(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the bill details!", error);
        });

      axios.get('http://localhost:5000/user/getShipper')
        .then(response => {
          console.log('Shipper List:', response.data);
          if (response.data) {
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
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [user.UserID]);

  const handleViewProductsClick = (billId) => {
    const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
    setModalBillDetails(filteredBillDetails);
    setShowModal(true);
  };

  // Lọc danh sách các BillDetails có trạng thái là "Đã nhận hàng" và ShipperID trùng với currentUserId
  const filteredBillDetails = billDetails.filter(
    billDetail => billDetail.BillDetailStatus === "Đã nhận hàng" && billDetail.ShipperID === currentUserId
  );

  // Lấy danh sách các BillID duy nhất từ filteredBillDetails
  const uniqueBillIds = [...new Set(filteredBillDetails.map(billDetail => billDetail.BillID))].sort((a, b) => a - b);

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
            // Chỉ lấy những BillDetail có BillID hiện tại
            const filteredBillDetailsForBillId = filteredBillDetails.filter(billDetail => billDetail.BillID === billId);
            const billQuantity = filteredBillDetailsForBillId.length;
            const billDetailStatus = filteredBillDetailsForBillId[0]?.BillDetailStatus;
            const shipperId = filteredBillDetailsForBillId[0]?.ShipperID;

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
    </>
  );
}

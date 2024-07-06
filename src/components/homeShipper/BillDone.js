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
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billResponse = await axios.get("http://localhost:5000/bill/getBillDetail");
        console.log('Bill Details:', billResponse.data);
        setBillDetails(billResponse.data);

        const shipperResponse = await axios.get('http://localhost:5000/user/getShipper');
        console.log('Shipper List:', shipperResponse.data);
        if (shipperResponse.data) {
          const currentUser = shipperResponse.data.find(shipper => shipper.UserID === user.UserID);
          console.log('Current User:', currentUser);
          if (currentUser) {
            setCurrentUserId(currentUser.ShipperID);
          } else {
            console.error('No ShipperID found for the current user!');
          }
        }

      } catch (error) {
        console.error("There was an error fetching data!", error);
      }
    };

    fetchData();
  }, [user.UserID]);

  const handleViewProductsClick = (billId, userId) => {
    const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
    setModalBillDetails(filteredBillDetails);
    setSelectedUserId(userId);  
    setShowModal(true);
  };

  const filteredBillDetails = billDetails.filter(
    billDetail => billDetail.BillDetailStatus === "Đã nhận hàng" && billDetail.ShipperID === currentUserId
  );

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
            <th>Số lượng sản phẩm</th>
            <th>Địa chỉ nhận hàng</th>
            <th>Trạng thái đơn hàng</th>
            <th>Shipper ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillIds.map((billId, index) => {
            const filteredBillDetailsForBillId = filteredBillDetails.filter(billDetail => billDetail.BillID === billId);
            const billQuantity = filteredBillDetailsForBillId.length;
            const billDetailStatus = filteredBillDetailsForBillId[0]?.BillDetailStatus;
            const shipperId = filteredBillDetailsForBillId[0]?.ShipperID;
            const userId = filteredBillDetailsForBillId[0]?.UserID;  
            const userAddress = filteredBillDetailsForBillId[0]?.UserAddress || 'Địa chỉ không có';

            return (
              <tr key={index}>
                <td>{billId}</td>
                <td>{billQuantity}</td>
                <td>{userAddress}</td>
                <td>{billDetailStatus}</td>
                <td>{shipperId}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewProductsClick(billId, userId)} 
                  >
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
        userId={selectedUserId}  
      />
    </>
  );
}

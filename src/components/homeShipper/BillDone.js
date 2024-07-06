import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
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

  const handleViewProductsClick = (billDetailId, userId) => {
    const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillDetailID === billDetailId);
    setModalBillDetails(filteredBillDetails);
    setSelectedUserId(userId);  
    setShowModal(true);
  };

  const filteredBillDetails = billDetails.filter(
    billDetail => billDetail.BillDetailStatus === "Đã nhận hàng" && billDetail.ShipperID === currentUserId
  );

  const uniqueBillDetailIds = [...new Set(filteredBillDetails.map(billDetail => billDetail.BillDetailID))].sort((a, b) => a - b);

  return (
    <>
      <div>
        <h3>ShipperID của bạn: {currentUserId ? currentUserId : 'Đang tải...'}</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Tên người nhận</th>
            <th>Số lượng sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Địa chỉ giao hàng</th>
            <th>Địa chỉ lấy hàng</th>
            <th>Trạng thái đơn hàng</th>
            <th>Ngày tạo đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillDetailIds.map((billDetailId, index) => {
            const filteredBillDetailsForBillDetailId = filteredBillDetails.filter(billDetail => billDetail.BillDetailID === billDetailId);
            const billQuantity = filteredBillDetailsForBillDetailId.length;
            const billDetailStatus = filteredBillDetailsForBillDetailId[0]?.BillDetailStatus;
            const shipperId = filteredBillDetailsForBillDetailId[0]?.ShipperID;
            const userId = filteredBillDetailsForBillDetailId[0]?.UserID;  
            const userAddress = filteredBillDetailsForBillDetailId[0]?.UserAddress || 'Địa chỉ không có';
            const userFirstName = filteredBillDetailsForBillDetailId[0]?.UserFirstName || 'Tên không có';
            const userLastName = filteredBillDetailsForBillDetailId[0]?.UserLastName || '';
            const userFullName = `${userFirstName} ${userLastName}`;

            return (
              <tr key={index} onClick={() => handleViewProductsClick(billDetailId, userId)}>
                <td>{billDetailId}</td>
                <td>{userFullName}</td>
                <td>{billQuantity}</td>
                <td>{filteredBillDetailsForBillDetailId[0]?.ProductName || 'Tên sản phẩm không có'}</td>
                <td>{userAddress}</td>
                <td></td>
                <td>{billDetailStatus}</td>
                <td>{filteredBillDetailsForBillDetailId[0]?.BillDate || 'Ngày không có'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

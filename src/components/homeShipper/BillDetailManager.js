import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import BillDetailModal from './BillDetailModal';

export default function BillDetailManager() {
  const [billDetails, setBillDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalBillDetails, setModalBillDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bill/getBillDetail")
      .then(response => {
        setBillDetails(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bill details!", error);
      });
  }, []);

  const handleBillClick = (billId) => {
    const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
    setModalBillDetails(filteredBillDetails);
    setShowModal(true);
  };

  const uniqueBillIds = [...new Set(billDetails
    .filter(billDetail => billDetail.BillDetailStatus === "Chưa xác nhận")
    .map(billDetail => billDetail.BillID)
  )];

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Tổng sản phẩm</th>
            <th>Trạng thái đơn hàng</th>
            <th>Shipper ID</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillIds.map((billId, index) => {
            const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
            const billQuantity = filteredBillDetails.length;
            const billDetailStatus = filteredBillDetails[0]?.BillDetailStatus;
            const shipperId = filteredBillDetails[0]?.ShipperID;

            return (
              <tr key={index} onClick={() => handleBillClick(billId)}>
                <td>{billId}</td>
                <td>{billQuantity}</td>
                <td>{billDetailStatus}</td>
                <td>{shipperId}</td>
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

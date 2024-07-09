import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function PaidBill() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [billDetails, setBillDetails] = useState([]);
  const { user } = useUser();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/bill/getBills', {
        params: { userID: user.UserID }
      });
      console.log("Fetched bills data:", response.data);
      setBills(response.data);
    } catch (error) {
      console.error("There was an error fetching data!", error);
    }
  }, [user.UserID]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const filteredBills = bills.filter(
    bill => bill.BillStatus === "Đã thanh toán"
  );

  const handleShowModal = async (bill) => {
    setSelectedBill(bill);
    try {
      const response = await axios.get('http://localhost:5000/bill/getBillDetail');
      const filteredDetails = response.data
        .filter(detail => detail.BillID === bill.BillID)
        .map(detail => ({
          ...detail,
          ShipperID: detail.ShipperID || 'Chưa giao hàng'
        }));
      setBillDetails(filteredDetails);
    } catch (error) {
      console.error("There was an error fetching bill details!", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
    setBillDetails([]);
  };

  return (
    <>
      <div>
        <h3>Xin chào {user.UserFirstName} {user.UserLastName}</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Ngày tạo đơn hàng</th>
            <th>Trạng thái hóa đơn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.BillID}</td>
                <td>{bill.BillDate}</td>
                <td>{bill.BillStatus}</td>
                <td>
                  <Button onClick={() => handleShowModal(bill)}>Xem chi tiết</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có dữ liệu để hiển thị</td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedBill && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết hóa đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã chi tiết đơn</th>
                  <th>Số lượng</th>
                  <th>Ngày đặt hàng</th>
                  <th>ShipperID</th>
                </tr>
              </thead>
              <tbody>
                {billDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.BillDetailID}</td>
                    <td>{detail.BillQuantity}</td>
                    <td>{detail.BillDetailDate}</td>
                    <td>{detail.ShipperID}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function DeliveryConfirm() {
  const [billDetails, setBillDetails] = useState([]);
  const { user } = useUser();

  const fetchBillDetails = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/bill/getBillDetail');
      console.log("Fetched bill details data:", response.data);
      setBillDetails(response.data);
    } catch (error) {
      console.error("There was an error fetching bill details data!", error);
    }
  }, []);

  useEffect(() => {
    fetchBillDetails();
    const intervalId = setInterval(() => {
      fetchBillDetails();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [fetchBillDetails]);

  const filteredBillDetails = billDetails.filter(
    detail => detail.BillDetailStatus === "Đã giao hàng"
  );

  return (
    <>
      <div>
        <h3>Xin chào {user.UserFirstName} {user.UserLastName}</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Sản phẩm</th>
            <th>Ngày vận chuyển</th>
            <th>Số lượng</th>
            <th>Trạng thái đơn hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBillDetails.length > 0 ? (
            filteredBillDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.BillDetailID}</td>
                <td>{detail.ProductID}</td>
                <td>{detail.BillDetailDate}</td>
                <td>{detail.BillQuantity}</td>
                <td>{detail.BillDetailStatus}</td>
                <td>
                  <Button variant="primary">Action</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có dữ liệu để hiển thị</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function AcceptBill() {
  const [bills, setBills] = useState([]);
  const { user } = useUser();

  const fetchData = useCallback(async () => {
    try {
      // Truyền userID vào query parameters
      const response = await axios.get('http://localhost:5000/bill/getBills', {
        params: { userID: user.UserID }  // Thêm userID vào query parameters
      });
      console.log("Fetched bills data:", response.data);  // Thêm log để kiểm tra dữ liệu
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

  console.log("Filtered bills data:", filteredBills);

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
          </tr>
        </thead>
        <tbody>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.BillID}</td>
                <td>{bill.BillDate}</td>
                <td>{bill.BillStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có dữ liệu để hiển thị</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

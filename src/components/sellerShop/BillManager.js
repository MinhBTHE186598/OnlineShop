import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Button, Image } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const BillManager = ({ id }) => {
  const [billDetails, setBillDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBillDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/seller/viewBillDetailForSeller/${id}`);
      setBillDetails(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillDetails();
  }, [id]);

  const handleApprove = async (billDetailID) => {
    try {
      await axios.put(`http://localhost:5000/bill/approve/${billDetailID}`);
      fetchBillDetails(); // Refresh bill details after approving
    } catch (err) {
      console.error("Error updating bill status:", err);
    }
  };

  const handleReject = async (billDetailID) => {
    try {
      await axios.delete(`http://localhost:5000/bill/delete/${billDetailID}`);
      fetchBillDetails(); // Refresh bill details after rejecting
    } catch (err) {
      console.error("Error deleting bill:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching bill details: {error.message}</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "start", marginBottom: "10px", justifyContent: "space-between" }}>
        <Form
          inline="true"
          style={{
            width: "33vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputGroup style={{ margin: 0 }}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => { setSearch(e.target.value) }}
            />
            <Button variant="primary" id="button-addon2">
              <FaMagnifyingGlass />
            </Button>
          </InputGroup>
        </Form>
      </div>
      <div style={{ overflowX: "auto", maxHeight: "500px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ minWidth: '120px' }}>Mã đơn hàng</th>
              <th style={{ minWidth: '150px' }}>Ngày tạo đơn</th>
              <th style={{ minWidth: '150px' }}>Trạng thái</th>
              <th style={{ minWidth: '200px' }}>Số lượng đặt mua</th>
              <th style={{ minWidth: '120px' }}>Mã sản phẩm</th>
              <th style={{ minWidth: '200px' }}>Tên sản phẩm</th>
              <th style={{ minWidth: '150px' }}>Hình ảnh</th>
              <th style={{ minWidth: '250px' }}>Số lượng còn trong kho</th>
              <th style={{ minWidth: '150px' }}>Giá</th>
              <th style={{ minWidth: '250px' }}>Địa chỉ khách hàng</th>
              <th style={{ minWidth: '150px' }}>Khách hàng</th>
              <th style={{ minWidth: '150px' }}>Số điện thoại</th>
              <th style={{ minWidth: '200px' }}>Email</th>
              <th style={{ minWidth: '250px' }}>Quản lý đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {billDetails.filter(detail => detail.ProductName.toLowerCase().includes(search.toLowerCase())).map((detail) => (
              <tr key={detail.BillDetailID}>
                <td>{detail.BillDetailID}</td>
                <td>{detail.BillDetailDate}</td>
                <td>{detail.BillDetailStatus}</td>
                <td>{detail.BillQuantity}</td>
                <td>{detail.ProductID}</td>
                <td>{detail.ProductName}</td>
                <td><Image src={detail.ProductPic} rounded style={{ width: '50px' }} /></td>
                <td>{detail.ProductQuantity}</td>
                <td>{detail.ProductPrice}</td>
                <td>{detail.UserAddress}</td>
                <td>{`${detail.UserFirstName} ${detail.UserLastName}`}</td>
                <td>{detail.UserPhone}</td>
                <td>{detail.UserEmail}</td>
                <td>
                  {detail.BillDetailStatus === 'Chưa xác nhận' && (
                    <>
                      <Button variant="success" size="sm" onClick={() => handleApprove(detail.BillDetailID)}>
                        Đồng ý
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(detail.BillDetailID)} style={{ marginLeft: '5px' }}>
                        Từ chối
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BillManager;

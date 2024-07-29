import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function BillDone() {
  const [billDetails, setBillDetails] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userToBillMap, setUserToBillMap] = useState({});
  const [productNames, setProductNames] = useState({});
  const [sellerAddresses, setSellerAddresses] = useState({});
  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetchData = useCallback(async () => {
    try {
      const [billDetailResponse, shipperResponse] = await Promise.all([
        axios.get("http://localhost:5000/bill/getBillDetail"),
        axios.get('http://localhost:5000/user/getShipper'),
      ]);

      setBillDetails(billDetailResponse.data);

      if (shipperResponse.data) {
        const currentUser = shipperResponse.data.find(shipper => shipper.UserID === user.UserID);
        if (currentUser) {
          setCurrentUserId(currentUser.ShipperID);
        } else {
          console.error('No ShipperID found for the current user!');
        }
      }

      const userToBillMapTemp = {};
      const productNamesTemp = {};
      const sellerAddressesTemp = {};

      await Promise.all(billDetailResponse.data.map(async (billDetail) => {
        const billID = billDetail.BillID;
        const billDetailID = billDetail.BillDetailID;

        const [userResponse, productResponse, sellerAddressResponse] = await Promise.all([
          axios.get(`http://localhost:5000/bill/getUserToBill?billID=${billID}`),
          axios.get(`http://localhost:5000/bill/getProductToBill?billDetailID=${billDetailID}`),
          axios.get(`http://localhost:5000/bill/getSellerAddress?billDetailID=${billDetailID}`),
        ]);

        userToBillMapTemp[billID] = userResponse.data;
        sellerAddressesTemp[billDetailID] = sellerAddressResponse.data[0]?.SellerAddress || 'Địa chỉ không có';

        if (productResponse.data.length > 0) {
          productNamesTemp[billDetailID] = productResponse.data[0].ProductName;
        }
      }));

      setUserToBillMap(userToBillMapTemp);
      setProductNames(productNamesTemp);
      setSellerAddresses(sellerAddressesTemp);
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

  const filteredBillDetails = billDetails.filter(
    billDetail => (billDetail.BillDetailStatus === "Đã nhận hàng" || billDetail.BillDetailStatus === "Đã giao hàng") && billDetail.ShipperID === currentUserId
  );


  const uniqueBillDetailIds = [...new Set(filteredBillDetails.map(billDetail => billDetail.BillDetailID))]
    .sort((a, b) => b - a);


  const totalPages = Math.ceil(uniqueBillDetailIds.length / itemsPerPage);


  const currentItems = uniqueBillDetailIds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div>
        <h3>ShipperID của bạn: {currentUserId ? currentUserId : 'Đang tải...'}</h3>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Tên người nhận</th>
              <th>Số lượng sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Ngày tạo đơn hàng</th>
              <th>Địa chỉ giao hàng</th>
              <th>Địa chỉ lấy hàng</th>
              <th>Trạng thái đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((billDetailId, index) => {
              const filteredBillDetailsForBillDetailId = filteredBillDetails.filter(billDetail => billDetail.BillDetailID === billDetailId);
              const billQuantity = filteredBillDetailsForBillDetailId.reduce((sum, billDetail) => sum + (billDetail.BillQuantity || 0), 0);
              const billDetailStatus = filteredBillDetailsForBillDetailId[0]?.BillDetailStatus;
              const billID = filteredBillDetailsForBillDetailId[0]?.BillID;
              const productName = productNames[billDetailId] || 'Tên sản phẩm không có';
              const userAddress = userToBillMap[billID]?.[0]?.UserAddress || 'Địa chỉ không có';
              const userFirstName = userToBillMap[billID]?.[0]?.UserFirstName || 'Tên không có';
              const userLastName = userToBillMap[billID]?.[0]?.UserLastName || '';
              const userFullName = `${userFirstName} ${userLastName}`;
              const sellerAddress = sellerAddresses[billDetailId] || 'Địa chỉ không có';
              const billDate = filteredBillDetailsForBillDetailId[0]?.BillDetailDate || 'Ngày không có';

              return (
                <tr key={index}>
                  <td>{billDetailId}</td>
                  <td>{userFullName}</td>
                  <td>{billQuantity}</td>
                  <td>{productName}</td>
                  <td>{billDate}</td>
                  <td>{userAddress}</td>
                  <td>{sellerAddress}</td>
                  <td>{billDetailStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function BillDone() {
  const [billDetails, setBillDetails] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userToBillMap, setUserToBillMap] = useState({});
  const [sellerToBillMap, setSellerToBillMap] = useState({});
  const [productNames, setProductNames] = useState({});
  const { user } = useUser();

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
      const sellerToBillMapTemp = {};
      const productNamesTemp = {};

      await Promise.all(billDetailResponse.data.map(async (billDetail) => {
        const billID = billDetail.BillID;
        const billDetailID = billDetail.BillDetailID;

        const [userResponse, sellerResponse, productResponse] = await Promise.all([
          axios.get(`http://localhost:5000/bill/getUserToBill?billID=${billID}`),
          axios.get(`http://localhost:5000/bill/getSellerToBill?productID=${billDetail.ProductID}`),
          axios.get(`http://localhost:5000/bill/getProductToBill?billDetailID=${billDetailID}`),
        ]);

        userToBillMapTemp[billID] = userResponse.data;
        sellerToBillMapTemp[billID] = sellerResponse.data;

        if (productResponse.data.length > 0) {
          productNamesTemp[billDetailID] = productResponse.data[0].ProductName;
        }
      }));

      setUserToBillMap(userToBillMapTemp);
      setSellerToBillMap(sellerToBillMapTemp);
      setProductNames(productNamesTemp);
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
            <th>Ngày tạo đơn hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Địa chỉ lấy hàng</th>
            <th>Trạng thái đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillDetailIds.map((billDetailId, index) => {
            const filteredBillDetailsForBillDetailId = filteredBillDetails.filter(billDetail => billDetail.BillDetailID === billDetailId);
            const billQuantity = filteredBillDetailsForBillDetailId.reduce((sum, billDetail) => sum + (billDetail.BillQuantity || 0), 0);
            const billDetailStatus = filteredBillDetailsForBillDetailId[0]?.BillDetailStatus;
            const billID = filteredBillDetailsForBillDetailId[0]?.BillID;
            const productName = productNames[billDetailId] || 'Tên sản phẩm không có';
            const userAddress = userToBillMap[billID]?.[0]?.UserAddress || 'Địa chỉ không có';
            const userFirstName = userToBillMap[billID]?.[0]?.UserFirstName || 'Tên không có';
            const userLastName = userToBillMap[billID]?.[0]?.UserLastName || '';
            const userFullName = `${userFirstName} ${userLastName}`;
            const sellerAddress = sellerToBillMap[billID]?.[0]?.SellerAddress || 'Địa chỉ không có';
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
    </>
  );
}

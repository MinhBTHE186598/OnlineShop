import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function BillDetailManager() {
  const [billDetails, setBillDetails] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billResponse = await axios.get("http://localhost:5000/bill/getBillDetail");
        setBillDetails(billResponse.data);

        const shipperResponse = await axios.get('http://localhost:5000/user/getShipper');
        if (shipperResponse.data) {
          const currentUser = shipperResponse.data.find(shipper => shipper.UserID === user.UserID);
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
    const intervalId = setInterval(fetchData, 10000); 

    return () => clearInterval(intervalId);
  }, [user.UserID]);

  const handleAcceptOrderClick = (billId) => {
    setSelectedBillId(billId);
    setShowConfirmModal(true);
  };

  const handleConfirmAcceptOrder = () => {
    axios.put(`http://localhost:5000/bill/updateBill`, {
      BillID: selectedBillId,
      ShipperID: currentUserId,
      BillDetailStatus: "Đang vận chuyển"
    })
      .then(response => {
        console.log('Update successful:', response.data);
        const updatedBillDetails = billDetails.map(billDetail => {
          if (billDetail.BillID === selectedBillId) {
            return {
              ...billDetail,
              ShipperID: currentUserId,
              BillDetailStatus: "Đang vận chuyển"
            };
          }
          return billDetail;
        });
        setBillDetails(updatedBillDetails);
        setShowConfirmModal(false);
      })
      .catch(error => {
        console.error("There was an error updating the bill details!", error);
      });
  };

  const handleSuccessDeliveryClick = (billId) => {
    setSelectedBillId(billId);
    setShowSuccessModal(true);  
  };

  const handleConfirmSuccessDelivery = () => {
    axios.put(`http://localhost:5000/bill/updateBill`, {
      BillID: selectedBillId,
      ShipperID: currentUserId,
      BillDetailStatus: "Đã nhận hàng"
    })
      .then(response => {
        console.log('Update successful:', response.data);
        const updatedBillDetails = billDetails.map(billDetail => {
          if (billDetail.BillID === selectedBillId) {
            return {
              ...billDetail,
              ShipperID: currentUserId,
              BillDetailStatus: "Đã nhận hàng"
            };
          }
          return billDetail;
        });
        setBillDetails(updatedBillDetails);
        setShowSuccessModal(false);  
      })
      .catch(error => {
        console.error("There was an error updating the bill details!", error);
      });
  };

  const uniqueBillIds = [...new Set(billDetails
    .filter(billDetail => billDetail.BillDetailStatus === "Đã xác nhận" || billDetail.BillDetailStatus === "Đang vận chuyển")
    .map(billDetail => billDetail.BillID)
  )];

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
            <th>Địa chỉ nhận hàng</th>  
            <th>Trạng thái đơn hàng</th>
            <th>Shipper ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueBillIds.map((billId, index) => {
            const filteredBillDetails = billDetails.filter(billDetail => billDetail.BillID === billId);
            const billQuantity = filteredBillDetails.length;
            const billDetailStatus = filteredBillDetails[0]?.BillDetailStatus;
            const shipperId = filteredBillDetails[0]?.ShipperID || 'Vẫn chưa xác nhận';
            const userAddress = filteredBillDetails[0]?.UserAddress || 'Địa chỉ không có'; 
            return (
              <tr key={index}>
                <td>{billId}</td>
                <td>{billQuantity}</td>
                <td>{userAddress}</td>  
                <td>{billDetailStatus}</td>
                <td>{shipperId}</td>
                <td>
                  {billDetailStatus === "Đã xác nhận" && (
                    <Button variant="success" onClick={() => handleAcceptOrderClick(billId)}>
                      Nhận đơn
                    </Button>
                  )}
                  {billDetailStatus === "Đang vận chuyển" && currentUserId === shipperId && (
                    <Button variant="info" onClick={() => handleSuccessDeliveryClick(billId)}>
                      Giao hàng thành công
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận nhận đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn nhận đơn hàng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmAcceptOrder}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận giao hàng thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn đánh dấu đơn hàng này là đã nhận hàng không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmSuccessDelivery}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

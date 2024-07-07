import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function Notification() {
    const navigate = useNavigate();
    const { user, isLogin } = useUser();
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const fetchNotifications = async () => {
        if (user && user.UserID) {
            try {
                const response = await axios.get(`http://localhost:5000/noti/getNoti`, {
                    params: { userID: user.UserID },
                });
                const filteredNotifications = Array.isArray(response.data)
                    ? response.data.filter(notification => notification.UserID === user.UserID)
                    : [];
                setNotifications(filteredNotifications);
            } catch (error) {
                console.error(error);
                setNotifications([]);
            }
        }
    };

    useEffect(() => {
        if (!isLogin) {
            alert('Bạn cần đăng nhập để thực hiện chức năng này!');
            navigate('/login');
        } else {
            fetchNotifications();
        }
    }, [isLogin, navigate, user]);

    const handleShowDetails = (notification) => {
        setSelectedNotification(notification);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setShowConfirmModal(false);
    };

    const handleDeleteNotification = async () => {
        if (selectedNotification) {
            try {
                await axios.delete(`http://localhost:5000/noti/deletenoti/${selectedNotification.NotificationID}`);
                setNotifications(notifications.filter(noti => noti.NotificationID !== selectedNotification.NotificationID));
                setShowModal(false);
                setShowConfirmModal(false);
            } catch (error) {
                console.error(error);
                alert('Không thể xóa thông báo');
            }
        }
    };

    const handleShowConfirmModal = () => {
        setShowConfirmModal(true);
    };

    return (
        <div style={{ width: '100vw', marginTop: '10vh', padding: '5vh 0', backgroundColor: '#0d6efd' }}>
            <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Thông báo của {user.UserFirstName} {user.UserLastName}</h1>
                {notifications.length === 0 ? (
                    <div style={{ height: '45vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                        <h3>Chưa có thông báo</h3>
                        <Button variant="primary" onClick={() => navigate('/home')}>Về trang chủ</Button>
                    </div>
                ) : (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Tiêu đề</th>
                                    <th style={{ width: '300px' }}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.map((notification) => (
                                    <tr key={notification.NotificationID} style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 'large' }}>
                                        <td>{notification.NotificationHeader}</td>
                                        <td>
                                            <Button onClick={() => handleShowDetails(notification)} style={{ marginRight: '10px' }}>
                                                Xem chi tiết
                                            </Button>
                                            <Button 
                                                variant="danger"
                                                onClick={() => {
                                                    setSelectedNotification(notification);
                                                    handleShowConfirmModal();
                                                }}
                                            >
                                                Đã đọc
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedNotification && (
                        <div>
                            <h4>{selectedNotification.NotificationHeader}</h4>
                            <p>{selectedNotification.NotificationText}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa thông báo này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteNotification}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Notification;

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function BillDetailModal({ show, onHide, bill }) {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Chi tiết sản phẩm</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.map(item => (
                            <tr key={item.BillDetailID}>
                                <td><img src={item.ProductPic} alt={item.ProductName} style={{ width: '50px' }} /></td>
                                <td>{item.ProductName}</td>
                                <td>{item.ProductQuantity}</td>
                                <td>{item.ProductPrice}</td>
                                <td>{item.ProductDescription}</td>
                                <td>{item.BillDetailStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

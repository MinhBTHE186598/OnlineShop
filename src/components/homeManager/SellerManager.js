import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import SellerInfoModal from './SellerInfoModal';
import EditSellerModal from './EditSellerModal';


function SellerManager() {
    const [modalShow, setModalShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [sellerList, setSellerList] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/seller/get")
            .then(response => response.json())
            .then(data => setSellerList(data))
            .catch(error => console.error('Error fetching seller data:', error));
    }, []);

    const handleShowEdit = () => setShowEdit(true);

    const handleUpdate = (updatedSeller) => {
        setSellerList(sellerList.map(seller =>
            seller.SellerID === updatedSeller.SellerID ? updatedSeller : seller
        ));
        setShowEdit(false);
    };

    const handleViewSeller = (seller) => {
        setSelectedSeller(seller);
        setModalShow(true);
    };

    const handleEditSeller = (seller) => {
        setSelectedSeller(seller);
        handleShowEdit();
    };
  
    return (
        <div id="userManager-wrapper">
            <Row>
                <ListGroup horizontal className="w-100">
                    <Col sm={1}>SellerID</Col>
                    <Col sm={2}>SellerName</Col>
                    <Col sm={2}>SellerAddress</Col>
                    <Col sm={3}>UserID</Col>
                    <Col sm={2}>Actions</Col>
                </ListGroup>
            </Row>
            <Row>
                {sellerList.map((seller) => (
                    <ListGroup key={seller.SellerID} horizontal className="my-2 w-100">
                        <Col sm={1}><ListGroup.Item>{seller.SellerID}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item>{seller.SellerName}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item>{seller.SellerAddress}</ListGroup.Item></Col>
                        <Col sm={3}><ListGroup.Item>{seller.UserID}</ListGroup.Item></Col>
                        <Col sm={2}>
                            <ListGroup.Item action variant="secondary" onClick={() => handleEditSeller(seller)}>Update</ListGroup.Item>
                            <ListGroup.Item action variant="secondary" onClick={() => handleViewSeller(seller)}>View</ListGroup.Item>
                        </Col>
                    </ListGroup>
                ))}
            </Row>
            {selectedSeller && (
                <>
                    <EditSellerModal
                        show={showEdit}
                        onHide={() => setShowEdit(false)}
                        Seller={selectedSeller}
                        onUpdate={handleUpdate}
                    />
                    <SellerInfoModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        seller={selectedSeller}
                    />
                </>
            )}
        </div>
    );
}

export default SellerManager;

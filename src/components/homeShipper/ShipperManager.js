import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ShipperInfo from './ShipperInfo';
import EditShipper from './EditShipper';


function ShipperManager() {
    const [modalShow, setModalShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [shipperList, setShipperList] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/shipper/get")
            .then(response => response.json())
            .then(data => setShipperList(data))
            .catch(error => console.error('Error fetching shipper data:', error));
    }, []);

    const handleShowEdit = () => setShowEdit(true);

    const handleUpdate = (updatedShipper) => {
        setShipperList(shipperList.map(shipper =>
            shipper.ShipperID === updatedShipper.ShipperID ? updatedShipper : shipper
        ));
        setShowEdit(false);
    };  

    const handleViewShipper = (shipper) => {
        setSelectedShipper(shipper);
        setModalShow(true);
    };

    const handleEditShipper = (shipper) => {
        setSelectedShipper(shipper);
        handleShowEdit();
    };
  
    return (
        <div id="userManager-wrapper">
            <Row>
                <ListGroup horizontal className="w-100">
                    <Col sm={1}>ShipperID</Col>
                    
                    <Col sm={3}>UserID</Col>
                    <Col sm={2}>Actions</Col>
                </ListGroup>
            </Row>
            <Row>
                {shipperList.map((shipper) => (
                    <ListGroup key={shipper.ShipperID} horizontal className="my-2 w-100">
                        <Col sm={1}><ListGroup.Item>{shipper.ShipperID}</ListGroup.Item></Col>
                        <Col sm={3}><ListGroup.Item>{shipper.UserID}</ListGroup.Item></Col>
                        <Col sm={2}>
                            <ListGroup.Item action variant="secondary" onClick={() => handleEditShipper(shipper)}>Update</ListGroup.Item>
                            <ListGroup.Item action variant="secondary" onClick={() => handleViewShipper(shipper)}>View</ListGroup.Item>
                        </Col>
                    </ListGroup>
                ))}
            </Row>
            {selectedShipper && (
                <>
                    <EditShipper
                        show={showEdit}
                        onHide={() => setShowEdit(false)}
                        Seller={selectedShipper}
                        onUpdate={handleUpdate}
                    />
                    <ShipperInfo
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        seller={selectedShipper}
                    />
                </>
            )}
        </div>
    );
}

export default ShipperManager;

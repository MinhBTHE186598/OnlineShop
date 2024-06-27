import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ShipperInfo from './ShipperInfo';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function ShipperManager() {
    const [modalShow, setModalShow] = useState(false);
    const [shipperList, setShipperList] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/user/getShipper")
            .then(response => response.json())
            .then(data => setShipperList(data))
            .catch(error => console.error('Error fetching shipper data:', error));
    }, []);


    const handleViewShipper = (shipper) => {
        setSelectedShipper(shipper);
        setModalShow(true);
    };


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Shipper ID</th>
                        <th>UserID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shipperList.map((shipper) => (
                        <tr key={shipper.ShipperID}>
                            <td>{shipper.ShipperID}</td>
                            <td>{shipper.UserID}</td>
                            <td>
                                
                                <Button size="sm" variant="info" onClick={() => handleViewShipper(shipper)}>
                                    View
                                </Button>
                                <Button size="sm" variant="danger" >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedShipper && (
                <>

                    <ShipperInfo
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        seller={selectedShipper}
                    />
                </>
            )}

        </>
    );
}

export default ShipperManager;

import React, { useEffect, useState } from 'react';
import ShipperInfo from './ShipperInfo';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ConfirmModal from './ConfirmModal';  // Make sure to import ConfirmModal


function ShipperManager() {
    const [modalShow, setModalShow] = useState(false);
    const [shipperList, setShipperList] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState(null);
    const [shipperIDToDelete, setShipperIDToDelete] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

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

    const handleDeleteShipper = async (ShipperID) => {
        try {
          const response = await axios.delete(`http://localhost:5000/shipper/delete/${ShipperID}`);
          if (response.status === 200) {
            setShipperList(shipperList.filter(shipper => shipper.ShipperID !== ShipperID));
            console.log('Shipper deleted successfully');
          } else {
            console.log('Error deleting shipper');
          }
        } catch (error) {
          console.error('Error', error);
        }
        setShowConfirm(false);
      };
    
      const confirmDeleteShipper = (ShipperID) => {
        setShipperIDToDelete(ShipperID);
        setShowConfirm(true);
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
                                <Button size="sm" variant="danger" onClick={() => confirmDeleteShipper(shipper.ShipperID)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedShipper && (
                <ShipperInfo
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    shipper={selectedShipper}
                />
            )}
            <ConfirmModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={() => handleDeleteShipper(shipperIDToDelete)}
                obj="shipper"
            />
        </>
    );
}

export default ShipperManager;

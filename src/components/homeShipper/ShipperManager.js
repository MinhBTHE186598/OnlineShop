import React, { useEffect, useState } from 'react';
import ShipperInfo from './ShipperInfo';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Navigate } from 'react-router-dom';
import {useUser} from '../context/UserContext';



function ShipperManager() {
    const { userRole, isLogin } = useUser();
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

    if (!isLogin || userRole !== 'Shipper') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Shipper ID</th>
                        <th>UserID</th>
                    </tr>
                </thead>
                <tbody>
                    {shipperList.map((shipper) => (
                        <tr key={shipper.ShipperID}>
                            <td>{shipper.ShipperID}</td>
                            <td>{shipper.UserID}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </>
    );
}

export default ShipperManager;

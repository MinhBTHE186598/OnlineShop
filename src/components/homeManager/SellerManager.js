import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SellerInfoModal from './SellerInfoModal';
import ConfirmModal from './ConfirmModal';


function UserManager() {
    const [modalShow, setModalShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [sellerList, setSellerList] = useState([{}])
    const [sellerID, setSellerID] = useState({})

    useEffect(() => {
        fetch("http://localhost:5000/seller/get").then(
            response => response.json()
        ).then(
            data => {
                setSellerList(data)
            }
        )
    }, [])
    const handleModel = (ID) => {
        try {
            setSellerID(ID)
            setModalShow(true)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="userManager-wrapper">
            <Row>
                <ListGroup sm={11} horizontal>
                    <Col sx={1}>SellerID</Col>
                    <Col sm={2}>SellerName</Col>
                    <Col sm={2}>SellerAddress</Col>
                    <Col sm={3}>UserID</Col>
                    <Col sm={3}>SellerManagerID</Col>
                    <Col sm={1}>Action</Col>
                </ListGroup>
            </Row>
            <Row>
                {sellerList.map((seller) => (
                    <ListGroup key={seller.sellerID} horizontal className="my-2">
                        <Col xs={1}><ListGroup.Item >{seller.SellerID}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item>{seller.SellerName}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item >{seller.SellerAddress}</ListGroup.Item></Col>
                        <Col sm={3}><ListGroup.Item >{seller.UserID}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item >{seller.SellerManagerID}</ListGroup.Item></Col>
                        
                        <Col sm={1}><ListGroup.Item action variant='secondary' onClick={() => { handleModel(seller) }} >View</ListGroup.Item></Col>
                    </ListGroup>
                ))}
                <SellerInfoModal show={modalShow} onHide={() => setModalShow(false)} seller={sellerID} />
                
            </Row>
        </div>
    )
}

export default UserManager;
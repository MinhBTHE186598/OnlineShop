import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';


function EditSellerModal({ show, onHide, Seller, onUpdate }) {
    const [sellerManagerID, setSellerManagerID] = useState(Seller.SellerManagerID)
    const [sellerID, setSellerID] = useState(Seller.SellerID)
    const [sellerName, setSellerName] = useState(Seller.SellerName)
    const [sellerAddress, setSellerAddress] = useState(Seller.SellerAddress)
    const [userID, setUserID] =useState(Seller.UserID)
    useEffect(()=>{
        setSellerManagerID(Seller.SellerManagerID)
        setSellerID(Seller.SellerID)
        setSellerName(Seller.SellerName)
        setSellerAddress(Seller.SellerAddress)
        setUserID(Seller.UserID)
    },[Seller.SellerManagerID,Seller.SellerID,Seller.SellerName,Seller.SellerAddress,Seller.UserID])
    let selleru = {
        SellerManagerID: sellerManagerID,
        SellerID: sellerID,
        SellerName: sellerName,
        SellerAddress: sellerAddress,
        UserID: userID
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/seller/update/' + Seller.SellerID, {
                sellerManagerID,
                sellerID,
                sellerName,
                sellerAddress,
                userID
            });
            //console.dir(selleru)
            onUpdate(selleru)
            if (response.status === 200) {
                console.log('Seller edited successfully');
            } else {
                console.log('Error editing seller');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>SellerName</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter SellerName"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                    />
                    <Form.Label>SellerAddress</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter SellerAddress"
                        value={sellerAddress}
                        onChange={(e) => setSellerAddress(e.target.value)}
                    />
                </Form>
                    
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditSellerModal;
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

export default function ResponseModal({ Request, show, onHide,handleChange }) {
    const [Response, setResponse] = useState('')
    const [admins, setAdmins] = useState([{}]);
    const { user} = useUser();

    useEffect(() => {
        fetch("http://localhost:5000/admin/get").then(
          response => response.json()
        ).then(
          data => {
            setAdmins(data)
          }
        )
      }, [])

      function getAdminID(id) {
        let intID = +id;
        let admin = admins.find(admin => admin.UserID === intID)
        return admin ? admin.AdminID : 'Admin not found'
      }

    const handleResponse = async () => {
        try {
            let ResponseID = Request.SupportID;
            console.log(user.UserID)
            let AdminID = getAdminID(user.UserID)
            console.log(AdminID)
            const res = await axios.put('http://localhost:5000/contact/response', {
                AdminID,
                Response,
                ResponseID,
            });
            if (res.status === 200) {
                console.log('Responsed successfully');
            } else {
                console.error('Failed to response');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleResponse()
        onHide()
        console.log(Request.SupportID)
        handleChange(Request.SupportID,Response)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>User:</Form.Label>
                    <Form.Control type='text' disabled value={Request.UserAccountName + ' (' + Request.UserFirstName + ' ' + Request.UserLastName + ')'} />
                    <Form.Label>Question:</Form.Label>
                    <Form.Control type='text' disabled value={Request.SupportRequest} />
                    <Form.Label>Response:</Form.Label>
                    <Form.Control type='text' required defaultValue={Request.SupportResponse} onChange={(e) => setResponse(e.target.value)} style={{marginBottom:'10px'}}/>
                    <Button variant='primary' type="submit" >
                        Confirm
                    </Button>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
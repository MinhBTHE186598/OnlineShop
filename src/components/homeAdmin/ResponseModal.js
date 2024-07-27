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

    const addnoti = async (e) => {
        try {
            const UserID = Request.UserID;
            let NotiHeader="Phản hồi trợ giúp"
            let NotiBody=Response;
            const response = await axios.post('http://localhost:5000/noti/postnoti', {
                UserID,
                NotiHeader,
                NotiBody
            });
            if (response.status === 200) {
                console.log('Noti added successfully');
            } else {
                console.error('Failed to add noti');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
            let AdminID = getAdminID(user.UserID)
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
        addnoti()
        onHide()
        console.log(Request.SupportID)
        handleChange(Request.SupportID,Response)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Phản hồi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Người dùng:</Form.Label>
                    <Form.Control type='text' disabled value={Request.UserAccountName + ' (' + Request.UserFirstName + ' ' + Request.UserLastName + ')'} />
                    <Form.Label>Câu hỏi:</Form.Label>
                    <Form.Control type='text' disabled value={Request.SupportRequest} />
                    <Form.Label>Phản hồi:</Form.Label>
                    <Form.Control type='text' required defaultValue={Request.SupportResponse} onChange={(e) => setResponse(e.target.value)} style={{marginBottom:'10px'}}/>
                    <Button variant='primary' type="submit" >
                        Xác nhận
                    </Button>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
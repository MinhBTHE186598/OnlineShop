import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";

function EditProfileModal({ show, onHide }) {
    const { user, setUser, setUserRole, setIsLogin } = useUser();
    const [Password, setPassword] = useState("");
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");


    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={user.UserAccountName} disabled readOnly />
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserPassword} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserFirstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserLastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserAddress} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserEmail} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserPhone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {}}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProfileModal;
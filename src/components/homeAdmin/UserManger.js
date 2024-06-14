import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserIModal from './UserInfoModal';
import ConfirmModal from './ConfirmModal';


function UserManager() {
    const [modalShow, setModalShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [userList, setUserList] = useState([{}])
    const [userInf, setUserInf] = useState({})

    useEffect(() => {
        fetch("http://localhost:5000/user/get").then(
            response => response.json()
        ).then(
            data => {
                setUserList(data)
            }
        )
    }, [])

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/user/delete/${id}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
                // Handle success (e.g., update the UI)
            } else {
                console.error('Failed to delete user');
                // Handle failure
            }
            setUserList(userList.filter((user) => user.UserID !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleDelete = (user) => {
        try{
            setUserInf(user)
            setConfirmShow(true)
        } catch (error) {
            console.error(error);
        }
    }

    const handleModel = (user) => {
        try {
            setUserInf(user)
            setModalShow(true)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="userManager-wrapper">
            <Row>
                <ListGroup sm={11} horizontal>
                    <Col sx={1}>ID</Col>
                    <Col sm={2}>UserName</Col>
                    <Col sm={2}>Password</Col>
                    <Col sm={3}>Full name</Col>
                    <Col sm={3}>Contact Number</Col>
                    <Col sm={1}>Action</Col>
                </ListGroup>
            </Row>
            <Row>
                {userList.map((user) => (
                    <ListGroup key={user.UserID} horizontal className="my-2">
                        <Col xs={1}><ListGroup.Item >{user.UserID}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item>{user.UserAccountName}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item >{user.UserPassword}</ListGroup.Item></Col>
                        <Col sm={3}><ListGroup.Item >{user.UserFirstName + " " + user.UserLastName}</ListGroup.Item></Col>
                        <Col sm={2}><ListGroup.Item >{user.UserPhone}</ListGroup.Item></Col>
                        <Col sm={1}><ListGroup.Item action variant='secondary' onClick={() => { handleDelete(user.UserID) }} >Delete</ListGroup.Item></Col>
                        <Col sm={1}><ListGroup.Item action variant='secondary' onClick={() => { handleModel(user) }} >View</ListGroup.Item></Col>
                    </ListGroup>
                ))}
                <UserIModal show={modalShow} onHide={() => setModalShow(false)} user={userInf} />
                <ConfirmModal show = {confirmShow} onHide={()=>setConfirmShow(false)} onConfirm={() => { deleteUser(userInf) }} obj="user"/>
            </Row>
        </div>
    )
}

export default UserManager;
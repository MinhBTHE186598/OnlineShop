import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserManager() {

    const [userList, setUserList] = useState ([{}])

    useEffect(()=>{
        fetch("/user/get").then(
            response => response.json()
        ).then(
            data => {
                setUserList(data)
            }
        )
    },[])

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
            setUserList(userList.filter((user)=> user.UserID !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Row>
            {userList.map((user) => (
                <ListGroup key={user.UserID} horizontal className="my-2">
                    <Col sm={3}><ListGroup.Item >{user.UserID}</ListGroup.Item></Col>
                    <Col sm={6}><ListGroup.Item >{user.UserFirstName + " " + user.UserLastName}</ListGroup.Item></Col>
                    <Col sm={2}><ListGroup.Item action onClick={() => { deleteUser(user.UserID) }} >Delete</ListGroup.Item></Col>
                </ListGroup>
            ))}
        </Row>
    )
}

export default UserManager;
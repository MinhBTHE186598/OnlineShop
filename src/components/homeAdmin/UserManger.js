import { useEffect, useState } from 'react';
import axios from 'axios';
import UserIModal from './UserInfoModal';
import ConfirmModal from './ConfirmModal';
import Table from 'react-bootstrap/Table';
import { Toast } from 'react-bootstrap';

function UserManager() {
    const [modalShow, setModalShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [userList, setUserList] = useState([{}])
    const [userInf, setUserInf] = useState({})

    const buttonStyle = {
        cursor: 'pointer',
        color: 'blue',
        textDecoration: 'underline'
    };

    const buttonHoverStyle = {
        color: 'red'
    };
    const [hoveredCell, setHoveredCell] = useState(null);

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
    const handleDelete = (userID) => {
        try {
            setUserInf(userID)
            if (userID === 23 || userID === 24) {
                Toast("cannot delete admin");
            } else {
                setConfirmShow(true)
            }
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
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Full name</th>
                    <th>Contact Number</th>
                    <th colSpan={2} style={{}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((user) => (
                    <tr key={user.UserID}>
                        <td>{user.UserID}</td>
                        <td>{user.UserAccountName}</td>
                        <td>{user.UserPassword}</td>
                        <td>{user.UserFirstName + " " + user.UserLastName}</td>
                        <td>{user.UserPhone}</td>
                        <td
                            style={hoveredCell === `delete-${user.UserID}` ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                            onMouseEnter={() => setHoveredCell(`delete-${user.UserID}`)}
                            onMouseLeave={() => setHoveredCell(null)}
                            action onClick={() => { handleDelete(user.UserID) }}>Delete</td>
                        <td
                            style={hoveredCell === `view-${user.UserID}` ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                            onMouseEnter={() => setHoveredCell(`view-${user.UserID}`)}
                            onMouseLeave={() => setHoveredCell(null)}
                            action onClick={() => { handleModel(user) }}>View</td>
                    </tr>
                ))}
                <UserIModal show={modalShow} onHide={() => setModalShow(false)} user={userInf} />
                <ConfirmModal show={confirmShow} onHide={() => setConfirmShow(false)} onConfirm={() => { deleteUser(userInf) }} obj="user" />
            </tbody>
        </Table>
    )
}

export default UserManager;
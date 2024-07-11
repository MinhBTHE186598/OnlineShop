import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function BillManager({ id }) {
    const [bills, setBills] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/seller/listBillForSeller/${id}`)
            .then(response => response.json())
            .then(data => {
                setBills(data);
            })
            .catch(error => {
                console.error("Error fetching bills:", error);
            });
    }, [id]);

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "start", marginBottom: "10px", justifyContent: "space-between" }}>
                <Form
                    inline="true"
                    style={{
                        width: "33vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <InputGroup style={{ margin: 0 }}>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm đơn"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <Button variant="primary" id="button-addon2">
                            <FaMagnifyingGlass />
                        </Button>
                    </InputGroup>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Đơn</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.filter(bill =>
                        (bill.UserFirstName + ' ' + bill.UserLastName).toLowerCase().includes(search.toLowerCase())
                    ).map(bill => (
                        <tr key={bill.BillID}>
                            <td>{bill.BillID}</td>
                            <td>{bill.UserFirstName} {bill.UserLastName}</td>
                            <td>{bill.UserAddress}</td>
                            <td>{bill.UserPhone}</td>
                            <td>{bill.UserEmail}</td>
                            <td>
                                <DropdownButton
                                    size="sm"
                                    variant="secondary"
                                    title="Chọn"
                                >
                                    <Dropdown.Item eventKey="4" onClick={() => { navigate(`/bill/${bill.BillID}`) }}>Tới trang đơn</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

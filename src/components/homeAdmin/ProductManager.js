import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';



export default function ProductManager() {
    const [cid, setcid] = useState('0');
    const [products, setProducts] = useState([{}])
    const [categories, setCategories] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);
    const [filter, setFilter] = useState({
        category: Number(cid) === 0 ? '%' : cid,
        order: 'ProductID asc',
        range: [0, 100000000],
        seller: '%',
        status:'%',
        quantity:'%'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetch("http://localhost:5000/category/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:5000/product/getAllFilter", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filter)
                });
                const data = await response.json();
                setProducts(data);
                console.log(filter);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [filter]);

    useEffect(() => {
        fetch("http://localhost:5000/product/getAll")
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    const [sortTitle, setSortTitle] = useState('Sắp xếp');
    const [sortPrice, setSortPrice] = useState('Lọc theo giá');
    const [sortSeller, setSortSeller] = useState('Lọc theo người bán');

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Sold</th>
                    <th>Saler</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr>
                        <td><Image src={product.ProductPic} rounded style={{ width: "33px" }} />{product.ProductName}</td>
                        <td>{product.Sold !== null ? (product.Sold) : (0)}</td>
                        <td>{product.SellerName}</td>
                        <td>{product.CategoryName}</td>
                        <td>{product.ProductQuantity}</td>
                        <td style={{ color: product.ProductStatus === 'Đã xác thực' ? 'green' : 'red' }}>{product.ProductStatus}</td>
                        <td>{product.ProductPrice}</td>
                        <td>
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Action"
                            >
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
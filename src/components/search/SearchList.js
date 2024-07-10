import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchPagination from './SearchPagination';
import SearchPaginationBar from './SearchPaginationBar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios'

const containerStyle = {
    width: '100%',
    margin: "50px 0",
    display: 'flex',
    justifyContent: 'space-around',
}

const FormStyle = {
    fontSize: 'larger',
    width: '20%',
    height: '50%',
    padding: '20px',
    color: 'black',
    border: 'solid 1px black',
    borderRadius: '10px'
}

const listStyle = {
    width: '70%',
    border: 'solid 1px black',
    borderRadius: '10px',
    overflow: 'hidden',
}

const filterStyle = {
    width: '100%',
    height: '5em',
    backgroundColor: '#212529',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
}

function SearchList(props) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const { keyword } = props;
    const [filter, setFilter] = useState({
        category: '%',
        order: 'ProductID asc',
        range: [0, 100000000],
        name: '%' + keyword + '%',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await fetch("http://localhost:5000/category/getCategories");
                const dataCategory = await responseCategory.json();
                setCategories(dataCategory);

                const responseSearch = await fetch("http://localhost:5000/product/search", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filter)
                });
                const dataSearch = await responseSearch.json();
                setProducts(dataSearch);
                console.log(filter);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [filter]);

    const [sortTitle, setSortTitle] = React.useState('Sắp xếp');
    const [sortPrice, setSortPrice] = React.useState('Lọc theo giá');


    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div style={{ marginTop: '10vh', paddingTop: '5vh', minHeight: '60vh' }}>
            <h1 style={{ textAlign: 'center' }}>Kết quả tìm kiếm</h1>
            <h2 style={{ textAlign: 'center' }}>Tìm thấy {products.length} sản phẩm với từ khóa '{keyword}'</h2>
            <div style={containerStyle}>
                <Form style={FormStyle}>
                    <h2>Danh mục sản phẩm</h2>
                    <Form.Check
                        type="radio"
                        label="Tất cả sản phẩm"
                        name='category'
                        value={"%"}
                        onClick={handleInputChange}
                        defaultChecked
                    />
                    {categories.map((category) => (
                        <Form.Check
                            key={category.CategoryID}
                            type="radio"
                            label={category.CategoryName}
                            name='category'
                            value={category.CategoryID}
                            onClick={handleInputChange}
                        />
                    ))}
                </Form>


                <div style={listStyle}>
                    <div style={filterStyle}>
                        <Dropdown style={{ margin: '0 20px 0 40px' }} onSelect={(e) => {
                            handleInputChange({ target: { name: 'order', value: e } });
                        }}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {sortTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey='ProductName asc' onClick={() => setSortTitle('Tên A-Z')}>Tên A-Z</Dropdown.Item>
                                <Dropdown.Item eventKey='ProductName desc' onClick={() => setSortTitle('Tên Z-A')}>Tên Z-A</Dropdown.Item>
                                <Dropdown.Item eventKey='ProductPrice asc' onClick={() => setSortTitle('Giá thấp đến cao')}>Giá thấp đến cao</Dropdown.Item>
                                <Dropdown.Item eventKey='ProductPrice desc' onClick={() => setSortTitle('Giá cao đến thấp')}>Giá cao đến thấp</Dropdown.Item>
                                <Dropdown.Item eventKey='ProductID asc' onClick={() => setSortTitle('Sắp xếp')}>Bỏ chọn</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown style={{ margin: '0 20px' }} onSelect={(e, val) => {
                            const range = e.split(' and ').map(Number);
                            handleInputChange({ target: { name: 'range', value: range } });
                        }}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {sortPrice}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey='0 and 25000' onClick={() => setSortPrice('Từ 0 - 25,000 VND')}>Từ 0 - 25,000 VND</Dropdown.Item>
                                <Dropdown.Item eventKey='25000 and 50000' onClick={() => setSortPrice('Từ 25,000 - 50,000 VND')}>Từ 25,000 - 50,000 VND</Dropdown.Item>
                                <Dropdown.Item eventKey='50000 and 75000' onClick={() => setSortPrice('Từ 50,000 - 75,000 VND')}>Từ 50,000 - 75,000 VND</Dropdown.Item>
                                <Dropdown.Item eventKey='75000 and 100000' onClick={() => setSortPrice('Từ 75,000 - 100,000 VND')}>Từ 75,000 - 100,000 VND</Dropdown.Item>
                                <Dropdown.Item eventKey='100000 and 100000000' onClick={() => setSortPrice('Từ 100,000 trở lên')}>Từ 100,000 trở lên</Dropdown.Item>
                                <Dropdown.Item eventKey='0 and 100000000' onClick={() => setSortPrice('Lọc theo giá')}>Bỏ chọn</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <SearchPagination products={currentProducts} />
                        <SearchPaginationBar itemsPerPage={itemsPerPage} totalItems={products.length} paginate={paginate} currentPage={currentPage} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchList
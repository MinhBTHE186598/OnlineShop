import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ApproveProductModal from './ApproveProductModal';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import FilterCollapse from './FilterCollapse';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

export default function ProductManager({ id }) {
  const [products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIDToDelete, setProductIDToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    category: '%',
    order: 'ProductID asc',
    price: [0, 100000000],
    seller: '%',
    status: 'Chờ xác thực'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    fetchProductsBySeller();
  }, [id]);

  const fetchProductsBySeller = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/getWhiteListProductsBySeller/${id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleApprove = (approvedProduct) => {
    setProducts(products.map(product =>
      product.ProductID === approvedProduct.ProductID ? approvedProduct : product
    ));
    setShowEdit(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  const handleDeleteProduct = async (productID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/delete/${productID}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.ProductID !== productID));
        console.log('Product deleted successfully');
      } else {
        console.log('Error deleting product');
      }
    } catch (error) {
      console.error('Error', error);
    }
    setShowConfirm(false);
  };

  const confirmDeleteProduct = (productID) => {
    setProductIDToDelete(productID);
    setShowConfirm(true);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ height: "70vh" }}>
      <Row>
        <Col>
          <InputGroup>
            <Form.Control
              placeholder="Tìm theo tên sản phẩm"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary">
              <FaMagnifyingGlass />
            </Button>
          </InputGroup>
        </Col>
        <Col>
          
        </Col>
        <FilterCollapse open={open} handleInputChange={handleInputChange} />
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Mô tả</th>
            <th>ID người bán</th>
            <th>Tồn kho</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.filter(product => 
            product.ProductName.toLowerCase().includes(search.toLowerCase())
          ).map((product, index) => (
            <tr key={index}>
              <td>
                <Image src={product.ProductPic} rounded style={{ width: "33px" }} />
                {product.ProductName}
              </td>
              <td>{product.ProductDescription}</td>
              <td>{product.SellerID}</td>
              <td>{product.ProductQuantity}</td>
              <td>{product.ProductPrice}</td>
              <td>{product.ProductStatus}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEditProduct(product)}>
                  Đồng ý
                </Button>
                <Button size="sm" variant="danger" onClick={() => confirmDeleteProduct(product.ProductID)}>
                  Từ chối
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
          <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {selectedProduct && (
        <ApproveProductModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          Product={selectedProduct}
          onUpdate={handleApprove}
        />
      )}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => handleDeleteProduct(productIDToDelete)}
        obj="product"
      />
    </div>
  );
}

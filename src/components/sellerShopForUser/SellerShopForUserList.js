import React, { useEffect, useState } from 'react';
import ProductCardSmall from '../common/ProductCardSmall';
import SellerShopPagination from './SellerShopPagination';
import SellerShopPaginationBar from './SellerShopPaginationBar';
import axios from 'axios';

function SellerShopForUserList(props) {
  const sellerID = props.id;
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(5);
  useEffect(() => {
    axios.get(`http://localhost:5000/product/get`)
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  const filteredProducts = productList.filter(product => product.SellerID.toString() === sellerID);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', padding: '5vh 0', borderTop: '1px solid black' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '5vh' }}>Sản phẩm của người bán</h1>
      <div style={{ width: '95%', margin: '0 auto', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '2.5em' }}>
        <SellerShopPagination products={currentProducts} />
        <SellerShopPaginationBar itemsPerPage={itemsPerPage} totalItems={filteredProducts.length} paginate={paginate} currentPage={currentPage}/>
      </div>
    </div>
  )
}

export default SellerShopForUserList
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProductCardSmall from '../common/ProductCardSmall'
import axios from 'axios'

function SearchList(props) {
    const [products, setProducts] = useState([]);
    const search = props.keyword.toString();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/product/get');
        setProducts(response.data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const filteredProducts = products.filter(product => product.ProductName.toLowerCase().includes(search.toLowerCase()));

    return (
        filteredProducts.length > 0 ? (
            <div style={{ minHeight: '80vh', marginTop: '10vh', padding: '5vh 0' }}>
                <h1 style={{ textAlign: 'center' }}>Kết quả tìm kiếm</h1>
                <h3 style={{ marginLeft: '7.5%'}}>Tìm thấy {filteredProducts.length} sản phẩm cho từ khóa '{search}':</h3>
                <hr style={{ width: '85%', margin: '20px auto', fontWeight: 'bold' }} />
                <div style={{ width: '85%', margin: '0 auto', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '2.5em' }}>
                    {filteredProducts.map((product) => (
                        <ProductCardSmall
                            key={product.ProductID}
                            id={product.ProductID}
                            name={product.ProductName}
                            pic={product.ProductPic}
                            description={product.ProductDescription}
                            price={product.ProductPrice}
                            seller={product.SellerID}
                            star={product.ProductID}
                            category={product.CategoryID}
                            quantity={product.ProductQuantity} />
                    ))}
                </div>
            </div>
        ) : (
            <div style={{ minHeight: '65vh', marginTop: '10vh', padding: '5vh 0', textAlign: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>Kết quả tìm kiếm</h1>
                <h3 style={{ margin: '20px 0 30px 0' }}>Không tìm thấy sản phẩm nào với từ khóa '{search}'</h3>
                <Button variant='primary' size='lg' style={{ borderRadius: '20px', padding: '10px' }} onClick={() => navigate('/home')}>Quay về trang chủ</Button>
            </div>
        )
    )
}

export default SearchList
import React from 'react'
import Form from 'react-bootstrap/Form';
import ProductCardSmall from './ProductCardSmall'
import Dropdown from 'react-bootstrap/Dropdown';

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
  borderRadius: '10px',
  position: 'sticky',
  top: '15%',
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

const itemsStyle = {
  width: '100%',
  padding: '20px 20px 100px 20px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2em',
}



function MainShopItemList() {

  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [categoryID, setCategoryID] = React.useState('%');
  const [arrange, setArrange] = React.useState('ProductID');
  const [arrangeOrder, setArrangeOrder] = React.useState('asc');
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(Number.MAX_SAFE_INTEGER);
  const [sellerID, setSellerID] = React.useState('%');

  let fetchData = {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      categoryID: categoryID,
      arrange: arrange,
      arrangeOrder: arrangeOrder,
      minPrice: minPrice,
      maxPrice: maxPrice,
      sellerID: sellerID
    })
  }

  React.useEffect(() => {
    fetch("/category/getCategories")
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  React.useEffect(() => {
    fetch("/product/filter", fetchData)
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        console.log(JSON.stringify(data))
      })
  }, [])

  return (
    <div style={containerStyle}>
      <Form style={FormStyle}>
        <h2>Danh mục sản phẩm</h2>
        <Form.Check
          type="radio"
          label="Tất cả sản phẩm"
          name='chooseCategory'
          value={"%"}
          defaultChecked
        />
        {categories.map((category) => (
          <Form.Check
            key={category.CategoryID}
            type="radio"
            label={category.CategoryName}
            name='chooseCategory'
            value={category.CategoryID}
          />
        ))}
      </Form>
      <div style={listStyle}>
        <div style={filterStyle}>
          <Dropdown style={{ margin: '0 20px 0 40px' }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Sắp xếp
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Tên A-Z</Dropdown.Item>
              <Dropdown.Item>Tên Z-A</Dropdown.Item>
              <Dropdown.Item>Giá thấp đến cao</Dropdown.Item>
              <Dropdown.Item>Giá cao đến thấp</Dropdown.Item>
              <Dropdown.Item>Đánh giá tăng dần</Dropdown.Item>
              <Dropdown.Item>Đánh giá giảm dần</Dropdown.Item>
              <Dropdown.Item>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ margin: '0 20px' }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Lọc giá sản phẩm
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Từ 0 - 25,000 VND</Dropdown.Item>
              <Dropdown.Item>Từ 25,000 - 50,000 VND</Dropdown.Item>
              <Dropdown.Item>Từ 50,000 - 75,000 VND</Dropdown.Item>
              <Dropdown.Item>Từ 75,000 - 100,000 VND</Dropdown.Item>
              <Dropdown.Item>Từ 100,000 trở lên</Dropdown.Item>
              <Dropdown.Item>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ margin: '0 20px' }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Lọc theo người bán
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Người bán A</Dropdown.Item>
              <Dropdown.Item>Người bán B</Dropdown.Item>
              <Dropdown.Item>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={itemsStyle}>
          {products.map((product) => (
            <ProductCardSmall
              key={product.ProductID}
              name={product.ProductName}
              pic={product.ProductPic}
              description={product.ProductDescription}
              price={product.ProductPrice}
              seller={product.SellerID}
              star={product.ProductID} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainShopItemList
import React from 'react'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import MainShopPagination from './MainShopPagination';
import MainShopPaginationBar from './MainShopPaginationBar';

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



function MainShopItemList(props) {

  const [categories, setCategories] = React.useState([]);
  const [sellers, setSellers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(15);
  const [filter, setFilter] = React.useState({
    category: props.id,
    order: 'ProductID asc',
    range: [0, 100000000],
    seller: '%'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  React.useEffect(() => {
    fetch("http://localhost:5000/category/getCategories")
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
  }, [])


  React.useEffect(() => {
    fetch("http://localhost:5000/seller/get")
      .then(response => response.json())
      .then(data => {
        setSellers(data)
      })
  }, [])

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5000/product/filter", {
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




  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={containerStyle}>
      <Form style={FormStyle}>
        <h2>Danh mục sản phẩm</h2>
        <Form.Check
          type="radio"
          label="Tất cả sản phẩm"
          name='category'
          value={"%"}
          onClick={handleInputChange}
          defaultChecked={Number(props.id) === 0}
        />
        {categories.map((category) => (
          <Form.Check
            key={category.CategoryID}
            type="radio"
            label={category.CategoryName}
            name='category'
            value={category.CategoryID}
            onClick={handleInputChange}
            defaultChecked={Number(props.id) === category.CategoryID}
          />
        ))}
      </Form>


      <div style={listStyle}>
        <div style={filterStyle}>
          <Dropdown style={{ margin: '0 20px 0 40px' }} onSelect={(e) => {
            handleInputChange({ target: { name: 'order', value: e } });
          }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Sắp xếp
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='ProductName asc'>Tên A-Z</Dropdown.Item>
              <Dropdown.Item eventKey='ProductName desc'>Tên Z-A</Dropdown.Item>
              <Dropdown.Item eventKey='ProductPrice asc'>Giá thấp đến cao</Dropdown.Item>
              <Dropdown.Item eventKey='ProductPrice desc'>Giá cao đến thấp</Dropdown.Item>
              <Dropdown.Item eventKey='ProductID asc'>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ margin: '0 20px' }} onSelect={(e, val) => {
            const range = e.split(' and ').map(Number);
            handleInputChange({ target: { name: 'range', value: range } });
          }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Lọc giá sản phẩm
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='0 and 25000'>Từ 0 - 25,000 VND</Dropdown.Item>
              <Dropdown.Item eventKey='25000 and 50000'>Từ 25,000 - 50,000 VND</Dropdown.Item>
              <Dropdown.Item eventKey='50000 and 75000'>Từ 50,000 - 75,000 VND</Dropdown.Item>
              <Dropdown.Item eventKey='75000 and 100000'>Từ 75,000 - 100,000 VND</Dropdown.Item>
              <Dropdown.Item eventKey='100000 and 100000000'>Từ 100,000 trở lên</Dropdown.Item>
              <Dropdown.Item eventKey='0 and 100000000'>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ margin: '0 20px' }} onSelect={(e) => handleInputChange({ target: { name: 'seller', value: e } })}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Lọc theo người bán
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {sellers.map((seller) => (
                <Dropdown.Item key={seller.SellerID} eventKey={seller.SellerID}>{seller.SellerName}</Dropdown.Item>
              ))}
              <Dropdown.Item eventKey='%' onClick={handleInputChange}>Bỏ chọn</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <MainShopPagination products={currentProducts} />
          <MainShopPaginationBar itemsPerPage={itemsPerPage} totalItems={products.length} paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default MainShopItemList
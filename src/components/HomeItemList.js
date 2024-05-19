import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../utility/testlogo.png';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


const ListItem = {
  margin: "auto",
  width: '80vw',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}
const CardStyle = {
  width: '20vw',
  backgroundColor: 'white',
  color: 'black',
  border: 'solid 2px black'
}

const TitleStyle = {
  textAlign: 'center',
  paddingBottom: '5vh',
  fontSize: 'x-large'
}

const MakeCenter = {
  marginTop: '10px',
  display: 'block',
  margin: 'auto'
}

const StarStyle = {
  display: 'flex',
  margin: "10px 0",
  fontSize: 'x-large',
  color: 'orange'
}

function HomeItemList() {
  return (
    <div style={{ padding: '50px 0' }}>
      <div className='title' style={TitleStyle}>
        <h1>Sản phẩm mới nhất</h1>
        <p>Những mặt hàng mới lên kệ vô cùng hấp dẫn</p>
      </div>
      <Carousel data-bs-theme="dark" style={{ paddingBottom: '7.5vh' }}>
        <Carousel.Item>
          <div style={ListItem}>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={ListItem}>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
            <Card style={CardStyle}>
              <Card.Img variant="top" src={logo} />
              <hr />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>
      <Button variant='secondary' size='lg' style={MakeCenter}>Xem thêm</Button>
    </div>
  )
}

export default HomeItemList
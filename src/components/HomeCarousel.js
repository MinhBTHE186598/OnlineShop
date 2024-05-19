import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import picture1 from '../utility/carousel1.jpg';
import picture2 from '../utility/carousel2.jpg';
import picture3 from '../utility/carousel3.jpg';

const imageStyle = {
  objectFit: 'cover',
  objectPosition: '50% 60%',
  height: '70vh'
}

function homeCarousel() {
  return (
    <div style={{ padding: '50px 0', width:'90vw', margin:'auto' }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={picture2} alt="First slide" style={imageStyle}/>
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={picture1} alt="Second slide" style={imageStyle}/>
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={picture3} alt="Third slide" style={imageStyle}/>
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default homeCarousel
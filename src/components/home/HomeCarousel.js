import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';



const imageStyle = {
  objectFit: 'cover',
  objectPosition: '50% 50%',
  height: '70vh'
}

function HomeCarousel() {
  const [bannerList, setBannerList] = useState([{}]);
  // const [categories, setCategories] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/banner/get").then(
      response => response.json()
    ).then(
      data => {
        setBannerList(data)
      }
    )
  }, [])

  // useEffect(() => {
  //   fetch("http://localhost:5000/category/getCategories").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setCategories(data)
  //     }
  //   )
  // }, [])


  return (
    <div style={{ padding: '50px 0', width: '90vw', margin: 'auto' }}>
      <Carousel>
        {bannerList.map((banner, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={banner.BannerPic} alt={banner.BannerID} style={imageStyle} />
            {/* <Carousel.Caption>
              <h5>{categories.find(category => category.CategoryID === banner.CategoryID).CategoryName}</h5>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default HomeCarousel
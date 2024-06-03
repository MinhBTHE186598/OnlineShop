import React from 'react'
import banner from '../../utility/testbanner.jpg'

const titleStyle = {
  marginTop: '10vh',
  width: '100vw',
  height: '40vh',
  textAlign: 'center',
  backgroundImage: `url(${banner})`,
  position: 'relative',
}
const coverStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#000',
  opacity: '0.8',
}
const textStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '2',
  fontSize: 'x-large'
}
function MainShopTitle() {
  return (
    <div className='shopTitle' style={titleStyle}>
    <div className='cover' style={coverStyle}></div>
    <div className='text' style={textStyle}>
      <h1>Tất cả sản phẩm</h1>
      <p>Chúng tôi đảm bảo cung cấp nhưng mặt hàng có chất lượng tốt nhất tới bạn!</p>
    </div>
  </div>
  )
}

export default MainShopTitle
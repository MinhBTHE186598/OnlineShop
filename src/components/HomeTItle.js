import React from 'react'
import { Button } from 'react-bootstrap'
import banner from '../utility/testbanner.jpg'

const titleStyle = {
  marginTop:'10vh',
  width: '100vw',
  height: '40vh',
  textAlign: 'center',
  backgroundImage: `url(${banner})`,
  position: 'relative',
  boxShadow: '0px 20px 30px'
}
const coverStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#000',
  opacity: '0.6',
}
const textStyle = {
  position:'absolute',
  width: '100%',
  height:'100%',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '2',
  fontSize:'x-large'
}

function homeTItle() {
  return (
    <div className='homeTitle' style={titleStyle}>
      <div className='cover' style={coverStyle}></div>
      <div className='text' style={textStyle}>
        <h1>Chợ sinh viên</h1>
        <p>Chúng tôi có những gì sinh viên cần!</p>
        <Button variant='light' style={{zIndex:'1'}}>Mua ngay</Button>
      </div>
    </div>
  )
}

export default homeTItle
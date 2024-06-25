import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundNoti() {
  return (
    <div style={{ width: '100vw', height: '90vh', backgroundColor: '#0e6efd', marginTop: '10vh', overflow: 'hidden' }}>
      <div style={{ width: '80%', height: '80vh', margin: '5vh auto', backgroundColor: '#fff', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{textAlign: 'center'}}>
          <h1>404, Không tìm thấy!</h1>
          <h5>Chúng tôi không tìm thấy trang bạn muốn, xin vui lòng thử lại sau</h5>
        </div>
        <Link to="/home">
          <Button variant='primary' size='lg' style={{ borderRadius: '20px', padding: '15px' }}>Quay về trang chủ</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundNoti
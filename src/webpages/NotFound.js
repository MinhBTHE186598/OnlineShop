import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import NotFoundNoti from '../components/notFound/notFoundNoti'

function NotFound() {
  return (
    <div>
        <Header />
        <NotFoundNoti />
        <Footer />
    </div>
  )
}

export default NotFound
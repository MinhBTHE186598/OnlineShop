import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerProfile from './SellerProfile';
import SellerShopForUserList from './SellerShopForUserList';
import SellerShopForUserReview from './SellerShopForUserReview';

function SellerShopForUserMain(props) {
  const [sellerList, setSellerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/seller/get")
      .then(response => response.json())
      .then(data => {
        setSellerList(data)
      })
  }, [])

  if (isNaN(props.id) || props.id > sellerList.length || props.id <= 0) {
    navigate('/notfound');
  }

  return (
    <div style={{ minHeight: '80vh', marginTop: '10vh', padding: '5vh 0', backgroundColor: '#0d6efd' }}>
      <SellerProfile id={props.id} />
      <SellerShopForUserList id={props.id} />
      <SellerShopForUserReview id={props.id} />
    </div>
  )
}

export default SellerShopForUserMain
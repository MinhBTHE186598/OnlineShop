import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SearchList from '../components/search/SearchList'

function Search() {
  const { keyword } = useParams();
  return (
    <div>
      <Header />
      <SearchList keyword={keyword} />
      <Footer />
    </div>
  )
}

export default Search
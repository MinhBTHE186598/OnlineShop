import React from 'react'
import { Button } from 'react-bootstrap'

const SellerShopPaginationBar = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav style={{ margin: '0 auto' }}>
            <ul className="pagination justify-content-center">
                {pageNumber.map(number => (
                    <li key={number} className={`page-item cursor ${number === currentPage ? 'active' : ''}`}>
                        <Button onClick={() => paginate(number)} className="page-link" style={{cursor: 'pointer', margin: '0 3px'}}>
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default SellerShopPaginationBar
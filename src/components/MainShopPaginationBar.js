import React from 'react'

const MainShopPaginationBar = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav style={{ margin: '30px 0' }}>
            <ul className="pagination justify-content-center">
                {pageNumber.map(number => (
                    <li key={number} className="page-item cursor">
                        <a onClick={() => paginate(number)} className="page-link" style={{cursor: 'pointer'}}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MainShopPaginationBar
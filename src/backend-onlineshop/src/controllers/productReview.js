const sql = require('mssql');

const getProductReview = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM ProductReviews`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getStar = async (req, res) => {
    try {
        const result = await sql.query`select ProductID, avg(ProductReviewStar) as 'ProductStar' from ProductReviews group by ProductID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getProductReview, getStar}
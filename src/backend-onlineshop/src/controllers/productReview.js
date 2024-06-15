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
        const result = await sql.query`select ProductID, avg(ProductReviewStar) as 'ProductStar' from ProductReviews group by ProductID `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addProductReview = async (req, res) => {
    try {
        const { UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText } = req.body;
        const result = await sql.query`INSERT INTO ProductReviews(UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText)
        VALUES (${UserID}, ${ProductID}, ${ProductReviewDate}, ${ProductReviewStar}, ${ProductReviewText})`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const updateProductReview = async (req, res) => {
    try {
        const { ProductReviewID } = req.params;
        const { ProductReviewStar, ProductReviewText, ProductReviewDate } = req.body;
        const result = await sql.query`UPDATE ProductReviews SET ProductReviewStar = ${ProductReviewStar}, ProductReviewText = ${ProductReviewText}, ProductReviewDate = ${ProductReviewDate} WHERE ProductReviewID = ${ProductReviewID}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteProductReview = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`DELETE FROM ProductReviews WHERE ProductReviewID = ${id}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getProductReview, getStar, addProductReview, updateProductReview, deleteProductReview}
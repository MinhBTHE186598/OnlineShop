const sql = require('mssql');

const getSellerReview = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM SellerReviews`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getStar = async (req, res) => {
    try {
        const result = await sql.query`select SellerID, avg(SellerReviewStar) as 'SellerStar' from SellerReviews group by SellerID `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addSellerReview = async (req, res) => {
    try {
        const { UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText } = req.body;
        const result = await sql.query`INSERT INTO SellerReviews(UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText)
        VALUES (${UserID}, ${SellerID}, ${SellerReviewDate}, ${SellerReviewStar}, ${SellerReviewText})`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const updateSellerReview = async (req, res) => {
    try {
        const { SellerReviewID } = req.params;
        const { SellerReviewStar, SellerReviewText, SellerReviewDate } = req.body;
        const result = await sql.query`UPDATE SellerReviews SET SellerReviewStar = ${SellerReviewStar}, SellerReviewText = ${SellerReviewText}, SellerReviewDate = ${SellerReviewDate} WHERE SellerReviewID = ${SellerReviewID}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteSellerReview = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`DELETE FROM SellerReviews WHERE SellerReviewID = ${id}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getSellerReview, getStar, addSellerReview, updateSellerReview, deleteSellerReview}
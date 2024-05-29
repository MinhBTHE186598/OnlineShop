const sql = require('mssql');

const getSeller = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Sellers`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getSellerByID = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Sellers where SellerID = ${req.params.id}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getSeller, getSellerByID}
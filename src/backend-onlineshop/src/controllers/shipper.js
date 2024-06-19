const sql = require('mssql');

const getShipper = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Shippers`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getShipper }
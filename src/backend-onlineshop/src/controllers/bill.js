const sql = require('mssql');

const getBillDetail = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM BillDetails`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getBillDetail}
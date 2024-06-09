const sql = require('mssql');

const getAdmin = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Admins`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getAdmin }
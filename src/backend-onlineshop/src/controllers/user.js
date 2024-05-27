const sql = require('mssql');

const getUser = async (req, res) => {
    try {
        const result = await sql.query`SELECT UserAccountName FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getUser} //export getUser
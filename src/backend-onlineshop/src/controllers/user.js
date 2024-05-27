const sql = require('mssql');

const getUser = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await sql.query`Delete FROM Users where UserID=${userId}`;
        return res.json(result.rowsAffected);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = {getUser,deleteUser} //export getUser
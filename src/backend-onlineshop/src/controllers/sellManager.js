const sql = require('mssql');

const getSellManager = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM SellManagers`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getSellManagerInf = async (req, res) => {
    try {
        const result = await sql.query`select SellManagerID, s.UserID, CategoryID, UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName
                                        from SellManagers s
                                        left join Users u
                                        on s.UserID = u.UserID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getSellManager, getSellManagerInf }
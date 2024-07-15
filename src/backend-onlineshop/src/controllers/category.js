const sql = require('mssql');

const getCategories = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Categories`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getCategoryQuantity = async (req, res) => {
    try {
        const result = await sql.query`select c.CategoryID, c.CategoryName, count(c.CategoryID) as counts from Categories c
join Products p on p.CategoryID = c.CategoryID
group by c.CategoryID, c.CategoryName`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = { getCategories, getCategoryQuantity }
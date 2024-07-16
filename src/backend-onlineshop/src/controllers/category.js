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
        const result = await sql.query`select c.CategoryID, c.CategoryName, count(p.ProductID) as counts from Categories c
left join Products p on p.CategoryID = c.CategoryID
group by c.CategoryID, c.CategoryName`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addCate = async (req, res) => {
    try {
        const {cate} = req.body;
        await sql.query`insert into Categories (CategoryName) values (${cate})`
        res.status(200).send('success')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = { getCategories, getCategoryQuantity, addCate }
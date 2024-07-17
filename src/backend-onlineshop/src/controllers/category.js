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
        const { cate } = req.body;
        await sql.query`insert into Categories (CategoryName) values (${cate})`
        res.status(200).send('success')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteCate = async (req, res) => {
    try {
        const id = req.params.id;
        if (id === '12') {
            res.status(500).send('Server Error')
        } else {
            await sql.query`update SellManagers set CategoryID = 12 
where CategoryID like ${id}
update Banners set CategoryID = 12 
where CategoryID like ${id}
delete from Categories where CategoryID like ${id}`
            res.status(200).send('success')
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const updateCate = async (req, res) => {
    try {
        const { id, name } = req.body;
        await sql.query`update Categories set CategoryName=${name}
where CategoryID like ${id}`
        res.status(200).send('success')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const changeCate = async (req, res) => {
    try {
        const { productIDs, newCategoryID } = req.body;
        const productIDsString = productIDs.join(',');
        const pool = await sql.connect();
        const query = `
            UPDATE Products
            SET CategoryID = @newCategoryID
            WHERE ProductID IN (${productIDsString})
        `;
        await pool.request()
            .input('newCategoryID', sql.Int, newCategoryID)
            .query(query);

        res.status(200).send('Category updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = { getCategories, getCategoryQuantity, addCate, deleteCate, updateCate, changeCate }
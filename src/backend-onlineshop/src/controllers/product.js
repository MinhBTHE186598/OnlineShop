const sql = require('mssql');

const getProduct = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Products where ProductStatus like N'Đã xác thực'`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getWhitelistProduct = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Products p join SellManagers sm on p.CategoryID = sm.CategoryID where ProductStatus like N'Chờ xác thực' and sm.CategoryID = p.CategoryID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getProductByID = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Products where ProductID = ${req.params.id} and ProductStatus like N'Đã xác thực'`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addProduct = async (req, res) => {
    try {
        const { productName, productCategory, productPrice, productPic, productQuantity, productDesc } = req.body;
        await sql.query`insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus)
        values(1, ${productCategory}, ${productName}, ${productDesc}, ${productPrice}, ${productQuantity},${productPic}, N'Chờ xác thực')`;
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const filterProduct = async (req, res) => {
    try {
        const { categoryID, arrange, arrangeOrder, minPrice, maxPrice, sellerID } = req.body;
        const result = await sql.query`SELECT * FROM Products 
        where ProductStatus like N'Đã xác thực' 
        and CategoryID like '%' 
        and ProductPrice between 0 and 1000000 
        and sellerID like '%' 
        order by ProductID asc`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getProduct, getWhitelistProduct, getProductByID, addProduct, filterProduct }
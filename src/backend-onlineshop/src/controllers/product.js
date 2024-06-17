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

const getAllProduct = async (req, res) => {
    try {
        const result = await sql.query`SELECT SUM(b.BillQuantity)as Sold, c.CategoryName, p.ProductID,p.ProductName,p.ProductPic,p.ProductPrice,p.ProductStatus,p.ProductQuantity,s.SellerName,u.UserID FROM Products P
join Categories c on p.CategoryID=c.CategoryID
join Sellers s on p.SellerID = s.SellerID
join Users u on u.UserID = s.UserID
left join BillDetails b on b.ProductID=p.ProductID
group by c.CategoryName, p.ProductID,p.ProductName,p.ProductPic,p.ProductPrice,p.ProductStatus,p.ProductQuantity,s.SellerName,u.UserID
`;
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
        const { sellerID, productName, productCategory, productPrice, productPic, productQuantity, productDesc } = req.body;
        await sql.query`insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus)
        values(${sellerID}, ${productCategory}, ${productName}, ${productDesc}, ${productPrice}, ${productQuantity},${productPic}, N'Chờ xác thực')`;
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
const approveProduct = async (req, res) => {
    try {     
        const { id } = req.params;
        await sql.query`update Products set ProductStatus = N'Đã xác thực' where ProductID = ${id}`
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
const  deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.query`delete from Products where ProductID = ${id}`;
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
const filterProduct = async (req, res) => {
    try {
        const { category, range, seller, order } = req.body;
        const result = await sql.query`SELECT * FROM Products p 
        where ProductStatus like N'Đã xác thực' 
        and CategoryID like ${category}
        and ProductPrice between ${range[0]} and ${range[1]}
        and sellerID like ${seller}
        order by 
        case ${order} WHEN 'ProductID asc' THEN ProductID end asc,
        case ${order} WHEN 'ProductName asc' THEN ProductName end asc,
        case ${order} WHEN 'ProductName desc' THEN ProductName end desc,
        case ${order} WHEN 'ProductPrice asc' THEN ProductPrice end asc,
        case ${order} WHEN 'ProductPrice desc' THEN ProductPrice end desc`; 
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getProduct, getWhitelistProduct, getProductByID, addProduct, filterProduct, getAllProduct, approveProduct, deleteProduct }
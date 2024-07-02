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

const getCart = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.query`SELECT * FROM Bills where BillStatus like N'Chưa thanh toán' and UserID = ${id}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getBillDetailByBillID = async (req, res) => {
    try {
        const billID = req.params.id;
        const result = await sql.query`SELECT * FROM BillDetails where BillID = ${billID}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addNewBill = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.query`INSERT INTO Bills(UserID, BillStatus) VALUES (${id}, N'Chưa thanh toán')`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {getBillDetail, getBillDetailByBillID, getCart, addNewBill}
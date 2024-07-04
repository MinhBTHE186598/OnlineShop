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

const updateBill = async (req, res) => {
    try {
        const { BillID, ShipperID, BillDetailStatus } = req.body;

        const result = await sql.query`
            UPDATE BillDetails 
            SET ShipperID = ${ShipperID}, BillDetailStatus = ${BillDetailStatus} 
            WHERE BillID = ${BillID}
        `;

        res.json({ message: 'Bill updated successfully' });
    } catch (err) {
        console.error('Error updating bill:', err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = { getBillDetail, getBillDetailByBillID, getCart, addNewBill, updateBill }

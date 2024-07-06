const sql = require('mssql');

const getBillDetail = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT bd.*, b.UserID, u.UserAddress, u.UserFirstName, u.UserLastName, p.ProductName
            FROM BillDetails bd
            JOIN Bills b ON bd.BillID = b.BillID
            JOIN Users u ON b.UserID = u.UserID
            JOIN Products p ON bd.ProductID = p.ProductID
        `;
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

const deleteBill = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.query`DELETE FROM BillDetails WHERE BillDetailID = ${id}`;
        res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const updateBillDetailPlusQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.query`
            UPDATE BillDetails 
            SET BillQuantity = BillQuantity + 1
            WHERE BillDetailID = ${id}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error updating bill:', err.message);
        res.status(500).send('Server Error');
    }
}

const updateBillDetailMinusQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.query`
            UPDATE BillDetails 
            SET BillQuantity = BillQuantity - 1
            WHERE BillDetailID = ${id}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error updating bill:', err.message);
        res.status(500).send('Server Error');
    }
}

const updateBillDetailCustomQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;
        const result = await sql.query`
            UPDATE BillDetails 
            SET BillQuantity = ${quantity}
            WHERE BillDetailID = ${id}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error updating bill:', err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { getBillDetail, getBillDetailByBillID, getCart, addNewBill, updateBill, deleteBill, updateBillDetailPlusQuantity, updateBillDetailMinusQuantity, updateBillDetailCustomQuantity }; 

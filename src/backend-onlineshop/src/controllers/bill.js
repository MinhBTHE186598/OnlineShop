const sql = require('mssql');

const getBillDetail = async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM BillDetails
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
const getProductToBill = async (req, res) => {
    try {
        const billDetailID = req.query.billDetailID;
        if (!billDetailID) {
            res.status(400).send('billDetailID is required');
            return;
        }

        const result = await sql.query`
            SELECT p.ProductName
            FROM BillDetails bd
            JOIN Products p ON bd.ProductID = p.ProductID
            WHERE bd.BillDetailID = ${billDetailID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in getProductToBill:', err);
        res.status(500).send('Error fetching product details for bill detail');
    }
};
  
const getUserToBill = async (req, res) => {
    try {
        const billID = req.query.billID; 
        const result = await sql.query`
            SELECT u.UserID, u.UserAddress, u.UserFirstName, u.UserLastName
            FROM Bills b
            JOIN Users u ON b.UserID = u.UserID
            WHERE b.BillID = ${billID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in getUserToBill:', err);
        res.status(500).send('Error fetching user details for bill');
    }
};
const getSellerToBill = async (req, res) => {
    try {
        const productID = req.query.productID; 
        const result = await sql.query`
            SELECT s.SellerAddress
            FROM Products p
            JOIN Sellers s ON p.SellerID = s.SellerID
            WHERE p.ProductID = ${productID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in getSellerToBill:', err);
        res.status(500).send('Error fetching seller details for product');
    }
};

const getBill = async (req, res) => {
    try {
        const billID = req.query.billID; 
        const result = await sql.query`
            SELECT b.BillID, b.BillDate
            FROM Bills b
            WHERE b.BillID = ${billID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error in getBill:', err);
        res.status(500).send('Error fetching bill details');
    }
};

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

const updateBillDetail = async (req, res) => {
    try {
        const { BillDetailID, ShipperID, BillDetailStatus } = req.body;
        const result = await sql.query`
            UPDATE BillDetails 
            SET ShipperID = ${ShipperID}, BillDetailStatus = ${BillDetailStatus} 
            WHERE BillDetailID = ${BillDetailID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
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

const getBillsByUserID = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            res.status(400).send('userID is required');
            return;
        }

        const result = await sql.query`
            SELECT *
            FROM Bills 
            WHERE UserID = ${userID} 
        `;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error fetching bills');
    }
};
const addToCart = async (req, res) => {
    try {
        const { BillID } = req.userCart; 
        const { ProductID, BillDetailDate } = req.body;
        const result = await sql.query`
            INSERT INTO BillDetails (BillID, ProductID, BillDetailDate, BillDetailQuantity, BillDetailStatus, ShipperID)
            VALUES (${BillID}, ${ProductID}, ${BillDetailDate}, ${BillDetailQuantity}, N'Chưa thanh toán', ${ShipperID})
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error adding to cart:', err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getBillDetail,getBillsByUserID ,getProductToBill, getBill, getSellerToBill, getUserToBill, getBillDetailByBillID, getCart, addNewBill, updateBillDetail, deleteBill, updateBillDetailPlusQuantity, updateBillDetailMinusQuantity, updateBillDetailCustomQuantity, addToCart };

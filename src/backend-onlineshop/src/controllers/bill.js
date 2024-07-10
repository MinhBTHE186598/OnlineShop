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

const getSellerAddress = async (req, res) => {
    try {
      const billDetailID = req.query.billDetailID;
      if (!billDetailID) {
        res.status(400).send('billDetailID is required');
        return;
      }
  
      const result = await sql.query`
        SELECT s.SellerAddress
        FROM BillDetails bd
        JOIN Products p ON bd.ProductID = p.ProductID
        JOIN Sellers s ON p.SellerID = s.SellerID
        WHERE bd.BillDetailID = ${billDetailID}
      `;
      res.json(result.recordset);
    } catch (err) {
      console.error('Error in getSellerAddress:', err);
      res.status(500).send('Error fetching seller address for bill detail');
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
const updateBillDetailU = async (req, res) => {
    try {
        const { BillDetailID, ShipperID, BillDetailStatus } = req.body;
        const result = await sql.query`
            UPDATE BillDetails 
            SET BillDetailStatus = ${BillDetailStatus} 
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
        const { BillID, ProductID,BillDetailDate,BillDetailQuantity,ShipperID } = req.body;
         await sql.query`
            INSERT INTO BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID)
            VALUES (${BillID}, ${ProductID}, ${BillDetailDate}, ${BillDetailQuantity}, N'Chưa thanh toán', ${ShipperID})
        `;
        res.send('yay');
    } catch (err) {
        console.error('Error adding to cart:', err.message);
        res.status(500).send('Server Error');
    }
};

const getBillDetailsByUserID = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            res.status(400).send('userID is required');
            return;
        }

        const result = await sql.query`
            SELECT bd.BillDetailID, bd.ProductID, bd.BillDetailDate, bd.BillQuantity, bd.BillDetailStatus
            FROM BillDetails bd
            JOIN Bills b ON bd.BillID = b.BillID
            WHERE b.UserID = ${userID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching bill details by user ID:', err);
        res.status(500).send('Server Error');
    }
};

module.exports = { getBillDetail,updateBillDetailU,getBillDetailsByUserID,getSellerAddress,getBillsByUserID ,getProductToBill, getBill, getUserToBill, getBillDetailByBillID, getCart, addNewBill, updateBillDetail, deleteBill, updateBillDetailPlusQuantity, updateBillDetailMinusQuantity, updateBillDetailCustomQuantity, addToCart };

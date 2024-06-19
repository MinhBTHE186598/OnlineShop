const sql = require('mssql');

// Get all users
const getUser = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await sql.query`delete from Notifications where UserID=${userId}
        delete from ProductReviews where UserID=${userId}
        delete from SellerReviews where UserID=${userId}
        delete from SellManagers where UserID=${userId}
		delete from Supports where UserID=${userId}
        delete from BillDetails where BillID in (select BillID from Bills where UserID=${userId})
        delete from Bills where UserID=${userId}
		delete from BillDetails where ShipperID in (select ShipperID from Shippers where UserID=${userId})
		delete from Shippers where UserID=${userId}
        delete from SellerReviews where UserID=${userId}
        delete from Products where SellerID in (select SellerID from Sellers where UserID=${userId})
        delete from Sellers where UserID=${userId}
        delete from Users where UserID=${userId}`;
        if (result.rowsAffected[12] === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, gmail, number, password, address, firstName, lastName, isShipper } = req.body;
        
        const result = await sql.query`
            INSERT INTO Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName)
            OUTPUT INSERTED.UserID
            VALUES (${name}, ${password}, 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', ${gmail}, ${address}, ${number}, ${firstName}, ${lastName});
        `;
        
        const UserID = result.recordset[0].UserID;

        if (isShipper) {
            await sql.query`INSERT INTO Shippers (UserID) VALUES (${UserID});`;
        }

        res.json({ success: true, UserID });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get all shippers
const getShipper = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Shippers`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Register a shipper
const registerShipper = async (req, res) => {
    try {
        const { UserID } = req.body;
        await sql.query`INSERT INTO Shippers (UserID) VALUES (${UserID})`;
        res.send('Success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Get user by ID
const getUserByID = async (req, res) => {
    try {
        const userID = req.params.id;
        const result = await sql.query`SELECT * FROM Users WHERE UserID = ${userID}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { Password, Address, Email, Phone, FirstName, LastName, PFP, userID } = req.body;
        const result = await sql.query`
            UPDATE Users
            SET UserPassword = ${Password}, UserPFP = ${PFP}, UserEmail = ${Email}, UserAddress = ${Address}, UserPhone = ${Phone}, UserFirstName = ${FirstName}, UserLastName = ${LastName}
            WHERE UserID = ${userID}
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Check if username exists
const checkUsername = async (req, res) => {
    try {
        const { name } = req.query;
        const result = await sql.query`SELECT COUNT(*) AS count FROM Users WHERE UserAccountName = ${name}`;
        const exists = result.recordset[0].count > 0;
        res.json({ exists });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getUser,
    deleteUser,
    registerUser,
    getUserByID,
    updateUser,
    checkUsername,
    getShipper,
    registerShipper
};

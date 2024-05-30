const sql = require('mssql');

const getUser = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

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
        delete from SellerReviews where UserID=${userId}
        delete from Products where SellerID in (select SellerID from Sellers where UserID=${userId})
        delete from Sellers where UserID=${userId}
        delete from Users where UserID=${userId}`;
        if (result.rowsAffected[9] === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const registerUser = async (req, res) => {
    try {
        const { gmail, number, password } = req.body;
        const name = req.body.name;

        await sql.query`insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserPhone)
         values (${name}, ${password}, 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', ${gmail}, ${number})`;
        console.log(name)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getUserByID = async (req, res) => {
    try {
        const userID = req.params.id;
        const result = await sql.query`Select * from Users where UserID=${userID}`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

module.exports = { getUser, deleteUser, registerUser, getUserByID } //export getUser
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
        delete from SellerSignUps where UserID=${userId}
        delete from SellManagers where UserID=${userId}
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
        await sql.query`insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user1', 'Aa@12355', 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', 'fsleathq@dropbox.com', '0965 Elmside Park', '3888525055', 'Filberto', 'Sleath')`;
        res.status(201).send('User added');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}



module.exports = {getUser,deleteUser, registerUser} //export getUser
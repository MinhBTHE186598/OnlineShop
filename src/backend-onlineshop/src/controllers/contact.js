const sql = require('mssql');

const getContact = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Supports`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addContact = async (req, res) => {
    try {
        const {UserID, title, content } = req.body;
        const AdminID = 1;
        await sql.query`insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) 
                        values (${UserID}, ${AdminID}, ${title}, ${content})`;
        res.send('Success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}




module.exports = { getContact , addContact };

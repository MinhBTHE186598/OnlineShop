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

const getContactDetail = async (req, res) => {
    try {
        const result = await sql.query`select s.SupportID,s.UserID, s.AdminID, s.SupportTitle, s.SupportRequest, s.SupportResponse,
u.UserAccountName,u.UserPFP, u.UserFirstName, u.UserLastName from Supports s
join Users u on s.UserID=u.UserID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


const addContact = async (req, res) => {
    try {
        const { UserID, title, content } = req.body;
        const AdminID = 1;
        await sql.query`insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) 
                        values (${UserID}, ${AdminID}, ${title}, ${content})`;
        res.send('Success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const response = async (req, res) => {
    try {
        const { AdminID, Response, ResponseID } = req.body;
        await sql.query`update Supports set SupportResponse = ${Response}, AdminID=${AdminID}
where SupportID=${ResponseID}
`;
        res.status(200).send('Success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}



module.exports = { getContact, addContact, getContactDetail,response };

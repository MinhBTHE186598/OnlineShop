const sql = require('mssql');

const postNoti = async (req, res) => {
    try {
        const {UserID, NotiHeader, NotiBody} = req.body;
        await sql.query`insert into Notifications (UserID, NotificationText, NotificationHeader)
         values (${UserID}, ${NotiHeader},${NotiBody})`
         res.send('yay')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getNoti = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Notifications`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { postNoti , getNoti }
const sql = require('mssql');

const getBanner = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Banners`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getBannerForAdmin = async (req, res) => {
    try {
        const result = await sql.query`Select b.BannerID, b.BannerPic,u.UserAccountName, u.UserFirstName, u.UserLastName, c.CategoryName from Banners b
        join Admins a on b.AdminID=a.AdminID
        join Users u on a.UserID = u.UserID
        join Categories c on c.CategoryID = b.CategoryID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addBanner = async (req, res) => {
    try {
        const { AdminID, CategoryID, BannerPic } = req.body;
        const result = await sql.query`INSERT INTO Banners (AdminID, CategoryID, BannerPic) VALUES (${AdminID}, ${CategoryID}, ${BannerPic})`;
        res.send('Banner added');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const editBanner = async (req, res) => {
    try {
        const { BannerID, AdminID, CategoryID, BannerPic } = req.body;
        const result = await sql.query`UPDATE Banners SET AdminID = ${AdminID}, CategoryID = ${CategoryID}, BannerPic = ${BannerPic} WHERE BannerID = ${BannerID}`;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Banner not found');
        }
        res.send('Banner updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const result = await sql.query`DELETE FROM Banners WHERE BannerID = ${bannerId}`;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Banner not found');
        }
        res.send('Banner deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { getBanner, deleteBanner, addBanner, editBanner,getBannerForAdmin }
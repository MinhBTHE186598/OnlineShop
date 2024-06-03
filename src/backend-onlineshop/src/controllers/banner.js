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
        const result = await sql.query`Select c.CategoryID,b.BannerID, b.BannerPic,u.UserAccountName, u.UserFirstName, u.UserLastName, c.CategoryName from Banners b
        join Admins a on b.AdminID=a.AdminID
        join Users u on a.UserID = u.UserID
        join Categories c on c.CategoryID = b.CategoryID`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getBannerByID = async (req,res) =>{
    const bannerId = req.params.id;
    try{
        const result = await sql.query`Select b.BannerID, b.BannerPic,u.UserAccountName, u.UserFirstName, u.UserLastName, c.CategoryName from Banners b
        join Admins a on b.AdminID=a.AdminID
        join Users u on a.UserID = u.UserID
        join Categories c on c.CategoryID = b.CategoryID
		where BannerID=${bannerId}`;
        res.json(result.recordset)
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addBanner = async (req, res) => {
    try {
        const { adminID, categoryID, bannerPic } = req.body;
        res.send(req.body);
        const result = await sql.query`INSERT INTO Banners (AdminID, CategoryID, BannerPic) VALUES (${adminID}, ${categoryID}, ${bannerPic})`;
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const editBanner = async (req, res) => {
    try {
        const { adminID, categoryID, bannerPic } = req.body;
        const BannerID = req.params.id;
        const result = await sql.query`UPDATE Banners SET AdminID = ${adminID}, CategoryID = ${categoryID}, BannerPic = ${bannerPic} WHERE BannerID = ${BannerID}`;
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

module.exports = { getBanner, deleteBanner, addBanner, editBanner,getBannerForAdmin, getBannerByID }
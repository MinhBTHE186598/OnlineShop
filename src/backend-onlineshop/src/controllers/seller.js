const sql = require("mssql");

const getSeller = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Sellers`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getSellerByID = async (req, res) => {
  try {
    const result =
      await sql.query`SELECT * FROM Sellers where SellerID = ${req.params.id}`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addSeller = async (req, res) => {
  try {
    const { SellerName, SellerAddress, UserID } = req.body;
    await sql.query`insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID)
        values(${SellerName}, ${SellerAddress}, ${UserID}, ${
      Math.floor(Math.random() * (12 - 1)) + 1
    })`;

    res.status(200).send("Seller added successfully");
  } catch (err) {

    console.error(err);
    res.status(500).send("Server Error");
  }
};
const updateSeller = async (req, res) => {
    try {
      const { SellerName, SellerAddress } = req.body;
      const SellerID = req.params.id;
  
      const pool = await sql.connect();
      const result = await pool.request()
        .input('SellerID', sql.Int, SellerID)
        .input('SellerName', sql.NVarChar, SellerName)
        .input('SellerAddress', sql.NVarChar, SellerAddress)
        .query(`
          UPDATE Sellers
          SET SellerName = @SellerName,
              SellerAddress = @SellerAddress
          WHERE SellerID = @SellerID
        `);
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).send("Seller updated successfully");
      } else {
        res.status(404).send("Seller not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };

  const deleteSeller = async (req, res) => {
    try {
        const sellerId = req.params.id;
        const result = await sql.query`delete from BillDetails where ProductID in (select ProductID from Products where SellerID = ${sellerId})
delete from ProductReviews where ProductID in (select ProductID from Products where SellerID = ${sellerId})
delete from Products where SellerID = ${sellerId}
delete from SellerReviews where SellerID = ${sellerId}
delete from Sellers where SellerID = ${sellerId}`;
        res.send('Seller deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
const viewBillDetailForSeller = async (req, res) => {
  try {
    const { SellerID, BillID } = req.query;
    
    const result = await sql.query`
            select d.BillDetailID, d.BillDetailDate, d.BillDetailStatus, p.ProductID, p.ProductName, p.ProductPic, p.ProductQuantity, p.ProductPrice, p.ProductDescription, u.UserFirstName, u.UserLastName, u.UserAddress, u.UserPFP from Bills b
            join BillDetails d on b.BillID=d.BillID
            join Products p on p.ProductID=d.ProductID
            join Sellers s on s.SellerID=p.SellerID
            join Users u on b.UserID=u.UserID
            where s.SellerID=${SellerID} and b.BillID=${BillID}
            order by b.BillID`;
            res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching bill details by user ID:", err);
    res.status(500).send("Server Error");
  }
};

const listBillForSeller = async (req, res) => {
    try{
        const { SellerID } = req.query;
        const result = await sql.query`select b.BillID ,u.UserID, u.UserAddress, u.UserFirstName, u.UserLastName, u.UserPFP,u.UserPhone,u.UserEmail from Bills b
                                        join BillDetails c on b.BillID=c.BillID
                                        join Products p on p.ProductID=c.ProductID
                                        join Sellers s on s.SellerID=p.SellerID
                                        join Users u on b.UserID=u.UserID
                                        where s.SellerID=${SellerID}
                                        group by b.BillID ,u.UserID, u.UserAccountName, u.UserAddress, u.UserFirstName, u.UserLastName, u.UserPFP,u.UserPhone,u.UserEmail`
                                        res.json(result.recordset);
    }catch(err){
        console.error("Error fetching bill details by user ID:", err);
        res.status(500).send("Server Error");
    }
};

module.exports = { getSeller, getSellerByID, addSeller, updateSeller, deleteSeller,viewBillDetailForSeller,listBillForSeller };

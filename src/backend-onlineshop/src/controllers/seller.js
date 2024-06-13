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
    const { SellerName, SellerAddress } = req.body;
    await sql.query`insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID)
        values(${SellerName}, ${SellerAddress}, 1, ${
      Math.floor(Math.random() * (12 - 1)) + 1
    })`;
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
module.exports = { getSeller, getSellerByID, addSeller, updateSeller };

const express = require('express');
const { connectDB, sql } = require('./db');
require('dotenv').config();


const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get("/api", async (req,res) => {
    try {
        const result = await sql.query`SELECT * FROM users`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.listen(port, ()=> {console.log("server started on port 5000")})
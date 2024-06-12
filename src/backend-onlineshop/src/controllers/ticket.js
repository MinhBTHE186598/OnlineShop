const { sql } = require('mssql');

const getTicket = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Supports`;
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const submitContactForm = async (req, res) => {
    const { title, content } = req.body;

    try {
        const pool = await sql.connect();
        await pool.request()
            .input('title', sql.VarChar, title)
            .input('content', sql.Text, content)
            .query('INSERT INTO Contacts (Title, Content) VALUES (@title, @content)');

        res.status(200).send({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send({ message: 'Error submitting form' });
    }
};

module.exports = { submitContactForm, getTicket };

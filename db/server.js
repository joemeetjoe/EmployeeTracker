const express = require('express');

const PORT = 3001;
const app = express();

const mysql = require('mysql2');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Root1234',
    database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

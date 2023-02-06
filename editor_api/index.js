require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// Databse Connection
const db_connection = require('./config/database').promise();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const valu = "test";
const db_test = toString(db_connection);


app.post('/addArticle', async (req, res) => {
    try {
        const [rows] = await db_connection.execute("INSERT INTO `blog` (`title`,`content`) VALUES(?, ?)", [req.body.title, req.body.description]);
        if (rows.affectedRows === 1) {
            console.log(res.json);
            console.log(rows);
            return res.json({ success: true })
        }
    } catch (err) { console.log(err) }
});

app.get('/allPost', async (req, res) => {
    try {
        const [rows] = await db_connection.execute("SELECT * FROM blog ORDER BY id DESC");
        return res.json({ success: true, listall: rows, });
    } catch (err) { console.log(err) }
});

app.post('/getPostId', async (req, res) => {
    try {
        const [rows] = await db_connection.execute("SELECT * FROM  blog where id = ? ", [req.body.ids]);
        if (rows.length > 0) {
            return res.json({ success: true, listId: rows, })
        }
    } catch (err) { console.log(err) }
});

app.post('/editArticle', async (req, res) => {
    try {
        const [update] = await db_connection.execute("UPDATE `blog` SET `title`=?, `content`=? WHERE id = ?", [req.body.title, req.body.content, req.body.ids]);
        if (update.affectedRows === 1) {
            return res.json({ success: true, })
        }
    } catch (err) { console.log(err) }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const connection = require('./db');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

//database connection
connection()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("./images")));

//cors headres
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

//routes
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
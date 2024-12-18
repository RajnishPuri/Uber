require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

module.exports = app;
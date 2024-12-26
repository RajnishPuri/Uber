require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const pilotRouter = require('./routes/pilot.routes');

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/pilot', pilotRouter);

module.exports = app;
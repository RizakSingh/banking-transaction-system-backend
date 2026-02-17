const express = require('express');
const app = express();
const authroutes = require('./routes/auth.routes.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',authroutes);



module.exports = app;
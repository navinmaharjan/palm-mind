const express = require('express');
const connectDb = require('./database/connection')
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDb()

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on ${port} ✅`)
})


const express = require('express');
const connectDb = require('./database/connection')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute')

dotenv.config();

const app = express();

app.use(express.json());
app.use(authRoutes);

connectDb()

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on ${port} ✅`)
})


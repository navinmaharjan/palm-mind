const express = require("express");
const connectDb = require("./database/connection");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(userRoutes);

connectDb();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${port} ✅`);
});

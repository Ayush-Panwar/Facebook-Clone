const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { readdirSync } = require("fs");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user");

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//Database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error conecting mongodb connection", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}...`);
});

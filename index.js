const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
const PORT = process.env.PORT;
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}))
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", userRoute);
app.listen(PORT, () => console.log(`Server start at port: ${PORT}`));

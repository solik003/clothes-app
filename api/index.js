const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
    .connect('mongodb+srv://solomiia451:6mbDvW_V5qu3ZJJ@cluster0.pvp3c.mongodb.net/shop?retryWrites=true&w=majority')
    .then(() => console.log("DB connection successful!"))
    .catch((err)=> {
        console.log(err);
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});
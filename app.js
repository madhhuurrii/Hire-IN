const express = require("express");
const app = express();
const index = require("./routes/index");
const auth = require("./routes/auth");
const cors = require("cors");


require("dotenv").config();

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", auth);
app.use("/", index);


app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

//Import Route

//Use View Engine
app.set("view engine", "ejs");

//Middleware route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`This app is listening on port ${PORT}`));

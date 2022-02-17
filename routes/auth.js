const auth = require("express").Router();

const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET =
    "sdkqwertyuiopsasdfghjklzxcvbnm,.!@#$%^&*()+_-;qsbsnaype^jjjsnqll";

mongoose
    .connect(process.env.MONGO_PROD_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

auth.get("/", (req, res) => {
    res.render("login");
});
auth.get("/register", (req, res) => {
    res.render("register");
});

auth.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
        return res.json({ status: "error", error: "Invalid email password" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            JWT_SECRET
        );
        return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Inavlid password" });
});

auth.post("/register", async (req, res) => {
    const {
        name,
        email,
        college,
        branch,
        year,
        contact,
        password: plainTextPassword,
        // confirm,
    } = req.body;

    if (!email || typeof email !== "string") {
        return res.json({ status: "error", error: "Invalid Email" });
    }
    if (!plainTextPassword || typeof email !== "string") {
        return res.json({ status: "error", error: "Invalid Password" });
    }
    if (plainTextPassword.length < 5) {
        return res.json({ status: "error", error: "Passowrd too small" });
    }
    
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            name,
            email,
            college,
            branch,
            year,
            contact,
            password,
            // confirm,
        });
        console.log("User created successfully!", response);
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                status: "error",
                error: "Username already exists!",
            });
        }
        throw error;
    }
    res.json({ status: "ok" });
});

module.exports = auth;

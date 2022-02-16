const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        college: { type: String, require: true },
        branch: { type: String, require: true },
        year: { type: Number, require: true },
        contact: { type: Number, require: true },
        password: { type: String, require: true },
        confirm: { type: String, require: true },
    },
    { collection: "users" }
);
const model = mongoose.model("userSchema", userSchema);

module.exports = model;

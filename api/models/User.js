const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
     Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
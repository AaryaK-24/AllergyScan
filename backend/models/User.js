const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    allergens: { 
        type: [String], 
        default: []  // Stores user's allergens
    }
});

module.exports = mongoose.model("User", UserSchema);

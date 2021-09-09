const mongoose = require("mongoose");
const validator = require("validator");
const { TokenSchema } = require("./token.model");

const Schema = mongoose.Schema;

const validateEmail = (email) => {
    return validator.isEmail(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, "Please fill a valid email address"],
    },
    age: {
        type: Number,
        min: 5,
        max: 80,
    },
    phone: {
        type: String,
        maxLength: 11,
    },
    role: {
        type: String,
        enum: ["ADMIN", "ADMIN", "CLIENT"],
        default: "CLIENT",
    },
    avatar: {
        type: String,
        default:
            "https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg",
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    token: {
        type: TokenSchema,
    },
    showtimes: [{ type: Schema.Types.ObjectId, ref: "showtime" }],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

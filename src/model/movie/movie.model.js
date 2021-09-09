const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    movie_name: {
        type: String,
        maxLength: 255,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        maxLength: 255,
    },
    start_date: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        default: 10,
        min: 1,
        max: 10,
    },
    poster: {
        type: String,
    },
    trailer: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const Movie = mongoose.model("movie", MovieSchema);

const validateSchema = (user) => {
    const schema = Joi.object({
        movie_name: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = Movie;

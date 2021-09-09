const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CineplexSchema = new Schema({
    cineplex_name: {
        type: String,
        required: true,
        maxLength: 255,
    },
    logo: {
        type: String,
        // required: true,
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

const Cineplex = mongoose.model("cineplex", CineplexSchema);

module.exports = Cineplex;

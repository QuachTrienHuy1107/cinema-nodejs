const mongoose = require("mongoose");
const { TicketSchema } = require("../ticket/ticket.model");

const Schema = mongoose.Schema;

const ShowtimeSchema = new Schema({
    time: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    cinema: {
        type: Schema.Types.ObjectId,
        ref: "cinema",
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie",
    },
    tickets: [
        {
            type: TicketSchema,
        },
    ],
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});
const Showtime = mongoose.model("showtime", ShowtimeSchema);

module.exports = { Showtime, ShowtimeSchema };

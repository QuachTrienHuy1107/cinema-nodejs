const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    seat_number: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Normal", "Vip"],
    },
    status: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
        min: 75000,
        max: 250000,
        default: 75000,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
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
const Ticket = mongoose.model("ticket", TicketSchema);

module.exports = { Ticket, TicketSchema };

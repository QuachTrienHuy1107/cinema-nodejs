const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movie",
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },

    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;

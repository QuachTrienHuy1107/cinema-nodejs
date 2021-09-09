const Comment = require("../model/comment/comment.model");
const Movie = require("../model/movie/movie.model");

/**
 * @Desc Create a new local account.
 */
const addNewComment = async (req, res) => {
    const { content, movieId, userId } = req.body;
    if (!movieId || !userId || !content) return res.status(404).json({ success: false, message: "Missing data" });
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(401).json({ success: false, message: "Movie not found" });

        //Create new comment for a movie

        const newCmt = new Comment({ movie: movieId, user: userId, content });
        await newCmt.save();
        res.json({
            success: true,
            message: "Comment created successfully",
            data: newCmt,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getAllComment = async (req, res) => {
    const { movieId } = req.body;
    try {
        const comments = await Comment.aggregate([{ $match: {} }, { $group: { content: "$content" } }]);
        // const comments = await Comment.distinct("movie").populate("movie");
        res.json({
            success: true,
            data: comments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { addNewComment, getAllComment };

const Movie = require("../model/movie/movie.model");
const { Showtime } = require("../model/showtime/showtime.model");

/**
 * @Desc get all movie
 */
const getAllMovie = async (req, res) => {
    try {
        const movielist = await Movie.find();
        return res.status(200).json({ success: true, movielist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get paginate movie
 */
const getPaginateMovie = async (req, res) => {
    const { page, size } = req.query;
    if (!page || !size) return res.status(404).json({ message: "Missing current page or limit size" });
    const currentPage = page * 1 || 1;
    const limit = size * 1 || 9;
    const skip = (currentPage - 1) * limit;
    try {
        const movie = await Movie.aggregate([
            {
                $skip: +skip,
            },
            {
                $limit: +limit,
            },
        ]);
        return res.status(200).json({ success: true, movie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * @Desc get paginate movie
 */
const getMovieDetail = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const movie = await Movie.findById(id, { _id: 0, __v: 0 });
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        const showtimeWithMovie = await Showtime.find({ movie: id }).populate({ path: "cinema" });

        console.log("showtimeWithMovie", showtimeWithMovie);

        return res.status(200).json({ success: true, movie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
/**
 * @Desc Add new movie
 */
const addMovie = async (req, res) => {
    const { poster } = req;
    const { movie_name, description, start_date, time } = req.body;

    const urlImage = `${Date.now()}_${poster?.originalname}`;

    try {
        const movie = await Movie.findOne({ movie_name });
        if (movie) return res.status(404).json("Movie is already!");

        const data = new Movie({
            movie_name,
            description,
            start_date,
            time,
            poster: urlImage,
        });

        await data.save();
        res.json({
            success: true,
            message: "Post created successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const editMovie = async (req, res) => {
    const { id } = req.params;
    const { movie_name, description, start_date, time, rating, showtime } = req.body;
    if (!movie_name) {
        return res.status(404).json({ success: false, message: "Movie name is not empty!!" });
    }

    try {
        const movie = await Movie.findOne({ movie_name });
        if (movie) return res.status(400).json("Movie is already!");

        const data = {
            ...req.body,
            movie_name,
        };

        const updateCondition = { _id: id };
        const result = await Movie.findOneAndUpdate(updateCondition, data, { new: true });
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Movie not found or user not authorised",
            });
        }
        res.status(200).json({ success: true, message: "Edit successfully!", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * @Desc remove movie
 */
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Missing id" });
    try {
        const deleteCondition = { _id: id };
        const result = await Movie.findOneAndDelete(deleteCondition);
        console.log("result", result);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Movie not found or user not authorised",
            });
        }
        res.status(200).json({ success: true, message: "Remove successfully!", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { getAllMovie, getMovieDetail, getPaginateMovie, addMovie, editMovie, deleteMovie };

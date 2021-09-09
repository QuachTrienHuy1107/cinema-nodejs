const express = require("express");
const authRoute = require("./auth.route");
const cinemaRoute = require("./cinema.route");
const cineplexRoute = require("./cineplex.route");
const commentRoute = require("./comment.route");
const movieRoute = require("./movie.route");
const showtimeRoute = require("./showtime.route");
const userRoute = require("./user.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/movie", movieRoute);
router.use("/cinema", cinemaRoute);
router.use("/cineplex", cineplexRoute);
router.use("/showtime", showtimeRoute);
router.use("/comment", commentRoute);
router.use("/user", userRoute);

module.exports = router;

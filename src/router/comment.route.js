const express = require("express");
const { addNewComment, getAllComment } = require("../controller/comment.controller");
const commentRoute = express.Router();

/**
 * @method POST
 * @route /api/comment
 * @access Public
 */
commentRoute.post("/", addNewComment);

/**
 * @method POST
 * @route /api/comment
 * @access Public
 */
commentRoute.get("/", getAllComment);

module.exports = commentRoute;

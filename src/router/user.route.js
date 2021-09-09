const express = require("express");

const { getUserDetail } = require("../controller/user.controller");
const uploadImage = require("../middleware/update-image");
const { verifyToken } = require("../middleware/verify-token");
const userRoute = express.Router();

/**
 * @method GET
 * @route /api/user/:id
 * @access Private
 */
userRoute.get("/:id", getUserDetail);

module.exports = userRoute;

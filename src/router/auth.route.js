const express = require("express");
const authRoute = express.Router();
const { signup, login, forgotPassword, resetPassword, refreshToken } = require("../controller/auth.controller");

/**
 * @method POST
 * @route /api/auth/signup
 * @access Public
 */
authRoute.post("/signup", signup);

/**
 * @method POST
 * @route /api/auth/login
 * @access Public
 */
authRoute.post("/login", login);

/**
 * @method POST
 * @route /api/auth/token
 * @access Public
 */
authRoute.post("/token", refreshToken);

/**
 * @method POST
 * @route /api/auth/forgot-password
 * @access Public
 */
authRoute.post("/forgot-password", forgotPassword);

/**
 * @method PUT
 * @route /api/auth/reset-password
 * @access Public
 */
authRoute.put("/reset-password/:id/:token", resetPassword);

module.exports = authRoute;

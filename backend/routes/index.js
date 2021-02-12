const express = require("express");
const router = express.Router();
const booksRoute = require("./books");
const authRoute = require("./auth");

/**
 * @swagger
 *  tags:
 *      - books
 */
router.use("/books", booksRoute);
router.use("/auth", authRoute);

module.exports = router;

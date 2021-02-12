const express = require("express");
const router = express();

const booksRoute = require("./books-routes");
const authorsRoute = require("./authors-routes");
const authRoute = require("./auth-routes");

router.use("/books", booksRoute);
router.use("/authors", authorsRoute);
router.use("/auth", authRoute);

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3001;

const apiRoute = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use("/api", apiRoute);

app.listen(port);

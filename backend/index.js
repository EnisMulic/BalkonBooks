const express = require("express");
const bodyParser = require("body-parser");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swagger");

const port = process.env.PORT || 3001;

const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const apiRoute = require("./routes");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/api", apiRoute);

app.listen(port);

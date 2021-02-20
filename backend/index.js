const app = require("express")();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swagger");

const routes = {
    auth: require("./controllers/auth-controller"),
    books: require("./controllers/books-controller"),
    authors: require("./controllers/authors-controller"),
};

dotenv.config();

app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const prefix = "/api";
app.use(`${prefix}/auth`, routes.auth);
app.use(`${prefix}/books`, routes.books);
app.use(`${prefix}/authors`, routes.authors);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

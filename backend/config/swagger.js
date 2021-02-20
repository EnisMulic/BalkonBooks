module.exports = swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Books Api",
            version: "1.0.0",
            description: "",
            servers: ["http://localhost:3001"],
        },
        tags: [{ name: "books" }, { name: "authors" }, { name: "auth" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./controllers/*.js", "./models/*"],
};

module.exports = swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Books Api",
            version: "1.0.0",
            description: "",
            servers: ["http://localhost:3001"],
        },
        tags: [{ name: "books" }, { name: "authors" }, { name: "auth" }],
    },
    apis: ["./controllers/*.js"],
};

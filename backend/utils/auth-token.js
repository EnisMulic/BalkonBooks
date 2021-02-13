const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: "3600s",
    });
};

module.exports = generateAuthToken;

const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const userRepository = require("../repositories/users-repository");
const generateAuthToken = require("../utils/auth-token");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *       tags:
 *       - auth
 *       parameters:
 *       - in: requestBody
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: requestBody
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *       responses:
 *           200:
 *              description: A successful response
 */
router.post("/register", async (req, res) => {
    userRepository
        .create(req.body)
        .then(() => res.status(200).json())
        .catch((error) => res.status(500).json(error));
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *       tags:
 *       - auth
 *       parameters:
 *       - in: requestBody
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: requestBody
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *       responses:
 *           200:
 *              description: A successful response
 */
router.post("/login", async (req, res) => {
    const user = await userRepository.getByEmail(req.body.email);

    if (user === undefined) {
        return res.status(404).json({ error: "Email does not exist!" });
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.hash);

    if (!correctPassword) {
        return res.status(400).json({ error: "Wrong password" });
    } else {
        const token = generateAuthToken(user);
        return res.status(200).json({ token: token });
    }
});

module.exports = router;

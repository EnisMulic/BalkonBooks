const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *       tags:
 *          - auth
 *       responses:
 *           '200':
 *               description: A successful response
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *       tags:
 *          - auth
 *       responses:
 *           '200':
 *               description: A successful response
 */
router.post("/register", authController.register);

module.exports = router;

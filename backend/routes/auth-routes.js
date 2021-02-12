const express = require("express");
const router = express.Router();

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
router.post("/login", () => {});

module.exports = router;

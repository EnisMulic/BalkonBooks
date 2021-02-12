const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *       tags:
 *          - books
 *       responses:
 *           '200':
 *                  description: get list of books
 */
router.get("/", () => {});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: get single book
 *           '404':
 *                  description: not found
 */
router.get("/:id", () => {});

/**
 * @swagger
 * /api/books:
 *   post:
 *       tags:
 *          - books
 *       responses:
 *           '201':
 *                  description: create new book
 */
router.post("/", () => {});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: update book
 *           '404':
 *                  description: not found
 */
router.put("/:id", () => {});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: delete book
 *           '404':
 *                  description: not found
 */
router.delete("/:id", () => {});

/**
 * @swagger
 * /api/books/{id}/authors:
 *   get:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: get list of authors for {id} book
 *           '404':
 *                  description: not found book
 */
router.get("/:id/authors", () => {});

/**
 * @swagger
 * /api/books/{id}/authors:
 *   post:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: add new author to {id} book
 *           '404':
 *                  description: not found book
 */
router.post("/:id/authors", () => {});

/**
 * @swagger
 * /api/books/{idBook}/authors/{idAuthor}:
 *   delete:
 *       tags:
 *          - books
 *       parameters:
 *        - in: path
 *          name: idBook
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: idAuthor
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: delete {idAuthor} author from {idBook} book
 *           '404':
 *                  description: not found book or author
 */
router.delete("/:idBook/authors/:idAuthor", () => {});

module.exports = router;

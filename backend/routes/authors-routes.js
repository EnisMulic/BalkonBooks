const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/authors:
 *   get:
 *       tags:
 *          - authors
 *       responses:
 *           '200':
 *                  description: get list of authors
 */
router.get("/", () => {});

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: authors
 *           '404':
 *                  description: not found
 */
router.get("/:id", () => {});

/**
 * @swagger
 * /api/authors:
 *   post:
 *       tags:
 *          - authors
 *       responses:
 *           '201':
 *                  description: create new author
 */
router.post("/", () => {});

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: update author
 *           '404':
 *                  description: not found
 */
router.put("/:id", () => {});

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: delete author
 *           '404':
 *                  description: not found
 */
router.delete("/:id", () => {});

/**
 * @swagger
 * /api/authors/{idAuthor}/books:
 *   get:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: idAuthor
 *          required: true
 *          schema:
 *            type: uuid
 *       responses:
 *           '200':
 *                  description: get list books for {idAuthor} author
 *           '404':
 *                  description: not found author
 */
router.get("/:idAuthor/books", () => {});

/**
 * @swagger
 * /api/authors/{idAuthor}/books:
 *   post:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: idAuthor
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: add new book to {idAuthor} author
 *           '404':
 *                  description: not found author
 */
router.post("/:idAuthor/books", () => {});

/**
 * @swagger
 * /api/authors/{idAuthor}/books/{idBook}:
 *   delete:
 *       tags:
 *          - authors
 *       parameters:
 *        - in: path
 *          name: idAuthor
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: idBook
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           '200':
 *                  description: delete {idBook} book from {idAuthor} author
 *           '404':
 *                  description: not found book or author
 */
router.delete("/:idAuthor/books/:idBook", () => {});

module.exports = router;

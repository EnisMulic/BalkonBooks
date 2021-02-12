const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authors-controller");

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
router.get("/", authorsController.getAll);

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
router.get("/:id", authorsController.getById);

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
router.post("/", authorsController.create);

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
router.put("/:id", authorsController.update);

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
router.delete("/:id", authorsController.remove);

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
router.get("/:idAuthor/books", authorsController.getBooks);

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
router.post("/:idAuthor/books", authorsController.addBook);

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
router.delete(
    "/:idAuthor/books/:idBook",
    authorsController.removeAuthorFromBook
);

module.exports = router;

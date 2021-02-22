const express = require("express");
const router = express();

const authenticateToken = require("../middleware/auth-middleware");

const authorsRepository = require("../repositories/authors-repository");
const booksRepository = require("../repositories/books-repository");

/**
 * @swagger
 * /api/authors:
 *   get:
 *     tags:
 *     - authors
 *     parameters:
 *     - in: query
 *       name: page
 *       type: integer
 *     - in: query
 *       name: amount
 *       type: integer
 *     responses:
 *       200:
 *         description: get list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 */
router.get("/", async (req, res) => {
    authorsRepository
        .getAll(req.query.page, req.query.amount)
        .then((data) => res.status(200).json(data));
});

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
 *           200:
 *             description: get single author
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   allOf:
 *                   - $ref: '#/components/schemas/Author'
 *                   - type: object
 *                     properties:
 *                        books:
 *                          type: array
 *                          items:
 *                           $ref: '#/components/schemas/Book'
 *           404:
 *             description: not found
 */
router.get("/:id", async (req, res) => {
    const author = await authorsRepository.getById(req.params.id);

    if (author !== undefined) {
        res.status(200).json(author);
    } else {
        res.status(404).json();
    }
});

/**
 * @swagger
 * /api/authors:
 *   post:
 *    tags:
 *      - authors
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/NewAuthor'
 *    responses:
 *      201:
 *        description: create new author
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Author'
 */
router.post("/", authenticateToken, async (req, res) => {
    authorsRepository
        .create(req.body)
        .then(() => {
            res.status(201).json(req.body);
        })
        .catch((error) => {
            res.status(500).json();
        });
});

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
 *            format: guid
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewAuthor'
 *       responses:
 *           200:
 *              description: update author
 *           404:
 *              description: not found
 */
router.put("/", authenticateToken, async (req, res) => {
    const count = await authorsRepository.update(req.params.id, req.body);

    if (count !== 0) {
        return res.status(200).json();
    } else {
        return res.status(404).json();
    }
});

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
 *            format: guid
 *       responses:
 *           200:
 *             description: delete author
 *           404:
 *             description: not found
 */
router.delete("/", authenticateToken, async (req, res) => {
    const count = await authorsRepository.remove(req.params.id);

    if (count !== 0) {
        return res.status(200).json();
    } else {
        return res.status(404).json();
    }
});

/**
 * @swagger
 * /api/authors/{idAuthor}/books:
 *   get:
 *     tags:
 *     - authors
 *     parameters:
 *     - in: path
 *       name: idAuthor
 *       required: true
 *       schema:
 *         type: string
 *         format: guid
 *     - in: query
 *       name: page
 *       type: integer
 *     - in: query
 *       name: amount
 *       type: integer
 *     responses:
 *       200:
 *         description: get list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
router.get("/:idAuthor/books", async (req, res) => {
    authorsRepository
        .getBooks(req.params.idAuthor, req.query.page, req.query.amount)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            res.status(404).json();
        });
});

/**
 * @swagger
 * /api/authors/{idAuthor}/books:
 *   post:
 *    tags:
 *      - authors
 *    parameters:
 *    - in: path
 *      name: idAuthor
 *      required: true
 *      schema:
 *        type: string
 *        format: guid
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: add new book to {idAuthor} author
 *      404:
 *        description: not found author
 */
router.post("/:idAuthor/books", authenticateToken, async (req, res) => {
    authorsRepository
        .addBook(req.params.idAuthor, req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((_) => res.status(404).json());
});

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
 *            format: guid
 *        - in: path
 *          name: idBook
 *          required: true
 *          schema:
 *            type: string
 *       responses:
 *           200:
 *             description: delete {idAuthor} author from {idBook} book
 *           404:
 *             description: not found book or author
 */
router.delete(
    "/:idAuthor/books/:idBook",
    authenticateToken,
    async (req, res) => {
        const count = await booksRepository.removeAuthorFromBook(
            req.params.idBook,
            req.params.idAuthor
        );

        if (count !== 0) {
            return res.status(200).json();
        } else {
            return res.status(404).json();
        }
    }
);

module.exports = router;

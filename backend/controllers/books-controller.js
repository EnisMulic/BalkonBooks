const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth-middleware");

const booksRepository = require("../repositories/books-repository");

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *     - books
 *     responses:
 *       200:
 *         description: get list of books
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
router.get("/", async (req, res) => {
    booksRepository.getAll().then((data) => res.status(200).json(data));
});

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
 *           200:
 *             description: get single book
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   allOf:
 *                   - $ref: '#/components/schemas/Book'
 *                   - type: object
 *                     properties:
 *                        authors:
 *                          type: array
 *                          items:
 *                           $ref: '#/components/schemas/Author'
 *           404:
 *             description: not found
 */
router.get("/:id", async (req, res) => {
    const book = await booksRepository.getById(req.params.id);

    if (book !== undefined) {
        return res.status(200).json(book);
    } else {
        return res.status(404).json();
    }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *    tags:
 *      - books
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Book'
 *    responses:
 *      201:
 *        description: create new book
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Book'
 */
router.post("/", authenticateToken, async (req, res) => {
    booksRepository
        .create(req.body)
        .then((data) => {
            res.status(201).json(req.body);
        })
        .catch((error) => {
            res.status(500);
        });
});

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
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *           200:
 *              description: update book
 *           404:
 *              description: not found
 */
router.put("/:id", authenticateToken, async (req, res) => {
    const count = await booksRepository.update(req.params.id, req.body);

    if (count !== 0) {
        return res.status(200).json();
    } else {
        return res.status(404).json();
    }
});

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
 *           200:
 *             description: delete book
 *           404:
 *             description: not found
 */
router.delete("/:id", authenticateToken, async (req, res) => {
    const count = await booksRepository.remove(req.params.id);

    if (count !== 0) {
        return res.status(200).json();
    } else {
        return res.status(404).json();
    }
});

/**
 * @swagger
 * /api/books/{id}/authors:
 *   get:
 *     tags:
 *     - books
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: get list of authors for {id} book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 *       404:
 *          description: not found book
 */
router.get("/:id/authors", async (req, res) => {
    booksRepository
        .getAuthors(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            res.status(404).json();
        });
});

/**
 * @swagger
 * /api/books/{id}/authors:
 *   post:
 *    tags:
 *      - books
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/NewAuthor'
 *    responses:
 *      200:
 *        description: add new author to {id} book
 *      404:
 *        description: not found book
 */
router.post("/:id/authors", authenticateToken, async (req, res) => {
    booksRepository
        .addAuthor(req.params.id, req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((_) => res.status(404).json());
});

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
 *            format: guid
 *       responses:
 *           200:
 *             description: delete {idAuthor} author from {idBook} book
 *           404:
 *             description: not found book or author
 */
router.delete(
    "/:idBook/authors/:idAuthor",
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

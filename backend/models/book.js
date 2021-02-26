/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *      - isbn
 *      - title
 *      - pages
 *      - published
 *      properties:
 *        isbn:
 *          type: string
 *          example: 978-3-16-148410-0
 *        title:
 *          type: string
 *          example: The Hobbit
 *        pages:
 *          type: integer
 *          example: 310
 *        published:
 *          type: integer
 *          example: 1937
 *        image:
 *          type: string
 *          format: url
 */

const book = {
    isbn: String, // International Standard Book Number (unique)
    title: String,
    pages: Number, // Total page numbers
    published: Number, // Year of publication
    authors: [], // Zero, one or multiple authors,
    image: String, // URL of image
};

module.exports = book;

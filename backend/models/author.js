/**
 * @swagger
 * components:
 *  schemas:
 *    NewAuthor:
 *      type: object
 *      required:
 *      - firstName
 *      - lastName
 *      properties:
 *        firstName:
 *          type: string
 *          example: J. R. R.
 *        lastName:
 *          type: string
 *          example: Tolkien
 *        dob:
 *          type: string
 *          format: date-time
 *          example: 1892-01-03
 *        image:
 *          type: string
 *          format: url
 *    Author:
 *       allOf:
 *         - type: object
 *           properties:
 *              id:
 *                type: string
 *                format: guid
 *                example: f1691d8d-7680-4a29-acd9-1e1494b2105e
 *         - $ref: '#/components/schemas/NewAuthor'
 */

const author = {
    // id: guid,
    firstName: String,
    lastName: String,
    dob: Date, // date of birth
    books: [], // Zero, one or multiple books,
    image: String, // URL of image
};

module.exports = author;

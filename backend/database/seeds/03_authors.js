const { v4: uuidv4 } = require("uuid");

exports.seed = (knex) => {
    const ids = [];
    for (let i = 0; i < 9; i++) {
        ids.push(uuidv4());
    }
    // Deletes ALL existing entries
    return knex("author")
        .del()
        .then(() => knex("book_author").del())
        .then(() => {
            return knex("author").insert([
                {
                    id: ids[0],
                    firstName: "J. K.",
                    lastName: "Rowling",
                    dob: new Date(1965, 7, 31),
                },
                {
                    id: ids[1],
                    firstName: "Antoine",
                    lastName: "de Saint-Exupéry",
                    dob: new Date(1900, 6, 29),
                },
                {
                    id: ids[2],
                    firstName: "Cao",
                    lastName: "Xueqin",
                    dob: new Date(1715, 1, 1),
                },
                {
                    id: ids[3],
                    firstName: "J. R. R.",
                    lastName: "Tolkien",
                    dob: new Date(1892, 1, 3),
                },
                {
                    id: ids[4],
                    firstName: "Agatha",
                    lastName: "Christie",
                    dob: new Date(1890, 9, 15),
                },
                {
                    id: ids[5],
                    firstName: "C. S.",
                    lastName: "Lewis",
                    dob: new Date(1898, 11, 29),
                },
                {
                    id: ids[6],
                    firstName: "Henry",
                    lastName: "Rider Haggard",
                    dob: new Date(1856, 6, 22),
                },
                {
                    id: ids[7],
                    firstName: "Carlo",
                    lastName: "Collodi",
                    dob: new Date(1856, 11, 24),
                },
                {
                    id: ids[8],
                    firstName: "Dan",
                    lastName: "Brown",
                    dob: new Date(1964, 6, 22),
                },
            ]);
        })
        .then(() => {
            // Inserts seed entries
            return knex("book_author").insert([
                { isbn: "9781338596700", author_id: ids[0] },
                { isbn: "9780544656499", author_id: ids[1] },
                { isbn: "9780385093798", author_id: ids[2] },
                { isbn: "9780547928227", author_id: ids[3] },
                { isbn: "9780062073488", author_id: ids[4] },
                { isbn: "9780064404990", author_id: ids[5] },
                { isbn: "9781925110135", author_id: ids[6] },
                { isbn: "9780199553983", author_id: ids[7] },
                { isbn: "9780307474278", author_id: ids[8] },
                { isbn: "9781338716535", author_id: ids[0] },
                { isbn: "9781338299168", author_id: ids[0] },
            ]);
        });
};

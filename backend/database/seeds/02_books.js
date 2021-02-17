exports.seed = (knex) => {
    // Deletes ALL existing entries
    return knex("book")
        .del()
        .then(() => {
            // Inserts seed entries
            return knex("book").insert([
                {
                    isbn: "9781338596700",
                    title: "Harry Potter and the Philosopher's Stone",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780544656499",
                    title: "The Little Prince",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780385093798",
                    title: "Dream of the Red Chamber",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780547928227",
                    title: "The Hobbit",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780062073488",
                    title: "And Then There Were None",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780064404990",
                    title: "The Lion, the Witch and the Wardrobe",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9781925110135",
                    title: "She: a History of Adventure",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780199553983",
                    title: "The Adventures of Pinocchio",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9780307474278",
                    title: "The Da Vinci Code",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9781338716535",
                    title: "Harry Potter and the Chamber of Secrets",
                    pages: 200,
                    published: 2000,
                },
                {
                    isbn: "9781338299168",
                    title: "Harry Potter and the Prisoner of Azkaban",
                    pages: 200,
                    published: 2000,
                },
            ]);
        });
};

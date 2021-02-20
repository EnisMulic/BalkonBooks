const db = require("../database/knex");

const getAll = async () => {
    const books = await db("author");
    return books;
};

const getById = async (id) => {
    let author = await db("author").where({ id: id }).first();
    let books = await getBooks(id);

    author.books = [...books];
    return author;
};

const create = async (entity) => {
    return await db("author").insert(entity).into(table);
};

const update = async (id, entity) => {
    return await db("author")
        .where({ id: id })
        .update({
            firstName: entity.firstName || null,
            lastName: entity.lastName || null,
            dob: entity.dob || null,
            image: entity.image || null,
        });
};

const remove = async (id) => {
    return await db("author").where({ id: id }).del();
};

const getBooks = async (id) => {
    return await db("book").whereIn(
        "isbn",
        db("book_author").select("isbn").where("author_id", id)
    );
};

const addBook = async (authorId, book) => {
    await db("book").insert(book);
    await db("book_author").insert({ isbn: book.isbn, author_id: authorId });
    return book;
};

module.exports = { getAll, getById, create, update, remove, getBooks, addBook };

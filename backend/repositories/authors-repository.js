const db = require("../database/knex");

const table = "author";

const getAll = async () => {
    const books = await db(table);
    return books;
};

const getById = async (id) => {
    let author = await db.select().from(table).where({ id: id }).first();
    let books = await getBooks(id);

    author.books = [...books];
    return author;
};

const create = async (entity) => {
    return await db.insert(entity).into(table);
};

const update = async (id, entity) => {
    return await db(table)
        .where({ id: id })
        .update({
            firstName: entity.firstName || null,
            lastName: entity.lastName || null,
            dob: entity.dob || null,
            image: entity.image || null,
        });
};

const remove = async (id) => {
    return await db.select().from(table).where({ id: id }).del();
};

const getBooks = async (id) => {
    return await db
        .select()
        .from("book")
        .whereIn(
            "isbn",
            db("book_author").select("isbn").where("author_id", id)
        );
};

const addBook = async (authorId, book) => {
    await db.insert(book).into("book");
    await db
        .insert({ isbn: book.isbn, author_id: authorId })
        .into("book_author");
};

module.exports = { getAll, getById, create, update, remove, getBooks, addBook };

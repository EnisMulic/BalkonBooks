const { v4: uuidv4 } = require("uuid");
const db = require("../database/knex");

const getAll = async () => {
    const books = await db("book");
    return books;
};

const getById = async (id) => {
    let book = await db("book").where({ isbn: id }).first();
    let authors = await getAuthors(id);

    book.authors = [...authors];
    return book;
};

const create = async (entity) => {
    return await db("book").insert(entity);
};

const update = async (id, entity) => {
    return await db("book")
        .where({ isbn: id })
        .update({
            title: entity.title || null,
            pages: entity.pages || null,
            published: entity.published || null,
            image: entity.image || null,
        });
};

const remove = async (id) => {
    return await db("book").where({ isbn: id }).del();
};

const getAuthors = async (id) => {
    return await db("author").whereIn(
        "id",
        db("book_author").select("author_id").where("isbn", id)
    );
};

const addAuthor = async (bookId, author) => {
    const authorId = uuidv4();
    const newAuthor = { id: authorId, ...author };
    await db("author").insert(newAuthor);
    await db("book_author").insert({ isbn: bookId, author_id: authorId });
    return newAuthor;
};

const removeAuthorFromBook = async (bookId, authorId) => {
    return await db("book_author")
        .where({ isbn: bookId, author_id: authorId })
        .del();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getAuthors,
    addAuthor,
    removeAuthorFromBook,
};

const { v4: uuidv4 } = require("uuid");
const db = require("../database/knex");
const author = require("../models/author");

const table = "book";

const getAll = async () => {
    const books = await db(table);
    return books;
};

const getById = async (id) => {
    return await db.select().from(table).where({ isbn: id }).first();
};

const create = async (entity) => {
    return await db.insert(entity).into(table);
};

const update = async (id, entity) => {
    return await db(table)
        .where({ isbn: id })
        .update({
            title: entity.title || null,
            pages: entity.pages || null,
            published: entity.published || null,
            image: entity.image || null,
        });
};

const remove = async (id) => {
    return await db.select().from(table).where({ isbn: id }).del();
};

const getAuthors = async (id) => {
    return await db
        .select()
        .from("author")
        .whereIn("id", db("book_author").select("author_id").where("isbn", id));
};

const addAuthor = async (bookId, author) => {
    const authorId = uuidv4();
    await db.insert({ id: authorId, ...author }).into("author");
    await db.insert({ isbn: bookId, author_id: authorId }).into("book_author");
};

const removeAuthorFromBook = async (bookId, authorId) => {
    return await db
        .select()
        .from("book_author")
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

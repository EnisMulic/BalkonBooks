const db = require("../database/knex");

const getAll = async (firstName, lastName, page, amount) => {
    let dbSet = db("author");

    if (typeof firstName !== "undefined" || typeof lastName !== "undefined") {
        dbSet = dbSet
            .where("firstName", "like", `%${firstName}%`)
            .orWhere("lastName", "like", `%${lastName}%`);
    }

    const authors = await dbSet.paginate({
        perPage: amount,
        currentPage: page,
    });

    return authors;
};

const getById = async (id) => {
    let author = await db("author").where({ id: id }).first();
    let books = await getBooks(id);

    author.books = [...books.data];
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

const getBooks = async (id, page, amount) => {
    return await db("book")
        .whereIn(
            "isbn",
            db("book_author").select("isbn").where("author_id", id)
        )
        .paginate({
            perPage: amount,
            currentPage: page,
        });
};

const addBook = async (authorId, book) => {
    await db("book").insert(book);
    await db("book_author").insert({ isbn: book.isbn, author_id: authorId });
    return book;
};

module.exports = { getAll, getById, create, update, remove, getBooks, addBook };

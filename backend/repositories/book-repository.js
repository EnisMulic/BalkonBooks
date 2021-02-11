const db = require("../database/knex");

const table = "book";

const getAll = async () => {
    return await db.select().from(table);
};

const getById = async (id) => {
    return await db.select().from(table).where({ isbn: id });
};

const create = async (entity) => {
    return await db.insert(entity).into(table);
};

const update = async (id, entity) => {
    await db(table)
        .where({ isbn: id })
        .update({
            isbn: id,
            title: entity.title || null,
            pages: entity.pages || null,
            published: entity.published || null,
            image: entity.image || null,
        });
};

const remove = async (id) => {
    await db.select().from(table).where({ isbn: id }).del();
};

module.exports = { getAll, getById, create, update, remove };

const db = require("../database/knex");

const table = "author";

const getAll = async () => {
    const books = await db(table);
    return books;
};

const getById = async (id) => {
    return await db.select().from(table).where({ id: id }).first();
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

module.exports = { getAll, getById, create, update, remove };

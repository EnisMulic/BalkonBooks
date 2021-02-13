const bcrypt = require("bcryptjs");
const db = require("../database/knex");

const getByEmail = async (email) => {
    return await db.select().from("user").where({ email: email }).first();
};

const create = async (entity) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(entity.password, salt);
    const user = { email: entity.email, hash: hash };
    return await db.insert(user).into("user");
};

module.exports = { getByEmail, create };

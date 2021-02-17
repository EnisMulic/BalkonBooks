const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.seed = async (knex) => {
    // Deletes ALL existing entries
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("test123!", salt);

    return knex("user")
        .del()
        .then(() => {
            // Inserts seed entries
            return knex("user").insert([
                { id: uuidv4(), email: "a@a.com", hash: hash },
            ]);
        });
};

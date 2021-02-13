exports.up = function (knex) {
    return knex.schema.alterTable("user", (table) => {
        table.dropColumn("salt");
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("user", (table) => {
        table.string("salt", 16).unique().notNullable();
    });
};

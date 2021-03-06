exports.up = function (knex) {
    return knex.schema.dropTable("book_author");
};

exports.down = function (knex) {
    return knex.schema.createTable("book_author", (table) => {
        table.string("isbn", 13).notNullable();
        table.uuid("author_id");
        table.primary(["isbn", "author_id"]);
        table.foreign("isbn").references("isbn").inTable("book");
        table.foreign("author_id").references("id").inTable("author");
    });
};

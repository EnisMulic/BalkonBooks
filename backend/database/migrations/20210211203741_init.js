exports.up = function (knex) {
    return knex.schema
        .createTable("book", (table) => {
            table.string("isbn", 13).notNullable().primary();
            table.string("title", 255).notNullable();
            table.integer("pages").unsigned().notNullable();
            table.integer("published").unsigned().nullable();
            table.string("image", 255);
        })
        .createTable("author", (table) => {
            table.uuid("id").primary();
            table.string("firstName", 255).notNullable();
            table.string("lastName", 225).notNullable();
            table.date("dob").notNullable();
            table.string("image", 255);
        })
        .createTable("book_author", (table) => {
            table.string("isbn", 13).notNullable();
            table.uuid("author_id");
            table.primary(["isbn", "author_id"]);
            table.foreign("isbn").references("isbn").inTable("book");
            table.foreign("author_id").references("id").inTable("author");
        })
        .createTable("user", (table) => {
            table.uuid("id").primary();
            table.string("email", 255).unique().notNullable();
            table.string("salt", 16).unique().notNullable();
            table.string("hash", 128).unique().notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("book")
        .dropTable("author")
        .dropTable("book_author")
        .dropTable("user");
};

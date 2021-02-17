// Update with your config settings.

module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: "localhost",
            database: "balkon_books",
            user: "root",
            password: "password",
        },
        migrations: {
            directory: "./database/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },

    production: {
        client: "mysql",
        connection: {
            host: "localhost",
            database: "balkon_books",
            user: "root",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./database/migrations",
            tableName: "knex_migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
};

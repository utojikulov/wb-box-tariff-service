import { Knex } from "knex"

export const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5433,
            database: 'postrges',
            user: 'postrges',
            password: 'postrges'
        }
    },
    // migrations: {
    //     directory: "../../database/migrations",
    // },
    // seeds: {
    //     directory: "../../src/database/seeds",
    // },
}

import { Knex } from "knex"

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5433,
            database: 'postgres',
            user: 'postgres',
            password: 'postgres'
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    }
}

export default knexConfig

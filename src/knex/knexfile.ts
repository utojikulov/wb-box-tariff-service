import { Knex } from "knex"

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: 'db',
            port: 5432,
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

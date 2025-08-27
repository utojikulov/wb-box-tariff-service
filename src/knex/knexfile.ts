import { ConfigService } from "../config/env/config.service";
import { Knex } from "knex"

const configService = new ConfigService()

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: configService.get('DB_HOST') ?? 'localhost',
            port: 5432,
            database: configService.get('DB_NAME') ?? 'postgres',
            user: configService.get('DB_USER') ?? 'postgres',
            password: configService.get('DB_PWD') ?? 'postgres'
        },
        migrations: {
            directory: "./src/knex/migrations",
            extension: "ts"
        },
        seeds: {
            directory: "./src/knex/seeds"
        }
    }
}

export default knexConfig

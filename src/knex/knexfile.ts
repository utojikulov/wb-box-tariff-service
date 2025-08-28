import { ConfigService } from "../config/env/config.service";
import { Knex } from "knex"

const configService = new ConfigService()

const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: configService.get('DB_HOST'),
            port: 5432,
            database: configService.get('DB_NAME'),
            user: configService.get('DB_USER'),
            password: configService.get('DB_PWD')
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

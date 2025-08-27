import type { Knex } from "knex";

// TODO id to uuid 

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tariff_meta", (table) => {
        table.increments("id").primary()
        table.date("dt_next_box").nullable()
        table.date("dt_till_max").notNullable()
    })

    await knex.schema.createTable("warehouse_tariffs", (table) => {
        table.increments("id").primary()
        table
            .integer("tariff_meta_id")
            .unsigned()
            .references("id")
            .inTable("tariff_meta")
            .onDelete("CASCADE")

        table.string("warehouse_name").notNullable()
        table.string("geo_name").notNullable()

        table.decimal("box_delivery_base", 10, 2).notNullable();
        table.decimal("box_delivery_coef_expr", 10, 2).notNullable()
        table.decimal("box_delivery_liter", 10, 2).notNullable()

        table.decimal("box_delivery_marketplace_base", 10, 2).notNullable()
        table.decimal("box_delivery_marketplace_coef_expr", 10, 2).notNullable()
        table.decimal("box_delivery_marketplace_liter", 10, 2).notNullable()

        table.decimal("box_storage_base", 10, 2).notNullable()
        table.decimal("box_storage_coef_expr", 10, 2).notNullable()
        table.decimal("box_storage_liter", 10, 2).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("warehouse_tariffs")
    await knex.schema.dropTableIfExists("tariff_meta")
}


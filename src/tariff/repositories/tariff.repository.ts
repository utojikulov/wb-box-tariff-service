import { KnexService } from "../../knex/knex.service"

export class TariffRepo {
    private db

    constructor() {
        this.db = KnexService.getConnection()
    }

    async findByDate(dtNextBox: string) {
        if (!dtNextBox) throw new Error('dtNextBox is required in findByDate')
        return this.db("tariff_meta").where({ dt_next_box: dtNextBox }).first()
    }

    async create(meta: { dt_next_box: string; dt_till_max: string }) {
        const [created] = await this.db("tariff_meta").insert(meta).returning("*");
        return created;
    }

    async getTariffsSorted() {
        return this.db("warehouse_tariffs as wt")
            .join("tariff_meta as tm", "wt.tariff_meta_id", "tm.id")
            .select(
                "wt.id",
                "wt.warehouse_name",
                "wt.geo_name",
                "wt.box_delivery_base",
                "wt.box_delivery_coef_expr",
                "wt.box_delivery_liter",
                "wt.box_delivery_marketplace_base",
                "wt.box_delivery_marketplace_coef_expr",
                "wt.box_delivery_marketplace_liter",
                "wt.box_storage_base",
                "wt.box_storage_coef_expr",
                "wt.box_storage_liter",
                "tm.dt_next_box",
                "tm.dt_till_max"
            )
            .orderBy("wt.box_delivery_coef_expr", "asc")
    }
}

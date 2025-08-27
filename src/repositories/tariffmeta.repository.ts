import { KnexService } from "../knex/knex.service"

export class TariffMetaRepo {
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
}

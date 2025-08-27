import { KnexService } from "../../knex/knex.service";

export class WareHouseRepository {
   private db;

   constructor() {
      this.db = KnexService.getConnection();
   }

   async findAllByMetaId(metaId: number) {
      return this.db("warehouse_tariffs").where({ tariff_meta_id: metaId });
   }

   async findByWarehouse(metaId: number, warehouseName: string) {
      return this.db("warehouse_tariffs")
         .where({ tariff_meta_id: metaId, warehouse_name: warehouseName })
         .first();
   }

   async create(metaId: number, data: any) {
      return this.db("warehouse_tariffs")
         .insert({ ...data, tariff_meta_id: metaId })
         .returning("*");
   }

   async update(id: number, data: any) {
      return this.db("warehouse_tariffs")
         .where({ id })
         .update(data)
         .returning("*");
   }
}

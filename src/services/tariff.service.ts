import { ITariffMeta } from "../common/types/tariffmeta.interface";
import { TariffMetaRepo } from "../repositories/tariffmeta.repository";
import { WareHouseRepository } from "../repositories/warehouse.repository";

export class TariffService {
   metaReop: TariffMetaRepo;
   warehouseRepo: WareHouseRepository;

   constructor() {
      this.metaReop = new TariffMetaRepo();
      this.warehouseRepo = new WareHouseRepository();
   }

   // gotta write some dtos
   async save(data: ITariffMeta) {
      const { dtNextBox, dtTillMax, warehouseList } = data;

      let meta = await this.metaReop.findByDate(dtNextBox);
      if (!meta) {
         meta = await this.metaReop.create({
            dt_next_box: dtNextBox,
            dt_till_max: dtTillMax,
         });
      }

      for (const warehouse of warehouseList) {
         const existing = await this.warehouseRepo.findByWarehouse(
            meta.id,
            warehouse.warehouse_name,
         );

         const data_prep = {
            warehouse_name: warehouse.warehouse_name,
            geo_name: warehouse.geo_name,
            box_delivery_base: warehouse.box_delivery_base,
            box_delivery_coef_expr: warehouse.box_delivery_coef_expr,
            box_delivery_liter: warehouse.box_delivery_liter,
            box_delivery_marketplace_base: warehouse.box_delivery_marketplace_base,
            box_delivery_marketplace_coef_expr: warehouse.box_delivery_marketplace_coef_expr,
            box_delivery_marketplace_liter: warehouse.box_delivery_marketplace_liter,
            box_storage_base: warehouse.box_storage_base,
            box_storage_coef_expr: warehouse.box_storage_coef_expr,
            box_storage_liter: warehouse.box_storage_liter,
         };

         if (existing) {
            await this.warehouseRepo.update(existing.id, data_prep);
         } else {
            await this.warehouseRepo.create(meta.id, data_prep);
         }
      }
   }
}

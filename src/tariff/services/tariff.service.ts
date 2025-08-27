import { ITariffMeta } from "../../common/types/tariffmeta.interface";
import { TariffRepo } from "../repositories/tariff.repository";
import { WareHouseRepository } from "../repositories/warehouse.repository";

export class TariffService {
    metaReop: TariffRepo;
    warehouseRepo: WareHouseRepository;

    constructor() {
        this.metaReop = new TariffRepo();
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

        const normalizingObj = (obj: Record<string, any>) => {
            return Object.fromEntries(
                Object.entries(obj).map(([key, val]) => {
                    if (val === "-") {
                        return [key, 0]
                    }
                    if (typeof val === "string" && val.includes(",")) {
                        return [key, parseFloat(val.replace(",", "."))]
                    }
                    return [key, val]
                })
            )

        }


        for (const warehouse of warehouseList) {
            const existing = await this.warehouseRepo.findByWarehouse(
                meta.id,
                warehouse.warehouseName,
            );

            const raw_data = {
                warehouse_name: warehouse.warehouseName,
                geo_name: warehouse.geoName,
                box_delivery_base: warehouse.boxDeliveryBase,
                box_delivery_coef_expr: warehouse.boxDeliveryCoefExpr,
                box_delivery_liter: warehouse.boxDeliveryLiter,
                box_delivery_marketplace_base: warehouse.boxDeliveryMarketplaceBase,
                box_delivery_marketplace_coef_expr: warehouse.boxDeliveryMarketplaceCoefExpr,
                box_delivery_marketplace_liter: warehouse.boxDeliveryMarketplaceLiter,
                box_storage_base: warehouse.boxStorageBase,
                box_storage_coef_expr: warehouse.boxStorageCoefExpr,
                box_storage_liter: warehouse.boxStorageLiter,
            };

            const data_prep = normalizingObj(raw_data)

            if (existing) {
                await this.warehouseRepo.update(existing.id, data_prep);
            } else {
                await this.warehouseRepo.create(meta.id, data_prep);
            }
        }
    }
}

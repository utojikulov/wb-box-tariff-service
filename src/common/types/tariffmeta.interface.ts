export interface ITariffMeta {
    dtNextBox: string
    dtTillMax: string
    warehouseList: IWarehouseList[]
}

export interface IWarehouseList {
    warehouse_name: string,
    geo_name: string,
    box_delivery_base: string,
    box_delivery_coef_expr: string,
    box_delivery_liter: string,
    box_delivery_marketplace_base: string,
    box_delivery_marketplace_coef_expr: string,
    box_delivery_marketplace_liter: string,
    box_storage_base: string,
    box_storage_coef_expr: string,
    box_storage_liter: string,
}

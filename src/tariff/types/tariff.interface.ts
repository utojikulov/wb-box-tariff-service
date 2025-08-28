export interface ITariffMeta extends IWarehouseList {
    dtNextBox: string
    dtTillMax: string
}

export interface IWarehouseList {
    boxDeliveryBase: string,
    boxDeliveryCoefExpr: string,
    boxDeliveryLiter: string, 
    boxDeliveryMarketplaceBase: string,
    boxDeliveryMarketplaceCoefExpr: string,
    boxDeliveryMarketplaceLiter: string,
    boxStorageBase: string,
    boxStorageCoefExpr: string,
    boxStorageLiter: string,
    geoName: string,
    warehouseName: string,
}

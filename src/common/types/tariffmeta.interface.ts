export interface ITariffMeta {
    dtNextBox: string
    dtTillMax: string
    warehouseList: IWarehouseList[]
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

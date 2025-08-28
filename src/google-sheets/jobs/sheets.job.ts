import nodeCron from "node-cron";   
import { SheetsService } from "../services/sheets.service";
import { TariffRepo } from "../../tariff/repositories/tariff.repository";

export class SheetsJob {
    private sheetsService: SheetsService
    private tariffRepo: TariffRepo

    constructor() {
        this.tariffRepo = new TariffRepo()
        this.sheetsService = new SheetsService()
    }

    public async fetch() {
        const data = await this.tariffRepo.getTariffsSorted()
        if (!data) {
            throw new Error('No data.')
        }

        const sheet_title = "stocks_coefs_" + new Date().toISOString().split("T")[0]

        const exists = await this.sheetsService.sheetExists(sheet_title)

        if (!exists) {
            await this.sheetsService.createSheet(sheet_title)
            console.log(`Created a new sheet: ${sheet_title}`)
        }
        
        await this.sheetsService.writeData(sheet_title, data)
    }
    public start() {
        nodeCron.schedule("2 * * * *", () => {
            console.log('Syncing google sheets with db...')
            this.fetch()
        })
        this.fetch()
    }
}

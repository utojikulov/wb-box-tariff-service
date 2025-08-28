import nodeCron from "node-cron";
import { SheetsService } from "../services/sheets.service";

export class SheetsJob {
    private sheetsService: SheetsService

    constructor() {
        this.sheetsService = new SheetsService()
    }

    public start() {
        nodeCron.schedule("0 * * * *", () => this.save());
        this.save();
    }
}

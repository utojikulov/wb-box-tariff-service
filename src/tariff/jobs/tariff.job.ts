import nodeCron from "node-cron";
import { ApiClient } from "../../client/api.client";
import { TariffService } from "../services/tariff.service";

export class TariffJob {
    private apiClient: ApiClient;
    private tariffService: TariffService;
    private lastSave: Date | null = null

    constructor() {
        this.apiClient = new ApiClient();
        this.tariffService = new TariffService();
    }

    public async save() {
        try {
            const response = await this.apiClient.getTariffs();

            const tariffData = response?.response?.data

            if (!tariffData) {
                throw new Error('Invalid or missing tariff data from API');
            }

            await this.tariffService.save(tariffData);

            this.lastSave = new Date()
            console.log(`[${new Date().toISOString()}] Tariffs updated successfully`);

        } catch (error) {
            console.error(
                `[${new Date().toISOString()}] Error occured when updateing tariffs:`,
                error,
            );
        }
    }

    public start() {
        nodeCron.schedule("0 * * * *", async () => {
            await this.save()
        });
        this.save();
    }
}

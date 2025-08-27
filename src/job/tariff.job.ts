import nodeCron from "node-cron";
import { ApiClient } from "../client/api.client";
import { ConfigService } from "../config/config.service";
import { TariffService } from "../services/tariff.service";

export class TariffJob {
   private apiClient: ApiClient;
   private tariffService: TariffService;

   constructor() {
      const configService = new ConfigService();
      this.apiClient = new ApiClient(configService);
      this.tariffService = new TariffService();
   }

   public async save() {
      try {
         const data = await this.apiClient.getTariffs();
         await this.tariffService.save(data);
         console.log(
            `[${new Date().toISOString()}] Tariffs updated successfully`,
         );
      } catch (error) {
         console.error(
            `[${new Date().toISOString()}] Error occured when updateing tariffs:`,
            error,
         );
      }
   }

   public start() {
      nodeCron.schedule("0 * * * *", () => this.save());
      this.save();
   }
}

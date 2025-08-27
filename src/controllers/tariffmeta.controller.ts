import { Router, Request, Response } from "express";
import { TariffService } from "../services/tariff.service";

export class TariffController {
   public router: Router;
   private tariffService: TariffService;

   constructor() {
      this.router = Router();
      this.tariffService = new TariffService();
      this.initRoutes();
   }

   private initRoutes() {
      this.router.get("/tariffs", this.getTariffsByDate.bind(this));
   }

   private async getTariffsByDate(req: Request, res: Response) {
      const { date } = req.query;

      if (!date || typeof date !== "string") {
         return res
            .status(400)
            .json({ error: "Missiing or invalid 'date' query param" });
      }
      try {
         const meta = await this.tariffService.metaReop.findByDate(date);
         if (!meta) {
            return res
               .status(404)
               .json({ error: "No tariffs found for this date" });
         }
         const tariffs = await this.tariffService.warehouseRepo.findAllByMetaId(
            meta.id,
         );
         return res.json({ meta, tariffs });
      } catch (error) {
         return res
            .status(500)
            .json({ error: "Internal server error", details: error });
      }
   }
}

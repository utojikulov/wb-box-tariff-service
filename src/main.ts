import { App } from "./app";
import { TariffController } from "./controllers/tariffmeta.controller";
import { TariffJob } from "./job/tariff.job";

const app = new App([new TariffController()]);

app.listen();

new TariffJob().start();

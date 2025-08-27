import { App } from "./app";
import { TariffController } from "./tariff/controllers/tariff.controller";
import { TariffJob } from "./tariff/jobs/tariff.job";

const app = new App([new TariffController()]);

app.listen();

new TariffJob().start();

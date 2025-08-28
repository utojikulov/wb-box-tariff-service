import { App } from "./app";
import { SheetsJob } from "./google-sheets/jobs/sheets.job";
import { TariffController } from "./tariff/controllers/tariff.controller";
import { TariffJob } from "./tariff/jobs/tariff.job";

const app = new App([
    new TariffController(),
]);

app.listen();

new SheetsJob().start()
new TariffJob().start();

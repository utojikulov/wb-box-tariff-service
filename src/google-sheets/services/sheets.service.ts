import * as fs from 'fs'
import { google} from "googleapis";
import { ConfigService } from '../../config/env/config.service';

export class SheetsService {
    private sheets
    private configService: ConfigService

    constructor() {
        this.configService = new ConfigService()
        const credentials = JSON.parse(
            fs.readFileSync(this.configService.get('GOOGLE_APPLICATION_CREDENTIALS'), "utf8")
        )
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        this.sheets = google.sheets({ version: "v4", auth });
    }


    async createSheet(title: string) {
        try {
            await this.sheets.spreadsheets.batchUpdate({
                requestBody: {
                    requests: [{
                        addSheet: {
                            properties: {
                                title: title
                            }
                        }
                    }]
                }
            })
        } catch (error) {
            console.error('error occured while creating a sheet', error)
        }
    }

    async writeData(sheetTitle: string, rows: any[]) {
        try {
            if (!rows.length) return;

            const headers = Object.keys(rows[0]);
            const values = [headers, ...rows.map((row) => Object.values(row))];

            await this.sheets.spreadsheets.values.update({
                spreadsheetId: process.env.SPREADSHEET_ID!,
                range: `${sheetTitle}!A1`,
                valueInputOption: "RAW",
                requestBody: { values },
            });
        } catch (error) {
            console.error('error occured while writing data', error)
        }
    }

    async formatHeaders() {}
}

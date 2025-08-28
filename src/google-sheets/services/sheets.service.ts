import * as fs from 'fs'
import { google} from "googleapis";
import { ConfigService } from '../../config/env/config.service';
import { sheets } from 'googleapis/build/src/apis/sheets';

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
                spreadsheetId: this.configService.get("SPREADSHEET_ID"),
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

            await this.setupHeaders(sheetTitle)

            await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.configService.get('SPREADSHEET_ID'),
                range: `${sheetTitle}!A2`,
                valueInputOption: "RAW",
                requestBody: { values },
            });
        } catch (error) {
            console.error('error occured while writing data', error)
        }
    }

    async sheetExists(sheetTitle: string) {
        try {
            const spreadsheet = await this.sheets.spreadsheets.get({
               spreadsheetId: this.configService.get('SPREADSHEET_ID')
            })

            const sheets = spreadsheet.data.sheets || []
            return sheets.some(s => s.properties?.title === sheetTitle)
        } catch (error) {
            console.error('something went wrong while validating the sheet', error)
        }
    }

    private async setupHeaders(sheetName: string): Promise<void> {
        const headers = [[
            'ID',
            'Склад',
            'Регион',
            'Базовая доставка',
            'Коэфф. доставки',
            'Доставка за литр',
            'Базовая MP',
            'Коэфф. MP',
            'MP за литр',
            'Базовое хранение',
            'Коэфф. хранения',
            'Хранение за литр',
            'Дата следующего бокса',
            'Дата окончания'
        ]];

        await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.configService.get("SPREADSHEET_ID"),
            range: `${sheetName}!A1:N1`,
            valueInputOption: 'RAW',
            requestBody: { values: headers }
        });
    }
}

const googleSheetsConfig = {
    credentialsPath: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    defaultSheetName: 'stocks_coefs'
};

export class SheetsRepository {
    private sheets: googleSheetsConfig[] = []
}

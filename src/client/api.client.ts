import axios from "axios"
import { ConfigService } from "../config/env/config.service"

export class ApiClient {
    private configService: ConfigService

    constructor() {
        this.configService = new ConfigService() 
    }

    async getTariffs(date: string = new Date().toISOString().split("T")[0]) {
        const response = await axios.get(
            this.configService.get('ENDPOINT'),
            {
                headers: {
                    'Authorization': this.configService.get('WB_API_KEY') 
                },
                params: {
                    date
                }
            },

        )

        return response.data
    }
}

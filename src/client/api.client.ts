import axios from "axios"
import { ConfigService } from "../config/config.service"

export class ApiClient {
   constructor(private readonly configService: ConfigService) {}

    async getTariffs() {
        const response = await axios.get(
            this.configService.get('ENDPOINT'),
            {
                headers: {
                    'Authorization': this.configService.get('WB_API_KEY') 
                },
                params: {
                    date: new Date().toISOString().split("T")[0]
                }
            },
            
        )

        return response.data
    }
}

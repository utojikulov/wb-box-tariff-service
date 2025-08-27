import express, { Application } from "express";

export class App {
   private app: Application;
   private port: number;

   constructor(routes: any[], port: number = 3333) {
      this.app = express();
      this.port = port;

    }

    private initMiddlewares() {
        this.app.use(express.json())
    }

    private initRoutes(routes: any[]) {
        routes.forEach(route => {
            this.app.use("/api", route.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on: http://localhost:${this.port}`)
        })
    }
}

import express from "express";
import router from "./routes/router";
import { createConnection } from "typeorm";
import config from "./config/ormconfig";
import "dotenv/config";

class App {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.initConfig();
    this.createConnection();
    this.routes();
  }

  public initConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.port = Number(process.env.PORT) || 3000;
  }

  public createConnection() {
    return createConnection(config);
  }

  public routes() {
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.send("Hi there!");
    });

    this.app.use("/user", router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}.`);
    });
  }
}

const app = new App();
app.listen();

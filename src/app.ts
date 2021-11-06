import * as express from "express";
import { UserRouter } from "./routes/router";
import { createConnection } from "typeorm";
import config from "./config/ormconfig";

class App {
  private userRouter: UserRouter;
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.initConfig();
    this.createConnectionAndRoutes();
  }

  public initConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.port = Number(process.env.PORT) || 3001;
  }

  public async createConnectionAndRoutes() {
    await createConnection(config);

    this.userRouter = new UserRouter();

    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.send("Hi there!");
    });

    this.app.use("/user", this.userRouter.router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}.`);
    });
  }
}

const app = new App();
app.listen();

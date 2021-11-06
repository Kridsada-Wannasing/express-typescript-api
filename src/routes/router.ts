import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  public router: Router;
  public userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.initRoutes();
  }

  public initRoutes() {
    this.router = Router();
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getOne);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.remove);
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    res.send(this.userController.getOne(req, res, next));
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(this.userController.getAll(req, res, next));
  }

  public create(req: Request, res: Response, next: NextFunction) {
    res.send(this.userController.create(req, res, next));
  }

  public update(req: Request, res: Response, next: NextFunction) {
    res.send(this.userController.update(req, res, next));
  }

  public remove(req: Request, res: Response, next: NextFunction) {
    res.send(this.userController.remove(req, res, next));
  }
}

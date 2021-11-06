import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";

export class UserController {
  private userRepository = getRepository<User>(User);

  async getAll(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params.id);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const user = this.userRepository.create(req.body);
    return this.userRepository.save(user);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOne(req.params.id);

    if (!user) throw new Error("user not found");

    const updatedUser = this.userRepository.merge(user, req.body);
    return this.userRepository.save(updatedUser);
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(req.params.id);

    if (!userToRemove) throw new Error("user not found");

    await this.userRepository.remove(userToRemove);
  }
}

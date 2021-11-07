import { getRepository, Repository, ILike } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { filterSearchParams } from "../utils/search-params";

export const getAll = async (req: Request, res: Response) => {
  const userRepository: Repository<User> = getRepository<User>(User);

  const name = req.query?.name || "";
  const email = req.query?.email || "";

  const searchParams = filterSearchParams(req.query);

  const where = { name: ILike(`%${name}%`), email: ILike(`%${email}%`) };

  if (Object.keys(searchParams).length > 0) {
    const [data, total] = await userRepository.findAndCount({
      where,
      ...searchParams,
    });

    return res.json({
      data,
      count: data.length,
      total,
    });
  }

  const users = await userRepository.find({ where });
  res.json(users);
};

export const getOne = async (req: Request, res: Response) => {
  const userRepository: Repository<User> = getRepository<User>(User);
  const user = await userRepository.findOne(req.params.id);
  res.json(user);
};

export const create = async (req: Request, res: Response) => {
  const userRepository: Repository<User> = getRepository<User>(User);
  const entry = userRepository.create(req.body);
  const user = await userRepository.save(entry);
  res.json(user);
};

export const update = async (req: Request, res: Response) => {
  const userRepository: Repository<User> = getRepository<User>(User);
  const user = await userRepository.findOne(req.params.id);

  if (!user) throw new Error("user not found");

  const mergedEntry = userRepository.merge(user, req.body);
  const updatedUser = await userRepository.save(mergedEntry);
  res.json(updatedUser);
};

export const remove = async (req: Request, res: Response) => {
  const userRepository: Repository<User> = getRepository<User>(User);
  const userToRemove = await userRepository.findOne(req.params.id);

  if (!userToRemove) throw new Error("user not found");

  await userRepository.remove(userToRemove);
  res.json({ status: "success" });
};

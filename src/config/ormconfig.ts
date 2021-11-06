import { ConnectionOptions } from "typeorm";
import { Address } from "../entities/address.entity";
import { User } from "../entities/user.entity";

const config: ConnectionOptions = {
  type: "mysql",
  host: "db",
  port: 3306,
  username: "username",
  password: "password",
  database: "db",
  entities: [User, Address],
  synchronize: true,
};

export default config;

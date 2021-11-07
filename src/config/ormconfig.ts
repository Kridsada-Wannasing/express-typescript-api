import { ConnectionOptions } from "typeorm";
import { Address } from "../entities/address.entity";
import { User } from "../entities/user.entity";

const config: ConnectionOptions = {
  type: "mysql",
  host: "mysql",
  port: 3306,
  username: "root",
  password: "123456",
  database: "db",
  entities: [User, Address],
  synchronize: true,
};

export default config;

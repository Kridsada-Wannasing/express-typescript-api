import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToOne(() => Address, (address: Address) => address.user)
  @JoinColumn()
  address: Address;

  @Column()
  phone: string;

  @Column()
  website: string;
}

import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user: User): Address => user.address)
  user: User;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;
}

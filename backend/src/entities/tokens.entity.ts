import { Token } from "@/interfaces/tokens.interface";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./users.entity";

@Entity()
export class TokenEntity extends BaseEntity implements Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purpose: string;

  @Column()
  expires_in: Date;

  @Column()
  value: string;

  @OneToOne(() => UserEntity, (userId) => userId.id, { nullable: false })
  @JoinColumn()
  userId: UserEntity;
}

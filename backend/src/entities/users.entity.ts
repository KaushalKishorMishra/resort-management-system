import { IsNotEmpty, isNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "@interfaces/users.interface";
import { UserRole } from "@/enums/users.enum";
import { Token } from "@/interfaces/tokens.interface";
import { TokenEntity } from "./tokens.entity";

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @Unique(["email"])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  @Unique(["phone"])
  phone: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => TokenEntity, (token) => token.id, { nullable: false })
  token: Token[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

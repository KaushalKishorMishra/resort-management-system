import { Image } from "@/interfaces/image.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ImageEntity extends BaseEntity implements Image {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  path?: string;

  @Column()
  room_id?: number;

  @Column()
  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;
}

import { RoomStatus, RoomType } from "@/enums/rooms.enum";
import { Rooms } from "@/interfaces/rooms.interface";
import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class RoomsEntity extends BaseEntity implements Rooms {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description?: string;

  @Column()
  @IsNotEmpty()
  price?: number;

  @Column()
  @IsNotEmpty()
  capacity?: number;

  @Column({
    type: "enum",
    enum: RoomStatus,
  })
  @IsNotEmpty()
  status?: string;

  @Column({
    type: "enum",
    enum: RoomType,
  })
  @IsNotEmpty()
  type?: string;

  @Column()
  @IsNotEmpty()
  top: string;

  @Column()
  @IsNotEmpty()
  left: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}

import { Booking } from "@/interfaces/booking.interface";
import { IsDate, IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./users.entity";
import { RoomsEntity } from "./rooms.entity";

@Entity()
export class BookingEntity extends BaseEntity implements Booking {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @Column()
  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @Column()
  extras: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  userId: number;

  @OneToOne(() => RoomsEntity, (room) => room.id, { nullable: false })
  roomId: number;

  @Column()
  @IsNotEmpty()
  paymentId: number;

  @Column()
  status: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

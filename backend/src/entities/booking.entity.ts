import { Booking } from "@/interfaces/booking.interface";
import { IsDate, IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  @IsNotEmpty()
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

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
import { PaymentEntity } from "./payment.entity";
import { BookingStatus } from "@/enums/booking.enum";

@Entity()
export class BookingEntity extends BaseEntity implements Booking {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  start_date: string;

  @Column()
  @IsNotEmpty()
  end_date: string;

  @Column()
  extras: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  userId: number;

  @OneToOne(() => RoomsEntity, (room) => room.id, { nullable: false })
  roomId: number;

  // @OneToOne(() => PaymentEntity, (payment) => payment.id, { nullable: false })
  // @JoinColumn()
  // paymentId: number;

  @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.BOOKED,
    nullable: true,
  })
  status?: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

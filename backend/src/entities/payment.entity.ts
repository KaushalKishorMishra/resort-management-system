import { Payment } from "@/interfaces/payment.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class PaymentEntity extends BaseEntity implements Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}

export interface Booking {
  id?: number;
  start_date: Date;
  end_date: Date;
  extras?: string;
  userId: number;
  roomId: number;
  paymentId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

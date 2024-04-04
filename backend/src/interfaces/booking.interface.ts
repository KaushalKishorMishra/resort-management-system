export interface Booking {
  id?: number;
  start_date: string;
  end_date: string;
  extras?: string;
  userId: number;
  roomId: number;
  // paymentId: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { BookingEntity } from "@/entities/booking.entity";
import { Booking } from "@/interfaces/booking.interface";
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  getRepository,
} from "typeorm";

export class BookingRepository extends Repository<Booking> {
  static async findAll(): Promise<Booking[]> {
    return await getRepository(BookingEntity).find();
  }
  static async findAllBooking(id: number): Promise<Booking[]> {
    return await getRepository(BookingEntity).find({
      where: { id },
    });
  }
  static async findOne(key: object): Promise<Booking> {
    return await getRepository(BookingEntity).findOne({ where: key });
  }

  static async findBookingById(id: number): Promise<Booking> {
    return await getRepository(BookingEntity).findOne({ where: { id } });
  }

  static async create(key: object): Promise<Booking> {
    return await getRepository(BookingEntity).save(key);
  }

  static async update(id: number, key: object): Promise<Booking> {
    await getRepository(BookingEntity).update(id, key);
    const updatedBooking: Booking =
      await getRepository(BookingEntity).findOne(id);
    return updatedBooking;
  }

  static async softDelete(id: number): Promise<Booking> {
    await getRepository(BookingEntity).softDelete(id);
    const deletedBooking: Booking = await this.findOne({ id });
    return deletedBooking;
  }

  static async delete(key: object): Promise<Booking> {
    const deletedBooking: Booking = await this.findOne(key);
    if (!deletedBooking) return null;
    await getRepository(BookingEntity).delete(deletedBooking.id);
    return deletedBooking;
  }

  static async restore(id: number): Promise<Booking> {
    await getRepository(BookingEntity).restore(id);
    const restoredBooking: Booking = await this.findOne({ id });
    return restoredBooking;
  }

  static async rangeSearch(
    start_date: Date,
    end_date: Date,
  ): Promise<Booking[]> {
    const findRangeData = await getRepository(BookingEntity).find({
      where: {
        start_date: LessThanOrEqual(end_date),
        end_date: MoreThanOrEqual(start_date),
      },
    });
    console.log(findRangeData);
    return findRangeData;
  }
}

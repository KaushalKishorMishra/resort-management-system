import { BookingEntity } from "@/entities/booking.entity";
import { HttpException } from "@/exceptions/httpException";
import { Booking } from "@/interfaces/booking.interface";
import { BookingRepository } from "@/repository/booking.repository";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

@Service()
@EntityRepository()
export class BookingService extends Repository<BookingEntity> {
  public async findAllBookings(): Promise<Booking[]> {
    const bookings: Booking[] = await BookingRepository.findAll();
    if (!bookings)
      throw new HttpException(409, "no booking available at the moment");
    return bookings;
  }

  public async findBooking(key: object): Promise<Booking> {
    const booking: Booking = await BookingRepository.findOne(key);
    if (!booking) throw new HttpException(409, `no booking with ${key}  exist`);
    return booking;
  }

  public async createBooking(bookingData: object): Promise<Booking> {
    const findBooking: Booking = await BookingRepository.findOne(bookingData);
    if (findBooking)
      throw new HttpException(409, "already booked for that day");
    const booking: Booking = await BookingRepository.create(bookingData);
    return booking;
  }

  public async updateBooking(
    id: number,
    bookingData: object,
  ): Promise<Booking> {
    const findBooking: Booking = await BookingRepository.findOne({ id });
    if (!findBooking) throw new HttpException(409, "booking not found");
    const booking: Booking = await BookingRepository.update(id, bookingData);
    if (!booking) throw new HttpException(409, "booking not found");
    return booking;
  }
}

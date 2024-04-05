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
  public async findAllBookingUserId(userId: number): Promise<Booking[]> {
    const bookings: Booking[] = await BookingRepository.findAllBooking(userId);
    return bookings;
  }

  public async findBookingById(id): Promise<Booking> {
    const booking: Booking = await BookingRepository.findBookingById(id);
    // console.log(booking);
    if (!booking)
      throw new HttpException(409, `no booking with ${id}  exist 😔`);
    return booking;
  }

  public async createBooking(bookingData: object): Promise<Booking> {
    const booking: Booking = await BookingRepository.create(bookingData);
    return booking;
  }

  public async updateBooking(
    id: number,
    bookingData: object,
  ): Promise<Booking> {
    const booking: Booking = await BookingRepository.update(id, bookingData);
    return booking;
  }

  public async deleteBooking(key: object): Promise<Booking> {
    const booking: Booking = await BookingRepository.delete(key);
    if (!booking) throw new HttpException(409, "booking not found");
    return booking;
  }

  public async rangeSearchService(
    start_date: Date,
    end_date: Date,
  ): Promise<Booking[]> {
    const booking = await BookingRepository.rangeSearch(start_date, end_date);
    return booking;
  }
}

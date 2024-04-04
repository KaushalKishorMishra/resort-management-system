import { BookingStatus } from "@/enums/booking.enum";
import { RoomStatus } from "@/enums/rooms.enum";
import { HttpException } from "@/exceptions/httpException";
import { Booking } from "@/interfaces/booking.interface";
import { User } from "@/interfaces/users.interface";
import { BookingService } from "@/services/booking.service";
import { RoomService } from "@/services/room.service";
import { UserService } from "@/services/users.service";
import { NodeMailer } from "@/utils/nodeMailer";
import { Utils } from "@/utils/utils";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class BookingController {
  public booking = Container.get(BookingService);
  public room = Container.get(RoomService);
  public user = Container.get(UserService);

  public findAllBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const booking = await this.booking.findAllBookings();
      res.status(200).json({ data: booking, message: "findBooking" });
    } catch (error) {
      next(error);
    }
  };

  public findBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const booking = await this.booking.findBooking({ id: id });
      if (!booking)
        throw new HttpException(404, `no booking with ${id}  exist`);
      res.status(200).json({ data: booking, message: "findBookingById" });
    } catch (error) {
      next(error);
    }
  };

  public findBookingRange = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { start_date, end_date } = req.body;
      const booking: Booking[] = await this.booking.rangeSearch(
        start_date,
        end_date,
      );
      if (!booking)
        throw new HttpException(
          404,
          `no booking between ${start_date} and ${end_date}  exist`,
        );
      res.status(200).json({ data: booking, message: "findBookingRange" });
    } catch (error) {
      next(error);
    }
  };

  public findBookingByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId: number = Number(req.params.userId);
      const booking: Booking[] = await this.booking.findAllBookingUser(userId);
      if (!booking)
        throw new HttpException(404, `no booking with ${userId}  exist`);
      res.status(200).json({ data: booking, message: "findBookingByUser" });
    } catch (error) {
      next(error);
    }
  };
  public createBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { start_date, end_date, extras, roomId } = req.body;
      const userId: number = Number(req.params.userId);

      const bookingData: Booking = {
        start_date,
        end_date,
        extras,
        userId: userId,
        roomId,
      };

      const booking = await this.booking.createBooking(bookingData);
      if (!booking) throw new HttpException(409, "booking not created");

      const findRoom = await this.room.findOneRoom({ id: booking.roomId });
      if (!findRoom) throw new HttpException(404, "room not found");

      const updateRoom = await this.room.updateRoom(booking.roomId, {
        status: RoomStatus.BOOKED,
      });

      const findUser: User = await this.user.findUser({ id: booking.userId });
      // send mail confirming booking
      await NodeMailer.sendEmail({
        from: "restro-management@api.com",
        to: findUser.email,
        subject: "Email Verification",
        text: `You successfully booked ${findRoom.name} for ${booking.start_date} to ${booking.end_date}`,
        html: `Click <a href="http://localhost:3000/booking/${booking.id}">here</a> to view your booking`,
      });

      res
        .status(201)
        .json({ status: 200, data: booking, message: "created booking" });
    } catch (error) {
      next(error);
    }
  };

  public deleteBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const booking = await this.booking.deleteBooking({ id: id });
      if (!booking)
        throw new HttpException(404, `no booking with ${id}  exist`);
      const updateRoom = await this.room.updateRoom(booking.roomId, {
        status: RoomStatus.AVAILABLE,
      });
      if (!updateRoom)
        throw new HttpException(
          404,
          "room status could not be changed after deleting booking",
        );
      res
        .status(200)
        .json({ status: 200, data: booking, message: "deleteBooking" });
    } catch (error) {
      next(error);
    }
  };

  public cancelBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      // const decoded = req.body.decoded;

      console.log(1);
      const booking = await this.booking.findBooking({ id: id });
      if (!booking)
        throw new HttpException(404, `no booking with ${id}  exist`);

      // if (decoded.userId !== booking.userId) {
      //   throw new HttpException(
      //     401,
      //     `you are not authorized to cancel this booking`,
      //   );
      // }
      console.log(2);
      const updateBooking = await this.booking.updateBooking(id, {
        status: BookingStatus.CANCELED,
      });
      console.log(3);
      if (!updateBooking)
        throw new HttpException(
          404,
          `booking with ${id} could not be canceled`,
        );
      console.log(4);
      const updateRoom = await this.room.updateRoom(booking.roomId, {
        status: RoomStatus.AVAILABLE,
      });
      console.log(5);
      if (!updateRoom)
        throw new HttpException(
          404,
          `room status could not be changed after canceling booking`,
        );
      console.log(6);
      res.status(200).json({
        status: 200,
        data: updateBooking,
        message: "canceled booking",
      });
    } catch (error) {
      next(error);
    }
  };
}

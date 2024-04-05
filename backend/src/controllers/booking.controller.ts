import { BookingStatus } from "@/enums/booking.enum";
import { RoomStatus } from "@/enums/rooms.enum";
import { HttpException } from "@/exceptions/httpException";
import { Booking } from "@/interfaces/booking.interface";
import { Payload } from "@/interfaces/payload.interface";
import { User } from "@/interfaces/users.interface";
import { BookingService } from "@/services/booking.service";
import { RoomService } from "@/services/room.service";
import { UserService } from "@/services/users.service";
import { NodeMailer } from "@/utils/nodeMailer";
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
      const booking: Booking = await this.booking.findBookingById(id);
      if (!booking)
        throw new HttpException(404, `no booking with ${booking.id} exist`);
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
      const booking: Booking[] = await this.booking.rangeSearchService(
        start_date,
        end_date,
      );

      // for (let oneBooking in booking) {
      //   // const findBooking: Booking = await this.booking.findBooking({id:oneBooking.});
      //   const tempData = await this.booking.findBooking({
      //     id: booking[oneBooking].id,
      //   });
      //   bookingData.push(tempData);
      //   findRoom = await this.room.findOneRoom({ id: tempData.roomId });
      // }
      if (booking.length === 0)
        throw new HttpException(
          404,
          `no booking between ${start_date} and ${end_date} exist`,
        );
      res.status(200).json({
        data: booking,
        message: "find booking range",
      });
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
      const booking: Booking[] =
        await this.booking.findAllBookingUserId(userId);
      if (!booking)
        throw new HttpException(
          404,
          `no booking under user ${booking[0].userId}  exist 😔 lado`,
        );
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
        roomId: Number(roomId),
      };

      const bookingExist: Booking[] = await this.booking.rangeSearchService(
        start_date,
        end_date,
      );
      if (bookingExist.length > 0) {
        throw new HttpException(409, "room is already booked for this date");
      }

      const findRoom = await this.room.findOneRoom({ id: roomId });
      if (!findRoom) throw new HttpException(404, "room not found");

      const updateRoom = await this.room.updateRoom(roomId, {
        status: RoomStatus.BOOKED,
      });

      const booking = await this.booking.createBooking(bookingData);
      if (!booking) throw new HttpException(409, "booking not created");

      const findBooking = await this.booking.findBookingById(booking.id);

      const findUser: User = await this.user.findUser({ id: booking.userId });
      // send mail confirming booking
      await NodeMailer.sendEmail({
        from: "restro-management@api.com",
        to: findUser.email,
        subject: "Email Verification",
        text: `You successfully booked ${findRoom.name} for ${booking.start_date} to ${booking.end_date} under the name ${findUser.name}.`,
        html: `Click <a href="http://localhost:3000/booking/${booking.id}">here</a> to view your booking`,
      });

      res
        .status(201)
        .json({ status: 200, data: findBooking, message: "created booking" });
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
      const decoded: Payload = req.body.decoded;

      if (!decoded) {
        throw new HttpException(401, "token not found");
      }
      console.log(1);
      const booking: Booking = await this.booking.findBookingById(id);
      if (!booking)
        throw new HttpException(404, `no booking with ${id}  exist`);
      if (decoded.userId !== booking.userId) {
        console.log(decoded.userId, booking.userId);
        throw new HttpException(401, "unauthorized");
      }
      console.log(2);

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
      const updateBooking = await this.booking.updateBooking(id, {
        status: BookingStatus.CANCELED,
      });
      console.log(3);
      if (!updateBooking)
        throw new HttpException(
          404,
          `booking with ${id} could not be canceled`,
        );

      const deletedBooking = await this.booking.deleteBooking({ id: id });
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

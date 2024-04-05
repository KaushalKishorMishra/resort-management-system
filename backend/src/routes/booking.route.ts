import { BookingController } from "@/controllers/booking.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthorizationMiddleware } from "@/middlewares/authorization.middleware";
import { Router } from "express";

export class BookingRoute implements Routes {
  public path = "/bookings";
  public router = Router();
  public bookingController = new BookingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/all`,
      // AuthorizationMiddleware.adminAuthorization,
      this.bookingController.findAllBooking,
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.bookingController.findBooking,
    );
    this.router.get(
      `${this.path}/user/:userId(\\d+)`,
      AuthorizationMiddleware.adminAuthorization,
      this.bookingController.findBookingByUser,
    );

    this.router.post(
      `${this.path}/create/:userId(\\d+)`,
      this.bookingController.createBooking,
    );

    this.router.delete(
      `${this.path}/delete/:id(\\d+)`,
      // AuthorizationMiddleware.adminAuthorization,
      this.bookingController.deleteBooking,
    );

    this.router.post(
      `${this.path}/range`,
      this.bookingController.findBookingRange,
    );

    this.router.patch(
      `${this.path}/cancel-booking/:id(\\d+)`,
      // AuthorizationMiddleware.adminAuthorization,
      AuthorizationMiddleware.authorization,
      this.bookingController.cancelBooking,
    );
  }
}

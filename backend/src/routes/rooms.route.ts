import { RoomController } from "@/controllers/room.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class RoomRoute implements Routes {
  public path = "/rooms";
  public router = Router();
  public room = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.room.getRoom);
    this.router.post(`${this.path}/find-room`, this.room.getRoomByOption);
    this.router.post(`${this.path}/create`, this.room.createRoom);
    this.router.patch(`${this.path}/update/:id(\\d+)`, this.room.updateRoom);
    this.router.delete(
      `${this.path}/soft-delete/:id(\\d+)`,
      this.room.softDeleteRoom,
    );

    this.router.delete(
      `${this.path}/hard-delete/:id(\\d+)`,
      this.room.hardDeleteRoom,
    );
    this.router.post(`${this.path}/recover/:id(\\d+)`, this.room.recoverRoom);
  }
}

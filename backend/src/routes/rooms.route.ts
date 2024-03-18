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
    this.router.get(`${this.path}/:id(\\d+)`, this.room.getRoomById);
    this.router.post(`${this.path}/create`, this.room.createRoom);
    this.router.patch(`${this.path}/:id(\\d+)`, this.room.updateRoom);
    this.router.delete(`${this.path}/:id(\\d+)`, this.room.deleteRoom);
  }
}

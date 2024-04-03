import { RoomsEntity } from "@/entities/rooms.entity";
import { roomSeedData } from "@/seeders/seeder.data";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

export class SeederController {
  public seed = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      let seed;
      let seedResponses: any[] = [];
      for (const seedData in roomSeedData) {
        const seed = await getRepository(RoomsEntity).save(
          roomSeedData[seedData],
        );
        seedResponses.push(seed);
      }
      res.status(200).json({ data: seedResponses, message: "seeded room data" });
    } catch (error) {
      next(error);
    }
  };
}

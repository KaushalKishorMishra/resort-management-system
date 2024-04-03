import { SeederController } from "@/controllers/seeder.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class SeederRoute implements Routes{
    public path = "/seed";
    public router = Router();
    public seeder = new SeederController();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.post(`${this.path}`, this.seeder.seed);
    }
}
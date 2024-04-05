import { PaymentController } from "@/controllers/payment.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class PaymentRoute implements Routes  {
    public path = "/payment";
    public router = Router()
    public paymentController = new PaymentController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create-checkout-session`,
            this.paymentController.processPayment
        )
        this.router.get(
            `${this.path}/session-status`,
            this.paymentController.sendStripeApi
        )
    }
}
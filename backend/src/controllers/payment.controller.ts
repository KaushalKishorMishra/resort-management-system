import { PaymentEntity } from "@/entities/payment.entity";
import { Payment } from "@/interfaces/payment.interface";
import { getRepository } from "typeorm";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class PaymentController {
  // process payment
  public processPayment = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "npr",
      metadata: { integration_check: "accept_a_payment" },
    });
    const paymentId = paymentIntent.id;
    const amount = paymentIntent.amount;
    const status = paymentIntent.status;
    const createdAt = paymentIntent.created;
    const updatedAt = paymentIntent.created;
    const paymentData: Payment = {
      id: paymentId,
      amount,
      status,
      createdAt,
      updatedAt,
    };

    await getRepository(PaymentEntity).save(paymentData);
    res.json({ client_secret: paymentIntent.client_secret });
  };

  // send stripe api key to frontend
  public sendStripeApi = async (req, res) => {
    res.json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  };
}

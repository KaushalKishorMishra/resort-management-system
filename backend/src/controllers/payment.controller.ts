import { PaymentEntity } from "@/entities/payment.entity";
import { Payment } from "@/interfaces/payment.interface";
import { getRepository } from "typeorm";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class PaymentController {
  // process payment
  public processPayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${process.env.FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({ clientSecret: session.client_secret });
  };

  // send stripe api key to frontend
  public sendStripeApi = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  };
}

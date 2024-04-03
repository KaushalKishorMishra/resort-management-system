import { App } from "@/app";
import { AuthRoute } from "@routes/auth.route";
import { UserRoute } from "@routes/users.route";
import { ValidateEnv } from "@utils/validateEnv";
import { RoomRoute } from "./routes/rooms.route";
import { BookingRoute } from "./routes/booking.route";
import { PaymentRoute } from "./routes/payment.route";

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new RoomRoute(),
  new BookingRoute(),
  new PaymentRoute(),
]);

app.listen();

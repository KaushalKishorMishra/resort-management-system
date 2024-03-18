import { App } from "@/app";
import { AuthRoute } from "@routes/auth.route";
import { UserRoute } from "@routes/users.route";
import { ValidateEnv } from "@utils/validateEnv";
import { RoomRoute } from "./routes/rooms.route";

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new RoomRoute()]);

app.listen();

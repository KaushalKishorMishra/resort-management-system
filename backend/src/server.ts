import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

// const app = new App([new AuthRoute(), new UserRoute()]);
const app = new App([]);

app.listen();

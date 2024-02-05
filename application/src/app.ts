import express, { Application } from 'express';
import cors from 'cors';

import { router as userRouter } from './controllers/users/user-controller';
import { router as sessionRouter } from './controllers/sessions/session-controller';
import { router as profileRouter } from './controllers/profiles/profile-controller';
import { errorMiddleware } from './common/middlewares/error-middleware';

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const baseUrl: string = process.env.BASE_URL || '/api';

app.use(express.json());
app.use(cors());
app.use(baseUrl, userRouter);
app.use(baseUrl, sessionRouter);
app.use(baseUrl, profileRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;

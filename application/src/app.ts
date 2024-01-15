import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const baseUrl: string = process.env.BASE_URL || '/api';

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;

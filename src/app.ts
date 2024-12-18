import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`
        <h1>CAPDS_Server API! 😃</h1>
        <p>Thank you for visiting this API.💫 This is the entry point for our service. ✨</p>
    `);
});

export default app;

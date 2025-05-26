import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Middleware parsers
app.use(express.json());
app.use(cookieParser());
// CORS Configuration
app.use(
  cors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://capds-server.vercel.app',
      'https://capdsadmin.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
);

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`
        <h1>CAPDS_Server API! 😃</h1>
        <p>Thank you for visiting this API.💫 This is the entry point for our service. ✨</p>
    `);
});

//Not Found
app.use(notFound);

app.use(globalErrorHandler);

export default app;

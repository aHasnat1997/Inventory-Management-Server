import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AllRoutes } from './routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { HTTPStatusCode } from './utils/httpCode';
import config from './config';

// Express application cerated
const app: Application = express();

// express parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.cors_access, credentials: true }));
// app.use(cors({ origin: 'https://store-management-chi.vercel.app', credentials: true }));

// all valid routes
app.use('/api/v1', AllRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
    res.status(HTTPStatusCode.Ok).json({
        'success': true,
        'message': 'Computer Inventory Management Server in running...'
    });
});

// all not-valid routes
app.use((req: Request, res: Response) => {
    res.status(HTTPStatusCode.NotFound).json({
        'success': false,
        'message': `'${req.originalUrl}' is not a valid route`,
    });
});

// global error handler
app.use(globalErrorHandler);

export default app;
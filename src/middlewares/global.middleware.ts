import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';

const globalMiddleware = (app: Express): void => {
    app.use(express.json({ limit: '100kb' }));
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(ExpressMongoSanitize());

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
}

export default globalMiddleware;
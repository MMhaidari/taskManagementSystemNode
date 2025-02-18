import express, { Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error.middleware';
import NotFoundError from './errors/notFound.error';
import globalMiddleware from './middlewares/global.middleware';
import currentUserMiddleware from './middlewares/currentUser.middleware';

const app = express();

globalMiddleware(app);

app.use(currentUserMiddleware);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
})

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError(`Can't find ${req.originalUrl} on this server`);
});

export default app;
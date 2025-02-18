import express, { Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error.middleware';
import NotFoundError from './errors/notFound.error';


const app = express();


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
})

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError(`Can't find ${req.originalUrl} on this server`);
});


export default app;
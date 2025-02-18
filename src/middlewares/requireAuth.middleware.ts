import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../errors/notAuthorized.error';

const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError("Please Login to access this resource");
    }

    next();
}

export default requireAuthMiddleware;
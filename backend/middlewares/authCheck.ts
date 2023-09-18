import jwt, { Secret } from "jsonwebtoken";
import HttpError from "../models/httpError.js";
import { NextFunction, Request, Response } from "express";

const authCheck = (req: Request & { userData?: any }, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    let token;
    try {
        token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new HttpError('Authenticaton failed!', 401);
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
        req.body.userTokenAuthDetails = { userId: decodedToken?.userId };
        return next();
    } catch (e) {
        return next(new HttpError('Authentication failed!', 401));
    }
}

export default authCheck;
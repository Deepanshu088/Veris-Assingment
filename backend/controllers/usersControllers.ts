import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import HttpError from '../models/httpError.js';
import User, { UserType } from '../models/userSchema.js';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { email, name, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.find({ email: email });
    } catch (e) {
        return next(new HttpError('Couldnt Signin. Try Again', 500));
    }
    if (existingUser.length !== 0) {
        return next(new HttpError('Email already exists!!', 422));
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        return next(new HttpError('Could not save your credentials. Try again later', 500));
    }

    const newUser: UserType & { password: any } = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });
    
    try {
        await newUser.save();
    } catch (e) {
        return next(new HttpError('Could not save your credentials. Try again', 500));
    }

    let token;
    try {
        token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.TOKEN_LIFE_TIME });
    } catch (e) {
        return next(new HttpError('Signing Up failed. try again later', 500));
    }

    newUser.password = undefined;
    res.status(201).json({ user: newUser, token: token });
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email }, "-createdAt -updatedAt");
    } catch (e) {
        return next(new HttpError('Couldnt find your username. Try Again !!', 500));
    }
    if (!existingUser) {
        return next(new HttpError('Email has not been registered!!', 403));
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (e) {
        return next(new HttpError('Couldnt log you in. Please try again.', 500));
    }

    if (!isValidPassword) {
        return next(new HttpError('Email or Password is wrong!!!!', 403));
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET as Secret, { expiresIn: process.env.TOKEN_LIFE_TIME });
    } catch (e) {
        return next(new HttpError('login failed. try again later', 500));
    }

    existingUser.password = undefined;
    res.status(200).json({ user: existingUser, message: 'Login', token: token });

}
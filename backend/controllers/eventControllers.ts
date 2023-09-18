import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/httpError.js';
import Event from '../models/eventSchema.js';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    try {
        const creatorId = req.body?.userTokenAuthDetails?.userId;
        let allEvents = await Event.find({creatorId}, "-creatorId -endTime -updatedAt -createdAt").sort({startTime: 1}).limit(100);

        return res.status(200).json({events: allEvents});
    } catch (e: any) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! while fetching events.", e.code || 500));
    }
}

export const createNewEvent = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    try {
        const { title, description, startDateTime, durationInMin, location, guests, reminderBeforeEventTimeInMin } = req.body;
        const creatorId = req.body?.userTokenAuthDetails?.userId;

        let endDateTime: Date = new Date(startDateTime);
        endDateTime.setMinutes(endDateTime.getMinutes() + durationInMin);

        let notificationTime = new Date(startDateTime);
        notificationTime.setMinutes(notificationTime.getMinutes() - reminderBeforeEventTimeInMin);

        let timeClashingEvent = await Event.findOne({
            $or: [
                {
                    startTime: { $gte: startDateTime, $lt: endDateTime },
                },
                {
                    endTime: { $gt: startDateTime, $lte: endDateTime },
                },
            ],
        });

        if(!!timeClashingEvent) {
            throw new HttpError("Event Timings are clashing with user's existing events.", 422);
        }

        let newEvent = new Event({
            title,
            description,
            startTime: startDateTime,
            endTime: endDateTime,
            durationInMin,
            location,
            guests,
            creatorId,
            reminderBeforeEventTimeInMin
        })

        await newEvent.save();

        sendBulkMails(guests, notificationTime);

        return res.status(201).json({event: newEvent});
    } catch (e: any) {
        return next(new HttpError(e.errorMessage || "Something Went Wrong! while creating new event.", e.code || 500));
    }
}

const sendBulkMails = async (emails: string[], notificationTime: Date) => {
    try {
        // Todo: Sending Mails here
    } catch (e: any) {
        throw new HttpError(e.errorMessage || "Something Went Wrong! while sending new event creation emails.", e.code || 500);
    }
}
import { body } from "express-validator";

export const eventCreateValidator = [
    body('title', "Title is minimum 3 letters.").not().isEmpty(),
    body('startDateTime', "Start Date is required.").isISO8601(),
    body('durationInMin', "Duration should be in range of 15 to 240 minutes").isInt({min: 15, max: 240}).not().isEmpty(),
    body('location', "Location is required").not().isEmpty(),
    body('guests', "Atleast one guest email is required.").isArray(),
    body('guests.*').isLength({ max: 30, min: 2 }).toLowerCase().isEmail(),
    body('reminderBeforeEventTimeInMin').isInt().not().isEmpty()
    // todo: file input 
]
import { body } from "express-validator";

export const signUpValidator = [
    body('email', "Please enter a valid email.").isEmail(),
    body('name', "Name is required").not().isEmpty(),
    body('password', "Password must be valid. (min 5)").isLength({ min: 5 }),

]

export const loginInValidator = [
    body('email', "Please enter a valid email.").isEmail(),
    body('password', "Password must be valid. (min 5)").isLength({ min: 5 })
]
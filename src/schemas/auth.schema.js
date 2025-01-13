import Joi from "joi"

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    birth_date: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    type: Joi.string().required()
})

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
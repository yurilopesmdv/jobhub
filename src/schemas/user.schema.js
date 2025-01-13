import Joi from 'joi';

export const getAllUsersSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  page: Joi.number().integer().min(1).default(1),
  type: Joi.string().valid('candidate', 'recruiter').default('candidate'),
})

export const getUserSchema = Joi.object({
  id: Joi.number().required(),
})

export const createProfileSchema = Joi.object({
  title: Joi.string().required(),
  about: Joi.string().required(),
  description: Joi.string().required(),
  experiences: Joi.array().items(Joi.object()).required(),
  courses: Joi.array().items(Joi.object()).required(),
  skills: Joi.array().items(Joi.object()).required(),
})

export const updateProfileSchema = Joi.object({
  title: Joi.string(),
  about: Joi.string(),
  description: Joi.string(),
  experiences: Joi.array().items(Joi.object()),
  courses: Joi.array().items(Joi.object()),
  skills: Joi.array().items(Joi.object()),
})


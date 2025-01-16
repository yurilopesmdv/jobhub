import Joi from 'joi';

export const getAllVacanciesSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  page: Joi.number().integer().min(1).default(1),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
})

export const getVacancySchema = Joi.object({
  id: Joi.number().required(),
})

export const createVacancySchema = Joi.object({
  title: Joi.string().required(),
  seniority: Joi.string().valid('Junior', 'Pleno', 'Senior', 'Especialista').required(),
  description: Joi.string().required(),
  company_name: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  type: Joi.string().valid('Remoto', 'Hibrido', 'Presencial').required(),
})

export const updateVacancySchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string(),
  seniority: Joi.string().valid('Junior', 'Pleno', 'Senior', 'Especialista'),
  description: Joi.string(),
  company_name: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  type: Joi.string().valid('Remoto', 'Hibrido', 'Presencial'),
})

export const deleteVacancySchema = Joi.object({
  id: Joi.number().required(),
})
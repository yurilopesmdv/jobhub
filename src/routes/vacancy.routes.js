import { Router } from 'express';
import { validateToken, validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import { createVacancySchema, deleteVacancySchema, getAllVacanciesSchema, getVacancySchema, updateVacancySchema } from '../schemas/vacancy.schema.js';
import { getAllVacancies, getVacancy, createVacancy, updateVacancy, deleteVacancy } from '../controllers/vacancy.controller.js';

const vacancyRouter = Router();

vacancyRouter.get('/all', validateQuery(getAllVacanciesSchema), getAllVacancies);

vacancyRouter.get('/', validateQuery(getVacancySchema), getVacancy);

vacancyRouter.post('/', validateToken, validateBody(createVacancySchema), createVacancy);

vacancyRouter.put('/', validateToken, validateBody(updateVacancySchema), updateVacancy);

vacancyRouter.delete('/', validateToken, validateQuery(deleteVacancySchema), deleteVacancy);

export default vacancyRouter;
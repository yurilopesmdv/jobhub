import { Router } from 'express';

const vacancyRouter = Router();

vacancyRouter.get('/', (req, res) => {
  res.json({ message: 'Vacancy' });
});

vacancyRouter.post('/', (req, res) => {
  res.json({ message: 'Create vacancy' });
});

vacancyRouter.put('/:id', (req, res) => {
  res.json({ message: 'Update vacancy' });
});

vacancyRouter.delete('/:id', (req, res) => {
  res.json({ message: 'Delete vacancy' });
});

export default vacancyRouter;
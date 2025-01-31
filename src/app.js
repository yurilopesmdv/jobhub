import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


const port = 3000
app.listen(port, () => { console.log(`Server is running in ${port} port`) });
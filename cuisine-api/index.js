import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5510;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));


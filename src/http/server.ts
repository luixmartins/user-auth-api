import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import user from '../routes/user';

const app = express();
const port = 3000;

// Global middlewares 
app.use(express.json());

// Add routers 
app.use('/user', user);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}) 
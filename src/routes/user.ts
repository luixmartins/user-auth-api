import { Router, Request, Response, NextFunction } from 'express';
import userController from '../controller/userController';

import authenticated from '../middleware/authenticated';

const router = Router();


router.post('/', (req: Request, res: Response) => {
    // this route is responsible for creating a new user
    const data = req.body

    const response = userController.createUser(data);

    response.then((response) => {
        res.status(response.status).send(response.body);
    });
});

router.post('/login', async (req: Request, res: Response) => {
    // this route is responsible for getting a user by email
    const data = req.body
    const response = await userController.getUserByEmail(data);

    res.status(response.status).send(response.body);
});

router.get('/home', authenticated, (req: Request, res: Response) => {
    res.send('Welcome to the home page');
});

export default router;
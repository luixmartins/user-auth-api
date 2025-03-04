import { Router, Request, Response } from 'express';
import userController from '../controller/userController';

import sequelize from '../config/database';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    // this route is responsible for creating a new user
    const data = req.body

    const response = userController.createUser(data);

    response.then((response) => {
        res.status(response.status).send(response.body);
    });
});

router.get('/', async (req: Request, res: Response) => {
    // this route is responsible for getting a user by email
    const data = req.body
    const response = await userController.getUserByEmail(data);

    res.status(response.status).send(response.body);
});

export default router;
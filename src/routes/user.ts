import { Router, Request, Response } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req: Request, res: Response) => {
    res.send('User route');
});

export default router;
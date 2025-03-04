import { Request, Response, NextFunction } from 'express';	
import Auth from "../service/auth"

const authenticated = (req: Request, res: Response, next: NextFunction): void => {
    // this middleware is responsible for checking if the user is authenticated
    const bearerToken = req.headers.authorization;

    if (bearerToken === undefined) {
        res.status(401).send('Token does not exist');
        return; 
    } 
    
    try { 
        const responseFromAuth = Auth.validateToken(bearerToken.split(' ')[1]);

        if (responseFromAuth.status === 401) {
            res.status(401).send(responseFromAuth.body);
            return; 
        } else { 
            req.body.auth = responseFromAuth; 

            next();
        }
    } catch (error) {
        res.status(500).send(error);
        return; 
    }
}

export default authenticated;
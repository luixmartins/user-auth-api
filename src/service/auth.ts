const jwt = require('jsonwebtoken');

const Auth = { 
    generateToken(data: any) { 
        return jwt.sign(data, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 86400 });
    },
    
    validateToken(token: string) { 
        try { 
            return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        } catch (error) {
            return { 
                status: 401, 
                body: error 
            };
        }
    }
}

export default Auth; 
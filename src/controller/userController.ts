import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user"
import DAO from "../DAO/index"

const generateHash = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

const compareHash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

const userController = {
    async createUser(user: any) {
        // This function is responsible for creating a new user, it receives an object with the user data and returns a response object
        try {
            user.id = uuidv4();
            user.password = await generateHash(user.password);

            const newUser = new UserModel(user);

            return await DAO.insertData(`INSERT INTO users (id, name, email, password) VALUES ('${newUser.id}', '${newUser.name}', '${newUser.email}', '${newUser.password}')`);
        } catch (error) {
            return {
                status: 500,
                body: error
            };
        }
    },

    async getUserByEmail(data: any) {
        // This function is responsible for getting a user by email, it receives an object with the email and password and returns a response object
        const email = data.email;
        const password = data.password;
        try {
            const response = await DAO.selectData(`SELECT * FROM users WHERE email = '${email}'`);

            if (response.status === 500) {
                return response;
            } else { 
                if (response.body.length === 0) {
                    return {
                        status: 404,
                        body: 'User not found'
                    };
                } else {
                    const userFound = response.body[0];
                    const isPasswordCorrect = await compareHash(password, userFound.password);

                    if (isPasswordCorrect) {
                        return {
                            status: 200,
                            body: userFound
                        };
                    } else {
                        return {
                            status: 401,
                            body: 'Invalid password'
                        };
                    }
                }
            }
        } catch (error) {
            return {
                status: 500,
                body: error
            };
        }
    }
}

export default userController;
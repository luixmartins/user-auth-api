import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user"
import DAO from "../DAO/index"
import Auth from "../service/auth"

const generateHash = (password: string) => {
    return bcrypt.hash(password, 10);
}

const compareHash = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
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

            if (!response.body) return response;

            else {
                const userFound = response.body[0];
                const isPasswordCorrect = await compareHash(password, userFound.password);

                if (isPasswordCorrect) {
                    const authToken = Auth.generateToken({
                        id: userFound.id,
                        email: userFound.email
                    });

                    return {
                        status: 200,
                        body: {
                            authToken: authToken,
                            id: userFound.id,
                            name: userFound.name,
                            email: userFound.email
                        }
                    };
                } else {
                    return {
                        status: 401,
                        body: 'Invalid password'
                    };
                }
            }
        } catch (error) {
            return {
                status: 500,
                body: error
            };
        }
    },

    async updateUser(data: any) {
        try {
            const newPass = await generateHash(data.password);

            const query = `
                UPDATE users
                SET name = '${data.name}', email = '${data.email}', password = '${newPass}'
                WHERE id = '${data.auth.id}';
            `;
            const response = await DAO.updateData(query);

            return response;
        } catch (error) {
            console.error('Error updating user:', error);
            return {
                status: 500,
                body: error
            };
        }
    },

    async deleteUser(data: any) {
        try {
            const query = `DELETE FROM users WHERE id = '${data.auth.id}'`

            const response = await DAO.deleteData(query)

            console.log(response)

            return response;
        } catch (error) {
            console.error('Error deleting user:', error)

            return {
                status: 500,
                body: error
            }
        }
    }
}

export default userController;
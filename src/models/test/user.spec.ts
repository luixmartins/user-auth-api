import { expect, test } from "vitest";
import { v4 as uuidv4 } from "uuid";

import UserModel from "../user";

test("Create new user with valid email", () => {
    const user = new UserModel({
        id: uuidv4(),
        name: "John Doe",
        email: "john@gmail.com",
        password: "password"
    }); 

    expect(user).toBeInstanceOf(UserModel);
});  

test("Create new user with invalid email", () => {
    expect(() => {
        new UserModel({
            id: uuidv4(),
            name: "John Doe",
            email: "johngmail.com",
            password: "password"
        });
    }).toThrowError('Invalid email');
});
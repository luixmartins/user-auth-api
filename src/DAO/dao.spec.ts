import { expect, test } from "vitest";
import { v4 as uuidv4 } from "uuid"; 

import DAO from "./index"; 

// INSERT TESTS 
test("Insert valid data on database", async () => {
    const query = `INSERT INTO users (id, name, email, password) VALUES ('${uuidv4()}', '${"Luiz"}', '${"luiz@gmail.com"}', '${"98312948"}')`

    const response = await DAO.insertData(query); 

    expect(response.status).toBe(201)
});  

test("Insert duplicated data on database", async () => { 
    const firstQuery = `INSERT INTO users (id, name, email, password) VALUES ('${1}', '${"Luiz"}', '${"luiz@gmail.com"}', '${"98312948"}')`

    await DAO.insertData(firstQuery)

    const secondQuery = `INSERT INTO users (id, name, email, password) VALUES ('${1}', '${"Luiz"}', '${"luiz@gmail.com"}', '${"98312948"}')`

    const secondResponse = await DAO.insertData(secondQuery)

    expect(secondResponse.status).toBe(500)

})

test("Insert invalid field on database", async () => {
    const query = `INSERT INTO users (id, name, email, password, tag) VALUES ('${uuidv4()}', '${"Luiz"}', '${"luiz@gmail.com"}', '${"98312948"}', '${"12"}')`
    const response = await DAO.insertData(query); 

    expect(response.status).toBe(500)
});  

test("Insert blank data on database", async () => {
    const query = `INSERT INTO users (id, name, email) VALUES ('${uuidv4()}', '${"Luiz"}', '${"luiz@gmail.com"}')`
    const response = await DAO.insertData(query); 

    expect(response.status).toBe(500)
});  

//SELECT TESTS 
test("Select valid data on database", async () => { 
    const insert = `INSERT INTO users (id, name, email, password) VALUES ('${1}', '${"Luiz"}', '${"luiz@gmail.com"}', '${"98312948"}')`

    await DAO.insertData(insert)

    const select = `SELECT * FROM users WHERE id = ${1}`

    const response = await DAO.selectData(select)

    expect(response.status).toBe(200)
}); 

test("Select invalid data on database", async () => { 
    const response = await DAO.selectData(`SELECT * FROM users WHERE name = ${"Elysama"}`)

    expect(response.status).toBe(500)
}); 
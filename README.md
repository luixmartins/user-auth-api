# User Authentication API with TypeScript and Express

This project implements a simple API with CRUD functions for users and a JWT-based authentication system.

## Features

- **User CRUD**: Create, Read, Update, and Delete user information.
- **JWT Authentication**: Secure endpoints with JSON Web Tokens.
- **Unit Testing**: Unit tests using Vitest.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/luixmartins/user-auth-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd user-auth-api
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Configuration 

1. This implementation uses MySQL as the database and Sequelize as the ORM.
2. Create a MySQL database for the project.
3. Check the `models` folder for the database schema and models configuration.
4. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your database configuration:
    ```env
    DATABASE=  
    USER= 
    PASSWORD=
    HOST=
    PORT=
    ```

### Running the Server

Start the development server:
```sh
npm run dev
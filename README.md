# WTWR (What to Wear?): Back End

This project is a backend for the WTWR project written in express and utilizing MongoDB as a database. the front-end can be found [here](https://github.com/bduckdev/se_project_react)

## Features

- **Express.js**: Utilizes the fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: Integrates MongoDB for data storage, providing a flexible and scalable database solution.
- **CRUD Operations**: Demonstrates basic CRUD operations (Create, Read, Update, Delete) for managing resources.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bduckdev/se_project_express.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     SESSION_SECRET=your_session_secret
     ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

- Visit `http://localhost:3000` in your browser to access the application.
- Register for an account or log in with the provided credentials.
- Explore the CRUD functionalities by adding, updating, or deleting resources.

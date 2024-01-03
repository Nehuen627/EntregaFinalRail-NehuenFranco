## Proyecto Final Franco Nehuen

This is a full-stack JavaScript application that serves as an e-commerce platform. The application allows users to register an account, log in with GitHub, or log in with a previously registered account. Once logged in, users can view a catalog of products and add them to their cart. The application also includes a profile page where users can view their user information.
Features

- User registration and authentication (including GitHub OAuth)
- Product catalog
- Shopping cart functionality
- User profile page
- Admin access to all carts
- Session management using JWT and Passport.js

 ### Tech Stack

- Node.js
- Express.js
- MongoDB
- Passport.js
- JWT
- Socket.IO
- Handlebars.js

#### Getting Started
1. Clone the repository.
2. Install dependencies with npm install.
3. Start the server with npm start for production or npm run dev for development.
Environment Variables

The application uses the following environment variables, which should be stored in a .env file:

- PORT: The port on which the server will run.
- URI: The MongoDB connection string.
- JWT_SECRET: The secret key for JWT.
- COOKIE_SECRET: The secret key for cookies.
- SESSION_SECRET: The secret key for sessions.
- ADMIN_EMAIL: The email of the admin user.
- ADMIN_PASSWORD: The password of the admin user.
- CLIENT_ID: The GitHub OAuth client ID.
- CLIENT_SECRET: The GitHub OAuth client secret.
- EMAIL_PASS: The password for the email account used by Nodemailer.
- EMAIL: The email account used by Nodemailer.

#### Directory Structure
- src/: Contains the source code of the application.
- config/: Contains configuration files.
- controller/: Contains controller files.
- dao/: Contains data access object files.
- middlewares/: Contains middleware files.
- repositories/: Contains repository files.
- routers/: Contains router files.
- service/: Contains service files.
- utils/: Contains utility files.
- views/: Contains view templates.
- public/: Contains public files like CSS.
- README.md: This file.
- package.json: Contains project metadata and dependencies.
- .gitignore: Specifies files to ignore in Git.
- .env: Contains environment variables (not included in the repository for security reasons).

### Note
This project is still under development. Future updates will include more advanced features and improvements.
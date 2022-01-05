# CUFE-Classroom-Backend
This is the full REST API for CUFE-Classroom application.
# Pre-requisites
Install [Node.js](https://nodejs.org/en/) v16.13.1</br>
Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v8.1.2

# Technologies used
1. Node.js
2. Express.js (Node.js framework)
3. MongoDB (NoSQL database that is used in the application))
4. Mongoose
5. Amazon AWS services with multer and multer-s3 (for storing pdf files)
6. pusher (for realtime experience) 
7. faker  (for database seeding)
8. Joi    (for requests validation)
9. jsonwebtoken (for authentication)
10. nodemailer  (for email service)

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **start-up**                 | Establishing a connection with the database and contains a routes file that handles any incoming request.  |
| **node_modules**         | Contains all  npm dependencies.                                                          |
| **Utils**                  | Contains  all utility function that used by the controllers.                        |
| **seeds**        | Contains all seeder functions and a seeder script to seed our database by a dummy data to test the application.
| **models**      | Models define schemas that will be used in storing and retrieving data from Application database.  |
| **routes**              | Contain all express routes, each file handles some type of requests.  
| **middlewares**      | Conatins some customized middlewares which process the incoming requests before handling them down to the routes.
| app.js         | Entry point to express app.                                                               |
| package.json             | Contains npm dependencies as well as build scripts. |


# Getting started
### Environment Variables
All environment vaiables that the API uses can be found in `.sample-env` in the root directory.</br>
A `.env.development` file should be created in the root directory to run the API in the development environment.</br>
A `.env.production` file should be created inthe root directory to run the API in the producation environment.
### Database seeding
To seed the database you should run the seeder script From the root directory
```
npm run seed
```
### How to run?
- Clone the repository
```
git clone https://github.com/MohamedSamiMohamed/CUFE-Classroom-Backend
```
- Install dependencies
```
cd CUFE-Classroom-Backend
npm install
```
- Build and run the project in the development environment  
```
npm run start
```
- Build and run the project in the production environment  
```
npm run start:prod
```
- CUFE-Classroom API documentation</br>
please visit [CUFE-Classroom API documentation](https://documenter.getpostman.com/view/10485677/UVR7LUMB#intro) to see the full documentation of the API.
# For testing
|User Name    | Email             | Password      |   Type     | 
|---------    | ----------------- | ------------- | ---------- |
| admin       | admin@gmail.com   | testPassword1 | admin      |   
| learner0    |    _________      | testPassword1 | learner    |
| instructor0 |    _________      | testPassword1 | instructor |

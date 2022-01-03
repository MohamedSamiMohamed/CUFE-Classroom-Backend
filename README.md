# CUFE-Classroom-Backend
This is the full REST API for CUFE-Classroom application.
# Pre-requisites
Install [Node.js](https://nodejs.org/en/) v16.13.1</br>
Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v8.1.2

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
git clone  <https://github.com/CUFE-Classroom/CUFE-Classroom-Backend.git>
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

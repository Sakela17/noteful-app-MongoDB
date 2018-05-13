Noteful App
============================
I worked on this project while studying for Engineering Immersion program at Thinkful.
The goal was to create a Node/Express app to host a client, serve a RESTful API to the client, and to create a Mongo-backed persistence layer.

##Getting Started
####Local Testing and Deployment
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
* Install [Node](https://nodejs.org/en/), which comes with [NPM](https://www.npmjs.com/)
* In the terminal, run command ```node --version``` to confirm the installation
* Navigate to desired directory and run ```git clone git@github.com:Sakela17/noteful-app-MongoDB.git``` to clone this repo
* ```cd``` into the project's folder and run ```npm install``` to install dependencies
* In the root of the project, create ```.env``` file and store a secret key for JWT like so: ```JWT_SECRET=your_own_key```
* Install MongoDB on Mac using [Homebrew](https://brew.sh/) or download [MongoDB installer](https://www.mongodb.com/download-center#community) for Windows
* Create folder ```C:/data/db``` for Mongo to store data in
* Start local Mongo server by running ```mongod --dbpath "C:/data/db"```
* Run ```npm start``` command to run local server on PORT 8080

Now you can test end points with tools like [Postman](https://www.getpostman.com/) or navigate to ```http://localhost:8080``` in the browser.

##Deployment on Heroku
These instruction will help you to set up database on mLab and deploy this app on Heroku.
* Create [Heroku](https://signup.heroku.com/identity) account
* Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) command line
* In the terminal, run ```heroku --version``` to confirm the installation
* Type ```heroku login``` and enter your Heroku username and password
* ```cd``` into your project directory
* Create new remote Heroku repository by running ```heroku create``` (make sure to commit beforehand)
* Run ```git push heroku master``` to push the repo to Heroku platform
__*In the next steps, you will add Mongo database hosted on mLab to your Heroku application*__ 
* Sign up for free [mLab](https://mlab.com/signup/) account
* From your [mLab home screen](https://mlab.com/home) click on MongoDB Deployments -> Create new
* Under plan options, choose "Amazon Web Services" and "Sandbox" as the plan type -> Continue
* Select AWS region -> Continue
* Choose name for your database -> Continue -> Submit Order
* From [home screen](https://mlab.com/home) click on the DB -> Users tab -> Add database user -> create new user and password
* Open [Heroku](https://id.heroku.com/login) homepage and navigate to Personal Apps -> Name_Of_Your_App -> Settings and click on Reveal Config Vars button
* You need to add the following environment variables:
    1. JWT_SECRET
    2. JWT_EXPIRY
    3. MONGODB_URI (use URI from the following step subbing in your username and password)
* Open [mLab](https://mlab.com/home), select the DB -> copy URI that appears under the label "To connect using a driver via the standard MongoDB URI"
* Back in [Heroku](https://id.heroku.com/login) click on the project -> 'Open app' button. (optionally: launch the app by running ```heroku open``` in the terminal)

If everything went well, now this app is deployed on Heroku using mLab to host Mongo database. 
 
 ##Built With
 [Node.js](https://nodejs.org/en/)
 
 [Express.js](https://expressjs.com/)
 
 [MongoDB](https://www.mongodb.com/)
 
 [Mongoose.js](http://mongoosejs.com/)
 
 [Passport](http://www.passportjs.org/)
 
 [JWT](https://jwt.io/)
 
 [bcrypt](https://www.npmjs.com/package/bcrypt)
 
 [Mocha](https://mochajs.org/)
 
 [Chai](http://www.chaijs.com/)

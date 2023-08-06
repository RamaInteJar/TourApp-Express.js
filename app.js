const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();

//Middlwares
app.use(morgan('dev'));
app.use(express.json());

//custom made middleware
app.use((req, res, next) => {
  console.log('hello from the middleware ');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Mounting Middleware
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
module.exports = app;
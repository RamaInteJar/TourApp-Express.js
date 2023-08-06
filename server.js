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
app.use('/api/v1/tours', userRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hello from the server side ${PORT}`);
});


// app.get('', getAllTours)
//Show route
//displays individual element of the data
// app.get('/api/v1/tours/:id', getTour);

// //Adding new data to our existing data
// // app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

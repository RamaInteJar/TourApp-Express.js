const app = require('./app')

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

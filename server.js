const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
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

//ROUTE HANDLERS
//routes
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours =(req, res) => {
    console.log(req.requestTime);
    res.json({
      status: 'success',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  };

const getTour =(req, res) => {
    //JS trick way of converting a number string to a number
    const id = req.params.id * 1;
    if (id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }
    //create an array with the specified id in the parameter
    const tour = tours.find((el) => el.id === id);
    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  };


const createTour = (req, res) => {
    // console.log(req.body);
    //creating an id for the new data
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  };


const updateTour =(req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here....>',
      },
    });
  };


const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'invalid ID',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };

const tourRouter = express.Router()
app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


  //Users Routers
  const getAllUsers=(req,res)=>{
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined'
    })
  }

  const createUser=(req,res)=>{
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined'
    })
  }

  const updateUser=(req,res)=>{
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined'
    })
  }

  const deleteUser=(req,res)=>{
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined'
    })
  }

  app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser)

  app
  .route('/api/v1/usres/:id')
  .patch(updateUser)
  .delete(deleteUser)

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

const fs = require('fs');
const express = require('express')

//routes
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
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

//Mounting the tour routers
const router = express.Router();
router
.route('/')
.get(getAllTours)
.post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  module.exports = router
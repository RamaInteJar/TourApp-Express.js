const fs = require('fs');

//routes
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

exports.chechId = (req, res,  next)=>{
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next()
}
  
exports.getAllTours =(req, res) => {
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

exports.getTour =(req, res) => {
    //create an array with the specified id in the parameter
    const tour = tours.find((el) => el.id === id);
    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  };


exports.createTour = (req, res) => {
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


exports.updateTour =(req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here....>',
      },
    });
  };


exports.deleteTour = (req, res) => {
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
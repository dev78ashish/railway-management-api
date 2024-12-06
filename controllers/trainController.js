const Train = require('../models/Train');

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  
  try {
    const trainId = await Train.create(name, source, destination, totalSeats);
    res.status(201).json({ message: 'Train added successfully', trainId });
  } catch (error) {
    res.status(500).json({ message: 'Train creation failed', error: error.message });
  }
};

exports.getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;
  
  try {
    const trains = await Train.findByRoute(source, destination);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch train availability', error: error.message });
  }
};
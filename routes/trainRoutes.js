const express = require('express');
const { addTrain, getTrainAvailability } = require('../controllers/trainController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, addTrain);
router.get('/availability', authMiddleware, getTrainAvailability);

module.exports = router;

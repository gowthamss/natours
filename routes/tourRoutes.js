const express = require('express')
const toursController = require('./../controllers/toursController')

const router = express.Router()

// router.param('id', toursController.checkID)

router.route('/').get(toursController.getAllTours).post(toursController.createANewTour)
    // toursController.checkBody, 

router.route('/:id').get(toursController.getTour).patch(toursController.updateTour).delete(toursController.deleteATour)

module.exports = router;
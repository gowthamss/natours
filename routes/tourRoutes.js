const express = require('express')
const toursController = require('./../controllers/toursController')

const router = express.Router()

// router.param('id', toursController.checkID)

router.route('/top-5-cheap').get(toursController.aliasTopTours, toursController.getAllTours)

router.route('/tour-stats').get(toursController.getTourStats)

router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan)

router.route('/').get(toursController.getAllTours).post(toursController.createANewTour)
    // toursController.checkBody, 

router.route('/:id').get(toursController.getTour).patch(toursController.updateTour).delete(toursController.deleteATour)

module.exports = router;
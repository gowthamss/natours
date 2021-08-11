const Tour = require('./../models/tourModel')

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// )

// exports.checkID = (req, res, next, val) => {
//     console.log(`val: ${val}`)
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'failure',
//             message: 'Invalid ID'
//         })
//     }
//     next()
// }

exports.checkBody = (req, res, next) => {
    console.log('req body: ', req.body)
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'A tour should have name and price'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
        // res.status(200).json({
        //     status: 'success',
        //     results: tours.length,
        //     requestedAt: req.requestTime,
        //     data: { tours }
        // })
}

exports.getTour = (req, res) => {
    console.log(req.params)
    const id = Number(req.params.id)
        // const tour = tours.find(tour => tour.id === id)

    // res.status(200).json({
    //     status: 'success',
    //     data: { tour }
    // })
}

exports.createANewTour = (req, res) => {

}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { tour: 'Updated tour' }
    })
}

exports.deleteATour = (req, res) => {
    const tour = tours.find(tour => tour.id === Number(req.params.id))

    res.status(204).json({
        status: 'success',
        data: null
    })
}
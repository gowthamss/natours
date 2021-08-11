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

// exports.checkBody = (req, res, next) => {
//     console.log('req body: ', req.body)
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'Bad Request',
//             message: 'A tour should have name and price'
//         })
//     }
//     next()
// }

exports.getAllTours = async(req, res) => {
    // res.status(200).json({
    //     status: 'success',
    //     results: tours.length,
    //     requestedAt: req.requestTime,
    //     data: { tours }
    // })

    try {
        const tours = await Tour.find()
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: { tours }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTour = async(req, res) => {
    try {
        const tour = await Tour.findById(req.params.id) // findById is a mongoose way of findOne
            // Tour.findOne({ _id: req.params.id }) 

        res.status(200).json({
            status: 'success',
            data: { tour }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createANewTour = async(req, res) => {
    try {
        // const newTour = new Tour({})
        // newTour.save()

        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: { newTour }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
}

exports.updateTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        res.status(200).json({
            status: 'success',
            data: { tour }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteATour = async(req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
const Tour = require('./../models/tourModel')
const APIFreatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

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

// Middleware function to set query string values to get the top 5 cheap tours
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}

exports.getAllTours = catchAsync(async(req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFreatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const tours = await features.query; // Get the modified query from features

    res.status(200).json({
            status: 'success',
            results: tours.length,
            data: { tours }
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})

exports.getTour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findById(req.params.id) // findById is a mongoose way of findOne
        // Tour.findOne({ _id: req.params.id }) 

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(200).json({
            status: 'success',
            data: { tour }
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})

exports.createANewTour = catchAsync(async(req, res, next) => {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body)

    res.status(201).json({
            status: 'success',
            data: { newTour }
        })
        // try {
        // } catch (err) {
        //     res.status(400).json({
        //         status: 'fail',
        //         error: err
        //     })
        // }
})

exports.updateTour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(200).json({
            status: 'success',
            data: { tour }
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})

exports.deleteATour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id)

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(204).json({
            status: 'success',
            data: null
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})

exports.getTourStats = catchAsync(async(req, res, next) => {
    const stats = await Tour.aggregate([{
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        {
            $match: { _id: { $ne: 'EASY' } }
        }
    ])

    res.status(200).json({
            status: 'success',
            data: { stats }
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})

exports.getMonthlyPlan = catchAsync(async(req, res, next) => {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([{
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lt: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStats: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ])

    res.status(200).json({
            status: 'success',
            results: plan.length,
            data: { plan }
        })
        // try {
        // } catch (err) {
        //     res.status(404).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
})
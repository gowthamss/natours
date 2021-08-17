const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// To get the request body data
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

// Custom middleware function
app.use((req, res, next) => {
    // console.log('Hello from middleware')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// Get all tours
// app.get('/api/v1/tours', getAllTours)

// Get a specific tour
// app.get('/api/v1/tours/:id', getTour)

// Create a new tour
// app.post('/api/v1/tours', createANewTour)

// Patch a tour
// app.patch('/api/v1/tours/:id', updateTour)

// Delete a tour
// app.delete('/api/v1/tours/:id', deleteATour)

// // 3) Routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4) Server
module.exports = app;
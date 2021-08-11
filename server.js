const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection established')
})

const port = process.env.PORT || 3000;
const hostName = '127.0.0.1';
app.listen(port, () => {
    console.log(`The server is listening port ${port} of ${hostName}...`);
});
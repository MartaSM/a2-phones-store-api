const mongoose = require('mongoose');

const DB_NAME = 'phone-store'
const MONGODB_URI = `mongodb://localhost:27017/${DB_NAME}`;


mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Connected to ${MONGODB_URI} database`))
    .catch(error => console.error(`Error connecting with ${MONGODB_URI} database: ${error}`))
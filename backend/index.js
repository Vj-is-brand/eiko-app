const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const apiRouter = require('./routers/api')
const mongoose = require('mongoose')
const session = require('express-session')
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false
}))



app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))
app.use('/api', apiRouter)
app.listen(process.env.PORT, () => { console.log(`server is run start ${process.env.PORT}`) })


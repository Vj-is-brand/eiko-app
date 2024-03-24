<<<<<<< HEAD
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const apiRouter = require('./routers/api');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

=======
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const apiRouter = require('./routers/api')
const mongoose = require('mongoose')
const session = require('express-session')
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

<<<<<<< HEAD
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

const store = new MongoDBStore({
    uri: `${process.env.DB_URL}/${process.env.DB_NAME}`,
    collection: 'sessions'
});
=======
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)

>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b

app.use(session({
    secret: process.env.KEY,
    resave: false,
<<<<<<< HEAD
    saveUninitialized: false,
    store: store // Use MongoDB as session store
}));

app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) });
=======
    saveUninitialized: false
}))


app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))
app.use('/api', apiRouter)
app.listen(process.env.PORT, () => { console.log(`server is run start ${process.env.PORT}`) })

>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b

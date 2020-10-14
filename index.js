const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Conf = require('./config')
dotenv.config()

const router = require('./router')
const userRouter = require('./controllers/UserController')
const kasirRouter = require('./controllers/kasirController')

const app = express();

//Connect to DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, 
        {
            useNewUrlParser:true,
            useUnifiedTopology :true
        })
        console.log('Connect to DB Success')

        //other option
        // .then(() => {
        //     console.log('Connect to DB Success')
        // }).catch(err => {
        //     console.log('Connect to DB Failed' + err)
        // })
    } catch (error) {
        console.log(error)
    }
}

connectDB()


const authenticateBOS = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, 'secret', (err, user) => {
            if(user.jabatan != 1)
            console.log(user.jabatan)

            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//middleware
app.use(morgan('dev'))

//routing
app.use(express.json());
app.get('/',(req, res) => {
    res.json({
        message: 'success'
    });
})

// app.use('/api', router)
app.use('/api/user', userRouter)
app.use('/api/kasir', kasirRouter)


const PORT = process.env.PORT || '3000'

app.listen(PORT, () => {
    console.log(`App listen to port ${PORT}`)
})
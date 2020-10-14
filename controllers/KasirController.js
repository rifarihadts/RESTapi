const Kasir = require('../model/kasir')
const express = require('express')
const jwt = require('jsonwebtoken')
const Conf = require('../config')
const bodyParser = require('body-parser')

const kasirRouter = express.Router()

kasirRouter.use(bodyParser.urlencoded({ extended: false }));
kasirRouter.use(bodyParser.json());

//input data kasir
kasirRouter.post('/add', async (req, res) => {
    const authHeader = req.headers.authorization;
    try {
        const {jenis_transaksi} = req.body
        const newData = new Kasir({
            "jenis_transaksi":jenis_transaksi,
        })

        const createdData = await newData.save()

        res.status(201).json(createdData)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

//get all kasir data
kasirRouter.get('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, 'secret', (err, user) => {
            if(user.jabatan == 0)
                return res.status(403).json({"message":"Anda tidak memiliki wewenang"});


            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }
    
    const data = await Kasir.find({})

    if(data && data.length !== 0) {
        res.json(data)
    } else {
        res.status(404).json({
            message: 'Data not found'
        })
    }
})

//get kasir data by jenis_transaksi
kasirRouter.get('/:jenis', async (req, res) => {
     const authHeader = req.headers.authorization;
     if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, 'secret', (err, user) => {
            if(user.jabatan == 0)
                return res.status(403).json({"message":"Anda tidak memiliki wewenang"});


            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }

    try{
        const data = await new Promise((resolve, reject) =>{
            Kasir.find({jenis_transaksi:req.params.jenis}, (err, data) => {
                if(err)
                    reject(err)
                resolve(data)
            })
        })
        res.json(data)
    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

//ambil uang
kasirRouter.get('/ambil/uang', async (req, res) => {
     const authHeader = req.headers.authorization;
     if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, 'secret', (err, user) => {
            if(user.jabatan != 2)
                return res.status(403).json({"message":"Anda tidak memiliki wewenang"});


            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(401);
    }

    res.json({"message":"Uang berhasil diambil"})
})

module.exports = kasirRouter
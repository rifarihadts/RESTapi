const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    jenis_transaksi: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Kasir = mongoose.model('Kasir', userSchema)

module.exports = Kasir


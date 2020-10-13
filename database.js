const mongoose = require('mongoose')

const homeworkSchema = mongoose.Schema({
    course: {
        type: String,
        required: true,
    },
    title : {
        type: String,
        require: true,
    },
    due_date : {
        type: Date,
        require: true,
    },
    status : {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Homework', homeworkSchema)

// export default Homework
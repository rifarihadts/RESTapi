const express = require('express')
const Homework = require('./database')

const router = express.Router()

// @desc Post homeworks
// @route POST /api/homeworks
router.post('/homeworks', async (req, res) => {
    try {
        const {course,title,due_date,status} = req.body

        const homeworks = new Homework({
            course,
            title,
            due_date,
            status
        })

    const createdHomework = await homeworks.save()

    res.status(201).json(createdHomework)

    } catch (err) {
        // console.log(err)
        res.status(500).json({error:'Database creation failed'})
    }
})

//@desc Get all homeworks
//@route GET /api/homeworks
router.get('/homeworks', async (req, res) => {
    const homeworks = await Homework.find({})

    if(homeworks && homeworks.length !== 0) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})


//@desc Get by id homework
//@route GET /api/homeworks/:id
router.get('/homeworks/:id', async (req, res) => {
    const homeworks = await Homework.findById(req.params.id)

    if(homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})


//@desc update homework
//@route PUT /api/homeworks/:id
router.put('/homeworks/:id', async (req, res) => {
    const {course,title,due_date,status} = req.body
    const homeworks = await Homework.findById(req.params.id)

    if(homeworks) {
        homeworks.course = course
        homeworks.title = title
        homeworks.due_date = due_date
        homeworks.status = status
        
        const updatedHomework = await homeworks.save()
        res.json(updatedHomework)
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

//@desc delete homework
//@route Delete /api/homeworks/:id
router.delete('/homeworks/:id', async (req, res) => {
    const homeworks = await Homework.findById(req.params.id)

    if(homeworks) {
        const deleteHomework = await homeworks.remove()
        res.json({message:'Data Removed'})
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

//@desc delete all homework
//@route Delete /api/homeworks/bulk
router.delete('/homeworks/delete/bulk', async (req, res) => {
    const homeworks = Homework.find({})

    if(homeworks  && homeworks.length !== 0) {
        const deleteHomework = await homeworks.deleteMany()
        res.json({message:'Data Removed'})
    } else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

module.exports = router
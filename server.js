const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/studentDB'
const Student = require('./models.js')

const app = express()


mongoose.connect(url);
mongoose.connection.once('open',function(){
    console.log('connection made');
})

app.use(express.json())

app.get('/getStudents/:id', async(req,res) => {
    try {
        const student = await Student.findById(req.params.id)
        res.json(student)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.get('/getStudents', async(req,res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/addStudents',async(req,res) => {
    const students = new Student({
        name : req.body.name,
        rollno : req.body.rollno,
        mobile : req.body.mobile,
        std : req.body.std,
        sec : req.body.sec 
    })

    try {
        const data = await students.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
}) 

app.put('/updateStudent/:id', async(req,res) => {
    try {
        const student = await Student.findById(req.params.id)
        student.sub = req.body.sub
        const data = await student.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
})

app.listen(4000, () => {console.log('Server Started')})
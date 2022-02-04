const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/studentDB'
const Student = require('./student.js')
const Standard = require('./standard.js')

const app = express()


mongoose.connect(url);
mongoose.connection.once('open',function(){
    console.log('connection made');
})

app.use(express.json())

/* Student */

app.get('/getStudent/:classId', async(req,res) => {
    try {
        const students = await Student.find()
        const studentGroup = []
        students.map(student => {
            if(student.classId == req.params.classId)
            {
                studentGroup.push(student)
            }
        })  
        res.json(studentGroup)
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
        classId : req.body.classId
    })

    try {
        const data = await students.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
}) 

app.put('/updateStudents/:id', async(req,res) => {
    try {
        const student = await Student.findById(req.params.id)
        student.name = req.body.name
        student.rollno = req.body.rollno
        student.mobile = req.body.mobile,
        student.classId = req.body.classId 
        const data = await student.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
})

app.delete('/deleteStudents/:id', async(req,res) => {
    try {
        const student = await Student.findById(req.params.id) 
        const data = await student.remove()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
})

/*Class*/
app.get('/getStandard', async(req,res) => {
    try {
        const standard = await Standard.find()
        res.json(standard)
    } catch (err) {
        res.send('Error ' + err)
    }
})

app.post('/addStandard',async(req,res) => {
    const standard = new Standard ({
        std : req.body.std,
        division : req.body.division
    })
    try {
        const data = await standard.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
}) 

app.put('/updateStandard/:id', async(req,res) => {
    try {
        const standard = await Standard.findById(req.params.id)
        standard.std = req.body.std
        standard.division = req.body.division 
        const data = await standard.save()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
})

app.delete('/deleteStandard/:id', async(req,res) => {
    try {
        const standard = await Standard.findById(req.params.id) 
        const data = await standard.remove()
        res.json(data)
    } catch (err) {
        res.send('Error')
    }
})


app.listen(4000, () => {console.log('Server Started')})
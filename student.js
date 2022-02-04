const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    rollno: { type: Number, required: true},
    mobile: { type: Number, required: true},
    classId: { type: String, required: true}
});


module.exports = mongoose.model('Student', studentSchema);
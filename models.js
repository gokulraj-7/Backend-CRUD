const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    rollno: { type: Number, required: true},
    mobile: { type: Number, required: true},
    std: { type: String, required: true},
    sec: { type: String, required: true}
});


module.exports = mongoose.model('Student', studentSchema);
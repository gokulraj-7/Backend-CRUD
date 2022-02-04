const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    std: { type: String, required: true},
    division: { type: String, required: true},
});


module.exports = mongoose.model('Class', classSchema);
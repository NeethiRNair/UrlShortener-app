const mongoose = require('mongoose');
var countersSchema = new mongoose.Schema({   
    visited_time: []
});

exports.Counter = mongoose.model('Counter',countersSchema); 
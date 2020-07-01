const mongoose = require('mongoose');


var urlSchema = new mongoose.Schema({
    
    urlCode : '',
    longUrl: '',
    shortUrl:'',
    created_at: ''
},{
    timestamps:true
});


exports.Url = mongoose.model('Url',urlSchema);

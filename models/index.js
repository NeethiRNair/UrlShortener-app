const mongoose = require('mongoose');
const {Url} = require('./url');
const { Counter } = require('./counter');

mongoose.connect('mongodb://localhost:27017/urlShortener-server',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})


module.exports = {
    Url,
    Counter
}
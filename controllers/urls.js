const models = require('../models');
const shortid = require('shortid');


exports.shorten = (req,res) => {
    const longUrl = req.body.url;
    models.Url.findOne({
        longUrl : longUrl
    }).then(url => {
        if(url) {
            console.log('Url found in db');
            
            models.Counter.findOne({
                _id: url._id
            }).then(urlData => {
                urlData.visited_time.push(new Date());
                console.log(urlData);
                urlData.save();

                var ONE_HOUR = 60 * 60 * 1000; /* ms */
                const now = new Date;
                var count = 0;
                urlData.visited_time.find(time => {
                    if( (now -time) < ONE_HOUR){
                        count=count+1;
                    }
                })           
                const statistics = {
                    "Short Url" : url.shortUrl,
                    "Created_at" : url.createdAt,
                    "Total_Visits" : urlData.visited_time.length,
                    "VisitsInPreviousHour" : count
                }
                
                return res.json(statistics)
            });
            
            

        } else {
            console.log('Url NOT found in db. Saving new Url');
            
            const urlCode = shortid.generate()
            const shortUrl = 'localhost:3000/' + urlCode;
            const newUrl = new models.Url({
                urlCode,
                longUrl,
                shortUrl,
            });
            
            newUrl.save().then( url => {
                console.log(url._id)
                models.Counter.find({
                    _id: url._id
                }).then(urlData => {
                    const newCount = new models.Counter({
                        _id: url._id,
                        visited_time: new Date()
                    })
                    console.log(newCount);
                    newCount.save()
                    
                });
            })
            return res.json({"Short Url":shortUrl});  
        }

    })






    
    
}


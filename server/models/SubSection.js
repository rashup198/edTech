const mongoose = require('mongoose');

const subSection = new mongoose.Schema({

   titel:{
       type:String,
       required:true,
       trim:true
   },
   timeDuration:{
       type:String,
       required:true,
       trim:true
   },
   description:{
         type:String,
         required:true,
         trim:true
    },
    videoUrl:{
        type:String,
        required:true,
        trim:true
    },
    
})

module.exports = mongoose.model('SubSection', subSection);

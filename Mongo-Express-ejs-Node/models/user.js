var mongoose = require('mongoose');


const Studentschema = new mongoose.Schema({
        name:String,
        password: String,
        rno:Number,
        address:String,
        std:Number,
        phone:Number,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }) 
    const studentModel = mongoose.model('studentModel',Studentschema);
    module.exports = mongoose.model('studentModel',Studentschema);

    //I have not using this file
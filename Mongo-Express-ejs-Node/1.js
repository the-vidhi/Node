express = require('express');
bodyParser = require('body-parser');
mongoose = require('mongoose');
var fs = require('fs')
var path = require('path')
var multer = require('multer');
const bodyParser = require('body-parser');
const { Schema } = require('mongoose');
const { createBrotliCompress } = require('zlib');
app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended = true}))
app.set('view engine','ejs')

mongoose.connect("mongodb://localhost/student",{useNewUrlParser = true,useUnifiedTopology = true})
mongoose.connection.on('open',()=>{
    console.log("Connected");
});

const Studentschema = new Schema({
    name: String,
    img:{
        data: Buffer,
        contentType: String
    }
});

const studentModel = mongoose.model('student',Studentschema);
var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage});

app.get('/home',(req,res)=>{
    studentModel.find((err,data)=>{
        if(!err)
            res.render('home',{'stdData': data})
    })
})

app.get('Addstudent',(req,res)=>{
    res.render('add',{'type':"/Addstudent"})
})

app.post('Addstudent',(req,res)=>{
    var obj = new studentModel({
        name: req.body.name,
        img:{
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    obj.save().then(()=>{
        console.log("Data Addd")
        res.redirect('home');
    })
})

app.get('updatestudent',(req,res)=>{
    studentModel.findById((req.query.id),(err,data)=>{
        if(!err)
            res.render('add',{'type':"updatestudent",'id':data._id,'img':data.img})
    })
})

app.post('updatestudent',(req,res)=>{
   studentModel.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        img:{
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
   },
   (err,data)=>{
       if(!err)
        res.redirect('home');
   }) 
})

app.get('DeleteStudent',(req,res)=>{
    studentModel.findOneAndRemove((req.query.id),(err,data)=>{
        if(!err)
            res.redirect('home')
    })
})

app.listen(3000,(req,res)=>{

})


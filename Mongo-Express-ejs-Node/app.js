express = require('express');
bodyParser = require('body-parser');
var fs  = require('fs');
var path = require('path');
var multer = require('multer');
app = express()
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
session = require('express-session');
app.set('view engine','ejs')
app.use(session({secret:'shh'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/student1",{ useNewUrlParser:true , useUnifiedTopology: true});

mongoose.connection.on('open',()=>{
    console.log("connect")
})
const Studentschema = new mongoose.Schema({
    name:String,
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
const studentModel = mongoose.model('student',Studentschema)

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

app.get('/',(req,res)=>{
    // if(req.session.user){
    //     studentModel.find((err,data)=>{
    //         if(err){
    //             console.log("err")
    //         }
    //         else{
    //              res.render('home',{'user':req.session.user,'stdData':data})
    //         }
    //     })
    // }
    // else{
    //     res.render('login')
    // }
    res.render('login',{'type':"/login"})
})

app.get('/home',(req,res)=>{
    
    studentModel.find((err,data)=>{
        if(err){
            console.log(err);
        } else {
            res.render('home',{'stdData':data});
        }
    })
    
});
app.post('/search',(req,res)=>{
    
    var obj = {}
    if(req.body.name){
        obj.name = req.body.name;
    }
    studentModel.find(obj,function(err,data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            res.render('search',{'stdData':data});
        }
    })
});    
    

app.post('/login',(req,res)=>{

    // var st = studentModel.findOne({name:0,address:1});
    // if(st.name == req.body.name && st.address == req.body.address)
    // {
    //     console.log("Next");
    //     res.redirect('/home');
    // }
    // else{
    //     console.log("wrong");
    //     res.redirect('/login');
    // }
    studentModel.findOne({},function(err,doc){
    if (doc.name == req.body.name &&  doc.address == req.body.address)
    {
        console.log("Next");
        res.redirect('/home');
    }
    else
    {
        console.log("Wrong");
        res.redirect('/');
    }
    });  
});

app.get('/AddStudent',(req,res)=>{
    res.render('add',{'type':"/AddStudent"})
})

app.post('/AddStudent',upload.single('image'),(req,res)=>{
    var obj = new studentModel({
        name:req.body.name,
        rno:req.body.rno,
        address:req.body.address,
        std:req.body.std,
        phone:req.body.phno,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    obj.save().then(()=>{
        console.log("Added data")
        res.redirect('/home')
    })
    
})

app.get('/UpdateStudent',(req,res)=>{
    
    studentModel.findById(req.query.id, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            res.render('add',{'type':"/UpdateStudent",'id':docs._id,'name':docs.name,'rno':docs.rno,'address':docs.address,'phno':docs.phone,'std':docs.std})
            console.log("Result : ", docs); 
        } 
    });
    
})

app.post('/UpdateStudent',upload.single('image'),(req,res)=>{
    studentModel.findByIdAndUpdate(req.body.id,
        {
            name:req.body.name,
            rno:req.body.rno,
            address:req.body.address,
            std:req.body.std,
            phone:req.body.phno,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        },(err,resp)=>{
            if(!err){
                res.redirect('/home')
            }
        })
})
app.get('/DeleteStudent', function(req, res) {
    studentModel.findOneAndRemove((req.query.id), (err, data)=> {
        if(!err){
        res.redirect('/home')
        }
    });  
});
app.listen(3000,(req,res)=>{
    console.log("connect!")
});

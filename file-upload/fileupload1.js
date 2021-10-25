var express =   require("express");  
var multer  =   require('multer');  
var app =   express();  
app.use(express.static('public'));  
/*
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  }//,  
//  filename: function (req, file, callback) {    callback(null, "file1.");    }  
});  */
var upload = multer({ dest : "./uploads"}).single('myfile');  

app.post('/file_upload',function(req,res){  
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        res.end("File is uploaded successfully!");  
    });  
});  
  
app.listen(8000);  

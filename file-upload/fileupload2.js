var express = require('express')
var multer  = require('multer')
var path = require('path');
var app = express()
app.use(express.static('public'));  
//var upload = multer({ dest: './uploads'})
var upload=multer({dest: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg') 
      return cb('Invalid file format'); //cb(err)
    cb(null, './uploads');
  }})

app.post('/file_upload', upload.single('myfile'), 
  function (req, res, next) {

  res.write(req.body.fname+" "+req.body.lname+"\n");
  res.write("file uploaded");
  res.end();
})

app.post('/photos_upload', upload.array('photos',3),

 function (req, res, next) {
  
  res.write(req.body.fname+" "+req.body.lname+"\n");
  res.write("files uploaded");
  res.end();
})

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) 
  {
    console.log("ERRRR");
    res.status(500).send("file upload  err "+
      err.message);
  }
  else 
  {
    console.log("ERRRR");
    res.status(500).send("err "+err.message);
    //next(err);
  }
});

app.listen(8000);
/*
file object structure
{
  "fieldname": "myfile",
  "originalname": "somefile.pdf",
  "encoding": "7bit",
  "mimetype": "application/pdf",
  "destination": "./uploads",
  "filename": "36db44e11b83f4513188f649ff445a2f",
  "path": "uploads\\36db44e11b83f4513188f649ff445a2f",
  "size": 1277191
}
*/

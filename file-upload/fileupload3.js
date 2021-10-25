var express = require('express')
var multer  = require('multer')
var path = require('path');
var app = express();
app.use(express.static('public'));  

var options = multer.diskStorage({ 
    destination : function (req, file, cb) {
      if (file.mimetype !== 'image/jpeg') 
      {
        return cb('Invalid file format'); //cb(err)
      }
      cb(null, './uploads');
    } ,
      filename: function (req, file, cb) {
        cb(null, (Math.random().toString(30)).
          slice(5, 10) + Date.now() 
          + path.extname(file.originalname));
      }
});

var upload= multer({ storage: options });

app.post('/file_upload', upload.single("myfile"), function (req, res, next) {
 /*upload.any() OR upload.fields([{
           name: 'video', maxCount: 1
         }, {
           name: 'subtitles', maxCount: 1
         }])*/
  res.write(req.body.fname+" "+req.body.lname+"\n");
  res.write("file uploaded");
  res.end();
})

app.post('/photos_upload', upload.array('photos',2), function (req, res, next) {
  // req.files is array of `photos` files
  res.write(req.body.fname+" "+req.body.lname+"\n");
  res.write("files uploaded");
  res.end();

})

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) 
  {
    console.log("ERRRR");
    res.status(500).send("file upload  err "+err.message);

  }
  else 
    next(err);
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

const express = require('express');
var mongoose = require('mongoose');
var jwt=require('jsonwebtoken');
mongoose.connect('mongodb://localhost:27017/db1',
 { useNewUrlParser: true, useUnifiedTopology: true }  );
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  }); 
var Book = mongoose.model('Book', BookSchema, "books"); //MODEL



app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/add', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {

      var book1 = new Book({
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity
    }); 
book1.save(function (err, book) {
      if (err) return console.error(err);
      id=book._id;
      console.log(book._id + " saved to books collection.");	      
      res.status(200).send(book);
      //res.send(book._id + " saved to books collection.")
}); 
      res.json({
        message: 'Data entered ...',
        authData

      });
    
    }
  });
});



app.delete('/api/delete/:id', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Book.findOneAndRemove(req.params.id,
        function (err, book) {
             if (err) return res.status(500).send(
               "There was a problem deleting.");
             res.status(200).send("Book: "+ book.name 
               +" was deleted.");
         });
      res.json({
        message: 'data deleted created...',
        authData

      });
    
    }
  });
});

app.get('/api/data', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      
	Book.find(function (err, books) {
  		if (err) return console.error(err);
  		console.log(books);
  		res.send(books);
	});
      res.json({
        message: 'Post created...',
        authData

      });
    
    }
  });
});





app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'vidhi',
    email: 'vidhi@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));
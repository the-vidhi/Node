var express = require('express');
var router = express.Router();

var UsersModel = require('../schema/user');
//var Response = require('../response');



//List Table Data
router.get('/', function(req, res,next) {
     
            res.render('index');
         
});




//List Table Data
router.get('/display', function(req, res) {
    UsersModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('display-table', { users: users });
            console.log(users);
        }
    });
});


//Display Form 
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


/* POST Data. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile
    }
    var data = UsersModel(mybodydata);
    
    data.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.render('add-form', { message : 'Inserted !!' });
           
        }     
    });
});

/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
    UsersModel.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

           
            res.redirect('../display');
        } else {

           
            res.redirect('../display');
        }
    });
});


/* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    UsersModel.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { userDetail: user });
        }
    });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
    UsersModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
           
            res.redirect('edit/' + req.params.id);
        } else {
            req.flash('success_msg', 'Record Updated');
            res.redirect('../display');
        }
    });
});

module.exports = router;

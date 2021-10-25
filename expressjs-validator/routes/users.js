const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.get('/', function (req, res) {
  res.send();
});


router.post('/', [
  //Validate and sanitize
    //check('name').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('name').exists().isLength({min: 5}).trim().escape().withMessage('Name must have more than 5 characters'),
    check('classYear', 'Enter Class Year ').not().isEmpty(),
    check('weekday', 'Choose a weekday').optional(),
    check('email', 'Your email is not valid').not().isEmpty().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
  ],
  function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      res.send({});
    }
  });
module.exports = router;
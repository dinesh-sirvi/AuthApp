var express = require('express');
var router = express.Router();



router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/register',function(req,res){
	res.render('register');
});
router.post('/register', function(req,res){
	var name = req.body['name'];
	var username = req.body['username'];
	var email = req.body['email'];
	var password1 = req.body['password1'];
	var paswword2 = req.body['password2'];

	req.checkBody('name', 'Name is requird').notEmpty();
	req.checkBody('username', 'Username is requird').notEmpty();
	req.checkBody('email', 'Email is requird').isEmail();
	req.checkBody('password1', 'Password is requird').notEmpty();
	req.checkBody('password2', 'Password doesnt match').equals(req.body.password1);

	req.getValidationResult().then(function(result) {
  		if(result.isEmpty()){
  			console.log("passed");
  		}
  		else
  		{
  			var errors = result.array();
  			console.log(errors);
  			res.render('register', {errors : errors});
  		}
	});
});
module.exports = router;
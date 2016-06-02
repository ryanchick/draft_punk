var models 	= require('./../models');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();


//register a new user
router.post('/create',function(req,res){
	var __user = {
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		teams: [],
		watchList: []
	};

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(__user.password, salt, function(err, hash) {
	        if(!err){
	        	__user.password = hash;
		        models.Users.create(__user)
		        	.then(function(user){
		        	//remove password from response
		        		user.password = '';
		        		res.json(user);
		        	})
	        } else {
	        	res.send('err')
	        }
	    });
	});
});

router.post('/login',function(req,res){
	// var __user = req.body;
	var where = {where:{username:req.body.username}};
	// var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		/*
		In order to log a user in, the user record is retrieved
		from the database based on their email. This is why it is important
		to have a UNIQUE constraint on the email property so you can't have
		two users with the same email entered in the database. The encrypted 
		password is retrieved from the database and the bycrypt compare function
		is run to see if the user entered the correct password. The function uses
		the encryption instructions stored as part of the password hash to encrypt
		the password he user just entered on log in. If the two encrypted strings match
		at the end, the password is deemed correct and the user is allowed in.
		*/
		bcrypt.compare(req.body.password, user.password, function(err, result) {
		    // res == true 
		    if(result==true){
		    	user.password = '';
		    	delete user.password;
		  //   	var user_obj = {email:user.email};
				// var token = jwt.sign(user_obj,'brainstationkey');

				// res.set('authentication',token);
		  //   	res.json(user_obj)
		    	var user_obj = {email:user.email,id:user.id};
				var token = jwt.sign(user_obj, 'A5kjdl341Dadf123dAdfDedcAdfeD673F231');
				res.set('authentication',token);
				res.json(user);
		    }
		    else{
		    	res.status(403)
		    		.json({err:'unauthorized'});
		    }
		});
		
	})

})

// //add new user
// router.post('/',function(req,res){
// 	var newUser = {
// 		username: req.body.username,
// 		password: req.body.password,
// 		firstName: req.body.firstName,
// 		lastName: req.body.lastName,
// 		email: req.body.email,
// 		teams: [],
// 		watchList: []
// 	};

// 	models.Users.create(newUser).then(function(user){
// 		console.log("making new user");
// 		res.send(user);
// 	})
// })

// //user login with existing username and password
// //sends back empty object if username/password do not match users
// router.post('/login', function(req,res){
// 	var where = {where:{username:req.body.username,password:req.body.password}};
// 	models.Users.find(where).then(function(user){
// 		if (user){
// 			var user_obj = {email:user.email,id:user.id};
// 			var token = jwt.sign(user_obj, 'A5kjdl341Dadf123dAdfDedcAdfeD673F231');
// 			res.set('authentication',token);
// 			res.json(user);
// 		} else {
// 			res.send({});
// 		}
// 	})
// })

module.exports = router;
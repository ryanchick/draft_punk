var models 	= require('./../models');
var router 	= require('express').Router();

//get all users?
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get info for specific user(show )
router.get('/:userId', function(req, res) {
	// console.log(req.params.userId)
	var where = {where:{id:req.params.userId}};
	models.Users.find(where).then(function(user){
		res.json(user);
	})
});

//add new user
router.post('/',function(req,res){
	var newUser = {
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		teams: [],
		watchList: []
	};

	models.Users.create(newUser).then(function(user){
		console.log("making new user");
		res.send(user);
	})
})

//user login with existing username and password
//sends back empty object if username/password do not match users
router.post('/login', function(req,res){
	var where = {where:{username:req.body.username,password:req.body.password}};
	models.Users.find(where).then(function(user){
		if (user){
			console.log("logging in");
			res.json(user);
		} else {
			res.send({});
		}
	})
})

//update account inform
router.put('/',function(req,res){
<<<<<<< Updated upstream
	
=======

>>>>>>> Stashed changes
})




module.exports = router;
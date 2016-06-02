var models 	= require('./../models');
var jwt 	= require('jsonwebtoken');
var router 	= require('express').Router();

//get all users?
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get info for specific user(show )
router.get('/:username', function(req, res) {
	console.log(req.params.userId)
	var where = {where:{username:req.params.username}};
	models.Users.find(where).then(function(user){
		user.password = '';
		delete user.password;
		res.json(user);
	})
});


//get list of leagues for user
router.post('/leagues', function(req, res){
	console.log("getting leagues");
	console.log(req.body);
	var where = {where:{$or:
		req.body
	}};
	models.Leagues.findAll(where).then(function(leagues){
		console.log("found leagues")
		console.log(leagues)
		res.json(leagues);
	})
})

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

//update account inform
router.put('/',function(req,res){

})




module.exports = router;
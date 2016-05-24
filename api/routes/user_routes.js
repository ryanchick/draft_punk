var models 	= require('./../models');
var router 	= require('express').Router();

//get all users?
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get info for specific user(show )
router.get('/:userId', function(req, res) {
	// console.log(req.body)
	// console.log(req.params.userId)
});

//add new user
router.post('/',function(req,res){
	//req.body
})

//update account inform
router.update('/',function(req,res){
	
})




module.exports = router;
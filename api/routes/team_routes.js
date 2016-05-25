var models 	= require('./../models');
var router 	= require('express').Router();

//get all teams
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get info for specific team
router.get('/:teamId', function(req, res) {
	// console.log(req.body)
	// console.log(req.params.userId)
});


//add new team
router.post('/:userId/addTeam',function (req,res){
	//create new Team
	//update user array of teams
})

//update team(adding/removing players)
router.put('/:teamId',function (req,res){
	//add player to team
})


//delete team
router.delete('/:userId/deleteTeam/:teamId',function(req,res){
	console.log(req.params.userId)
	console.log(req.params.teamId)
	//delete team
	//update user - remove team from array
})



module.exports = router;
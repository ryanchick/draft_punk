var models 	= require('./../models');
var router 	= require('express').Router();

//get players for draft
router.get('/init', function(req,res) {
	models.Stats.findAll()
		.then(function(ret){
			console.log(ret)
			res.json(ret)
		})
})

router.get('/players/:leagueId', function(req, res) {
	// console.log(req.body)
	// get list of players
	// remove players that have been already drafted (maybe done in query)
	// 

});

//get suggestions for team
router.get('/suggest/:teamId', function(req,res){
	//get players in team
	//analyze team composition/stats
	//change weightings
	//get list of remaining players
	//return top 3 suggested players
})


//draft player
router.post('/:leagueId', function(req, res) {
	// console.log(req.body)
	//body needs ({leagueId,teamId,playerId})
	// add player to team - team update
	// add player to list of drafted players - league model update
});

module.exports = router;
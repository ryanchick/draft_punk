var models 	= require('./../models');
var router 	= require('express').Router();

//get players for draft
router.get('/', function(req, res) {
	// console.log(req.body)
});


//draft player
router.post('/:leagueId', function(req, res) {
	// console.log(req.body)
	//body needs ({leagueId,teamId,playerId})
	// add player to team
	// add player to list of drafted players
});

module.exports = router;
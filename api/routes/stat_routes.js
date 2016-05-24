var models 	= require('./../models');
var router 	= require('express').Router();


//get all stats
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get stats for specific player
router.get('/:playerId', function(req, res) {
	// console.log(req.body)
	// console.log(req.params.playerId)
});

router.get('/init', function(req, res){
	//load positions from file if necessary
})

module.exports = router;
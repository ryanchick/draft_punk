var models 	= require('./../models');
var router 	= require('express').Router();

//get all leagues
router.get('/', function(req, res) {
	// console.log(req.body)
});


//get info for specific league
router.get('/:leagueId', function(req, res) {
	var where = {where:{id:req.params.leagueId}};
	models.Leagues.find(where).then(function(league){
		console.log(league);
		res.json(league);
	})
});

//add new league
router.post('/newLeague',function (req,res){
	var teams = [];
	var num = req.body.leagueSize;
	console.log(req);
	for(var i = 0; i < num; i++){
		teams.push({
			teamId:i,
			teamName:'Team '+(i+1),
			user:false,
			players:{
				"PG":"",
				"SG":"",
				"SF":"",
				"PF":"",
				"C":"",
				"G":"",
				"F":"",
				"UTIL1":"",
				"UTIL2":"",
				"UTIL3":"",
				"BENCH1":"",
				"BENCH2":"",
				"BENCH3":""
			},
			stats:{
				pts:0,
				ast:0,
				reb:0,
				stl:0,
				blk:0,
				fg3m:0,
				fgm:0,
				fga:0,
				ftm:0,
				fta:0,
				tov:0,
				count:0
			}
		})
		if ((i+1) == req.body.userPosition){
			teams[i].user = true;
			teams[i].teamName = 'My Team';
		}
	}

	var newLeague = {
		leagueName: req.body.leagueName,
		userId: req.body.userId,
		userPosition: req.body.userPosition,
		teams: teams,
		draftedPlayers: []
	}

	models.Leagues.create(newLeague)
	.then(function(league){
		console.log('created league')
		res.json(league);
		return league.id;
	}).then(function(leagueId){
		var where = {where:{id:req.body.userId}};
		models.Users.find(where).then(function(user){
			// console.log("old teams:");
			// console.log(user);
			var tempTeams = user.teams;
			tempTeams.push(leagueId);
			user.updateAttributes({
				teams: tempTeams
			}).then(function(){
				// console.log("new teams:");
				// console.log(user);
			})
		})
	})
})

//update team(adding/removing players)
router.put('/:leagueId',function (req,res){
	var where = {where:{id:req.params.leagueId}};
	models.Leagues.find(where).then(function(league){
		league.updateAttributes({
			teams: req.body.teams,
			draftedPlayers: req.body.draftedPlayers
		}).then(function(){
			res.json(league);
		})
	})
})


//delete team
router.delete('/:userId/deleteTeam/:teamId',function(req,res){
	console.log(req.params.userId)
	console.log(req.params.teamId)
	//delete team
	//update user - remove team from array
})



module.exports = router;
var models 	= require('./../models');
var router 	= require('express').Router();

var availPlayers = [];

var ovrWgts = {
	pts: 0.33,
	ast: 1.0,
	reb: 0.8,
	stl: 4.50,
	blk: 2.5,
	fg3: 2.5,
	fgp: 0.05,
	ftp: 0.05,
	tov: -1.5,
	fgpAvg: 45.2,
	ftpAvg: 75.7
}
var goals = {
	pts:14.78,
	ast:3.33,
	reb:5.99,
	stl:1.09,
	blk:0.74,
	fg3:1.07,
	fgp:0.464,
	ftp:0.783,
	tov:2.0
}
var maxVar = 0.25;

//get players for draft
router.get('/init/:leagueId', function(req,res) {
	var where = {where:{id:req.params.leagueId}};
	var draftLeague;
	models.Leagues.find(where)
		.then(function(league){
			// console.log(league);
			draftLeague = league;
			return models.Stats.findAll()
		})
		.then(function(stats){
			var l = stats.length;
			var draftedLength = draftLeague.draftedPlayers.length
			// console.log(l)
			availPlayers = [];

			//remove already drafted players from list
			for(var i = 0; i < l;i++){
				var flag = false;
				for(var j = 0;j < draftedLength;j++){
					if(stats[i].dataValues.name == draftLeague.draftedPlayers[j].name){
						flag = true;
					}
				}
				if(flag == false){
					availPlayers.push(stats[i].dataValues)
				}
			}
		
			// console.log('initialized')
			var l = availPlayers.length;
			//give unadjusted 
			for(var i = 0; i < l;i++){
				var __player = availPlayers[i];
				__player.fgp = __player.fga > 0 ? __player.fgm/__player.fga * 100: 0;
				__player.ftp = __player.fta > 0 ? __player.ftm/__player.fta * 100: 0;
				availPlayers[i].totRtg = 
					__player.pts * ovrWgts.pts +
					__player.ast * ovrWgts.ast +
					__player.reb * ovrWgts.reb +
					__player.stl * ovrWgts.stl +
					__player.blk * ovrWgts.blk +
					__player.fg3m  * ovrWgts.fg3 +
					(__player.fgp - ovrWgts.fgpAvg) * __player.fga * ovrWgts.fgp + 
					(__player.ftp - ovrWgts.ftpAvg) * __player.fta * ovrWgts.ftp +
					__player.tov * ovrWgts.tov
					* (1 + ((__player.games_played - 72)/ 82));
			}
			availPlayers.sort(function(a, b) {
			  return b.totRtg - a.totRtg;
			});
			res.json({league:draftLeague,players:availPlayers})
			// console.log(availPlayers)
		})
})

router.get('/players/:leagueId', function(req, res) {
	// console.log(req.body)
	// get list of players
	// remove players that have been already drafted (maybe done in query)
	// 

});

router.post('/', function(req,res){
	var player = req.body.player;
	console.log(player.name)

	//remove player from list
	var l = availPlayers.length;
	for(var i = 0; i < l; i++){
		if(availPlayers[i].nba_id == player.nba_id){
			console.log('drafted')
			console.log(i)
			availPlayers.splice(i,1);
			break;
		}
	}

	var missing = "";
	var userTeam = req.body.team.stats;

	var __team = {
		pts: userTeam.pts/userTeam.count,
		ast: userTeam.ast/userTeam.count,
		reb: userTeam.reb/userTeam.count,
		stl: userTeam.stl/userTeam.count,
		blk: userTeam.blk/userTeam.count,
		fg3: userTeam.fg3m/userTeam.count,
		fgp: userTeam.fga > 0 ? userTeam.fgm/userTeam.fga : 0,
		ftp: userTeam.fta > 0 ? userTeam.ftm/userTeam.fta : 0,
		tov: userTeam.tov/userTeam.count
	}
	var teamWgts = {pts: 1,ast: 1,reb: 1,stl: 1,blk: 1,fg3: 1,fgp: 1,ftp: 1,tov: 1}

	//adjust team stat weightings based on current stats
	if(__team.pts > 0){
		for(var stat in __team){
			// console.log(stat)
			var __change = (goals[stat]-__team[stat])/Math.min(__team[stat],goals[stat]) * maxVar;
			var __change = (Math.abs(__change) < maxVar) ? __change : (__change >= 0 ? maxVar : maxVar * -1);
			teamWgts[stat] = 1 + __change;
		}
	}
	if(userTeam.count >= 7){
		for(var pos in req.body.players){
			if(!(pos.match('UTIL') || pos.match('BENCH'))){
				if(req.body.players[pos] == ""){
					missing = pos;
					console.log(missing)
					break;
				}
			}
		}
	}
	console.log('weightings')
	console.log(teamWgts)

	var l = availPlayers.length;
	//clone players array so list of players doesn't change when recalculating ratings
	var __newPlayers = JSON.parse(JSON.stringify(availPlayers));
	for(var i = 0; i < l;i++){
		var __player = __newPlayers[i];
		__player.fgp = __player.fga > 0 ? __player.fgm/__player.fga * 100: 0;
		// console.log(__player.fgp)
		__player.ftp = __player.fta > 0 ? __player.ftm/__player.fta * 100: 0;
		__newPlayers[i].totRtg = 
			__player.pts * teamWgts.pts * ovrWgts.pts +
			__player.ast * teamWgts.ast * ovrWgts.ast +
			__player.reb * teamWgts.reb * ovrWgts.reb +
			__player.stl * teamWgts.stl * ovrWgts.stl +
			__player.blk * teamWgts.blk * ovrWgts.blk +
			__player.fg3m * teamWgts.fg3 * ovrWgts.fg3 +
			(__player.fgp - ovrWgts.fgpAvg) * __player.fga * teamWgts.fgp * ovrWgts.fgp + 
			(__player.ftp - ovrWgts.ftpAvg) * __player.fta * teamWgts.ftp * ovrWgts.ftp +
			__player.tov * teamWgts.tov * ovrWgts.tov
			* (1 + ((__player.games_played - 72)/ 82));
	}

	//remove players with invalid ratings or that don't match required position
	var validPlayers = __newPlayers.filter(function(player){
		// console.log(player)
		if(isNaN(player.totRtg)){
			return false;
		}
		if(missing != ""){
			if(!player.position.match(missing)){
				return false;
			}
		}
		return true;
	})

	// sort players to find recommendations
	validPlayers.sort(function(a, b) {
	  return b.totRtg - a.totRtg;
	});
	var suggested = [validPlayers[0],validPlayers[1],validPlayers[2]]

	// res.send(suggested)
	var ret = {
		players:availPlayers,
		suggest:suggested
	}
	res.json(ret)
	// I'm typing a bunch of nonsense to look like I'm typing for a silly photo
})

//get suggestions for team
router.put('/:teamId', function(req,res){
	//get players in team
	//analyze team composition/stats
	//change weightings
	//get list of remaining players
	//return top 3 suggested players

	// var missing = "";
	// var userTeam = req.body.stats;

	// var __team = {
	// 	pts: userTeam.pts/userTeam.count,
	// 	ast: userTeam.ast/userTeam.count,
	// 	reb: userTeam.reb/userTeam.count,
	// 	stl: userTeam.stl/userTeam.count,
	// 	blk: userTeam.blk/userTeam.count,
	// 	fg3: userTeam.fg3m/userTeam.count,
	// 	fgp: userTeam.fga > 0 ? userTeam.fgm/userTeam.fga : 0,
	// 	ftp: userTeam.fta > 0 ? userTeam.ftm/userTeam.fta : 0,
	// 	tov: userTeam.tov/userTeam.count
	// }
	// var teamWgts = {pts: 1,ast: 1,reb: 1,stl: 1,blk: 1,fg3: 1,fgp: 1,ftp: 1,tov: 1}

	// //adjust team stat weightings based on current stats
	// if(__team.pts > 0){
	// 	for(var stat in __team){
	// 		// console.log(stat)
	// 		var __change = (goals[stat]-__team[stat])/Math.min(__team[stat],goals[stat]) * maxVar;
	// 		var __change = (Math.abs(__change) < maxVar) ? __change : (__change >= 0 ? maxVar : maxVar * -1);
	// 		teamWgts[stat] = 1 + __change;
	// 	}
	// }
	// if(userTeam.count >= 7){
	// 	for(var pos in req.body.players){
	// 		if(!(pos.match('UTIL') || pos.match('BENCH'))){
	// 			if(req.body.players[pos] == ""){
	// 				missing = pos;
	// 				console.log(missing)
	// 				break;
	// 			}
	// 		}
	// 	}
			
	// }
	// console.log(teamWgts)
	// // Math.abs(A) < Math.abs(B) ? A : B;



	// var l = availPlayers.length;
	// //clone players array so list of players doesn't change when recalculating ratings
	// var __newPlayers = JSON.parse(JSON.stringify(availPlayers));
	// for(var i = 0; i < l;i++){
	// 	var __player = __newPlayers[i];
	// 	__player.fgp = __player.fga > 0 ? __player.fgm/__player.fga * 100: 0;
	// 	// console.log(__player.fgp)
	// 	__player.ftp = __player.fta > 0 ? __player.ftm/__player.fta * 100: 0;
	// 	__newPlayers[i].totRtg = 
	// 		__player.pts * teamWgts.pts * ovrWgts.pts +
	// 		__player.ast * teamWgts.ast * ovrWgts.ast +
	// 		__player.reb * teamWgts.reb * ovrWgts.reb +
	// 		__player.stl * teamWgts.stl * ovrWgts.stl +
	// 		__player.blk * teamWgts.blk * ovrWgts.blk +
	// 		__player.fg3m * teamWgts.fg3 * ovrWgts.fg3 +
	// 		(__player.fgp - ovrWgts.fgpAvg) * __player.fga * teamWgts.fgp * ovrWgts.fgp + 
	// 		(__player.ftp - ovrWgts.ftpAvg) * __player.fta * teamWgts.ftp * ovrWgts.ftp +
	// 		__player.tov * teamWgts.tov * ovrWgts.tov
	// 		* (1 + ((__player.games_played - 72)/ 82));
	// }
	// var validPlayers = __newPlayers.filter(function(player){
	// 	// console.log(player)
	// 	if(isNaN(player.totRtg)){
	// 		return false;
	// 	}
	// 	if(missing != ""){
	// 		if(!player.position.match(missing)){
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// 	// return true;
	// })
	// // console.log(validPlayers)
	// validPlayers.sort(function(a, b) {
	//   return b.totRtg - a.totRtg;
	// });

	// // console.log(validPlayers[0])
	// var suggested = [validPlayers[0],validPlayers[1],validPlayers[2]]
	// // console.log(availPlayers[0].games_played)
	// // console.log(availPlayers[1].games_played)
	// // console.log(availPlayers[1].totRtg)
	// // console.log(availPlayers[2].games_played)
	// res.send(suggested)
})


//draft player
router.post('/:leagueId', function(req, res) {
	// console.log(req.body)
	//body needs ({leagueId,teamId,playerId})
	// add player to team - team update
	// add player to list of drafted players - league model update
});

module.exports = router;
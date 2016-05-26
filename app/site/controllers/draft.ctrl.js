(function(){
	angular
		.module('draftApp')
		.controller('DraftCtrl',DraftCtrl)

	function DraftCtrl ($http,$routeParams,stats){
		var draftVm = this;
		// console.log('draft')
		draftVm.playerStats = stats.data;
		draftVm.numTeams = 12;
		draftVm.userPick = 6;
		draftVm.myTeam = {
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
		}
		draftVm.rounds = [0,1,2,3,4,5,6,7,8,9,10,11,12];
		draftVm.curRound = 0;
		draftVm.curPick = 0;
		draftVm.playerSelect;
		draftVm.done = false;
		draftVm.searchName = "";
		draftVm.league = createLeague(draftVm.numTeams,draftVm.userPick);
		draftVm.draftedPlayers = [];
		draftVm.myPick = false;
		checkSelected();
		// draftVm.playerSelect = draftVm.filtered[1];

		//public methods
		draftVm.abbrev = abbrev;
		draftVm.show = show;
		draftVm.draft = draft;
		draftVm.checkSelected = checkSelected;

		function abbrev(name){
			var arr = name.split(" ")
			// console.log(arr)
			arr[0] = arr[0].charAt(0) + ". ";
			var abbr = arr.reduce(function(a,b){
				return a+b;
			})
			return abbr;
		}

		function show(player){
			draftVm.playerSelect = player;
		}

		function checkSelected(){
			draftVm.playerStats = draftVm.playerStats.filter(function(player){
				for(var i = 0;i < draftVm.league.draftedPlayers.length; i++){
					if(player.nba_id == draftVm.league.draftedPlayers[i].nba_id){
						return false;
					}
				}
				return true;
			})
		}

		function draft(player){
			console.log('draft')
			//calculate which team is currently picking
			if(draftVm.curRound % 2 == 0){
				var pickTeam = (draftVm.curPick % draftVm.numTeams);
				if(pickTeam + 1 == draftVm.userPick ){
					draftVm.myPick = true;
				}
			} else if(draftVm.curRound % 2 == 1){
				var pickTeam = (draftVm.numTeams-1) - (draftVm.curPick % draftVm.numTeams);
				if(pickTeam + 1 == (draftVm.numTeams-draftVm.userPick)){
					draftVm.myPick = true;
				}
			}
			console.log(pickTeam)
			
			draftVm.league.teams[pickTeam].players.push(player);
			draftVm.league.draftedPlayers.push(player);
			if(draftVm.curPick % draftVm.numTeams == (draftVm.numTeams-1) && draftVm.curRound != 12){
				draftVm.curRound++;
			}
			if(draftVm.curPick == ((draftVm.numTeams * 13) - 1)){
				console.log(draftVm.done)
				draftVm.done = true;
			}else{
				draftVm.curPick++;
			}

			//add pick to team sidebar if picking for user team
			if(draftVm.myPick == true){
				if(draftVm.myTeam[player.position] == ""){
					console.log(player.position)
					draftVm.myTeam[player.position] = player;
				} else if(draftVm.myTeam["G"] == "" && (player.position == "PG" || player.position == "SG")){
					console.log("G")
					draftVm.myTeam["G"] = player;
				} else if(draftVm.myTeam["F"] == "" && (player.position == "PF" || player.position == "SF")){
					draftVm.myTeam["F"] = player;
				} else if(draftVm.myTeam["UTIL1"] == ""){
					draftVm.myTeam["UTIL1"] = player;
				} else if(draftVm.myTeam["UTIL2"] == ""){
					draftVm.myTeam["UTIL2"] = player;
				} else if(draftVm.myTeam["UTIL3"] == ""){
					draftVm.myTeam["UTIL3"] = player;
				} else if(draftVm.myTeam["BENCH1"] == ""){
					draftVm.myTeam["BENCH1"] = player;
				} else if(draftVm.myTeam["BENCH2"] == ""){
					draftVm.myTeam["BENCH2"] = player;
				} else if(draftVm.myTeam["BENCH3"] == ""){
					draftVm.myTeam["BENCH3"] = player;
				}
			}
			draftVm.myPick = false;
			
			//refilter players remaining
			checkSelected();

			//repopulate player info box with top remaining scorer
			if(player == draftVm.filtered[0]){
				draftVm.playerSelect = draftVm.filtered[1];
			}else{
				draftVm.playerSelect = draftVm.filtered[0];
			}

		}

		function createLeague(num,nth){
			var teams = [];
			for(var i = 0; i < num; i++){
				teams.push({teamId:i,teamName:'Team '+(i+1),user:false,players:[]})
				if (nth == (i+1)){
					teams[i].user = true;
				}
			}
			console.log(teams)
			var league = {
				id:$routeParams.leagueId,
				teams:teams,
				draftedPlayers:[]
			}
			return league;
		}

	}
})();
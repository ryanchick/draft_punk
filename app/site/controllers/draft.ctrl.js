(function(){
	angular
		.module('draftApp')
		.controller('DraftCtrl',DraftCtrl)

	function DraftCtrl ($timeout, $http,$routeParams,$location, stats, playerSrv){
		var draftVm = this;
		// console.log('draft')
		
		draftVm.playerStats = stats.data.players;
		draftVm.league = stats.data.league;
		console.log(draftVm.league)
		draftVm.numTeams = draftVm.league.teams.length;
		draftVm.userPick = draftVm.league.userPosition;
		draftVm.rounds = [0,1,2,3,4,5,6,7,8,9,10,11,12];
		draftVm.curRound = 0;
		draftVm.curPick = 0;
		draftVm.playerSelect;
		draftVm.done = false;
		draftVm.searchName = "";
		//draftVm.league = createLeague(draftVm.numTeams,draftVm.userPick);
		draftVm.draftedPlayers = [];
		draftVm.myPick = false;
		draftVm.teamSelect = draftVm.league.teams[draftVm.userPick-1];
		draftVm.goals = [14.78,3.33,5.99,1.09,0.74,1.07,46.4,78.3,2.0]
		draftVm.targets = {
			pts:14.78,
			ast:3.33,
			reb:5.99,
			stl:1.09,
			blk:0.74,
			fg3m:1.07,
			fgp:0.464,
			ftp:0.783,
			tov:2.0
		}

		draftVm.suggested = [draftVm.playerStats[0],
			draftVm.playerStats[1],
			draftVm.playerStats[2]];
		draftVm.drafting = false;
		draftVm.teamGraph = false;


		//draftVm.avg = playerSrv.avgStats[draftVm.playerSelect.position];

		resumeProgress();
		checkSelected();
		// drawTeamChart();
		// draftVm.playerSelect = draftVm.filtered[1];

		//public methods
		draftVm.abbrev = abbrev;
		draftVm.show = show;
		draftVm.draft = draft;
		draftVm.checkSelected = checkSelected;
		draftVm.teamTotals = teamTotals;
		draftVm.isSuggest = isSuggest;
		draftVm.colourScale = colourScale;
		draftVm.drawPlayerChart = drawPlayerChart;
		draftVm.drawTeamChart = drawTeamChart;

		function abbrev(name){
			var arr = name.split(" ")
			// console.log(arr)
			arr[0] = arr[0].charAt(0) + ".";
			var abbr = arr.reduce(function(a,b){
				return a+" "+b;
			})
			return abbr;
		}

		function show(player){
			draftVm.playerSelect = player;
			draftVm.drawPlayerChart();
			draftVm.drawTeamChart();
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

		function removePlayer(player){
			var l = draftVm.playerStats.length;
			for(var i = 0; i < l;i++){
				if(player.nba_id == draftVm.playerStats[i].nba_id){
					draftVm.playerStats.splice(i,1);
					break;
				}
			}
		}



		function draft(player){
			draftVm.myPick = false;
			draftVm.drafting = true;
			//console.log('draft')
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
			//console.log(pickTeam)
			
			//put selected player into appropriate team slot
			if(draftVm.league.teams[pickTeam].players[player.position] == ""){
				//console.log(player.position)
				draftVm.league.teams[pickTeam].players[player.position] = player;
			} else if(draftVm.league.teams[pickTeam].players["G"] == "" && (player.position == "PG" || player.position == "SG")){
				//console.log("G")
				draftVm.league.teams[pickTeam].players["G"] = player;
			} else if(draftVm.league.teams[pickTeam].players["F"] == "" && (player.position == "PF" || player.position == "SF")){
				draftVm.league.teams[pickTeam].players["F"] = player;
			} else if(draftVm.league.teams[pickTeam].players["UTIL1"] == ""){
				draftVm.league.teams[pickTeam].players["UTIL1"] = player;
			} else if(draftVm.league.teams[pickTeam].players["UTIL2"] == ""){
				draftVm.league.teams[pickTeam].players["UTIL2"] = player;
			} else if(draftVm.league.teams[pickTeam].players["UTIL3"] == ""){
				draftVm.league.teams[pickTeam].players["UTIL3"] = player;
			} else if(draftVm.league.teams[pickTeam].players["BENCH1"] == ""){
				draftVm.league.teams[pickTeam].players["BENCH1"] = player;
			} else if(draftVm.league.teams[pickTeam].players["BENCH2"] == ""){
				draftVm.league.teams[pickTeam].players["BENCH2"] = player;
			} else if(draftVm.league.teams[pickTeam].players["BENCH3"] == ""){
				draftVm.league.teams[pickTeam].players["BENCH3"] = player;
			} else {
				console.log('invalid pick')
				draftVm.drafting = false;
				return;
			}

			draftVm.league.teams[pickTeam].stats.pts += player.pts;
			draftVm.league.teams[pickTeam].stats.ast += player.ast;
			draftVm.league.teams[pickTeam].stats.reb += player.reb;
			draftVm.league.teams[pickTeam].stats.stl += player.stl;
			draftVm.league.teams[pickTeam].stats.blk += player.blk;
			draftVm.league.teams[pickTeam].stats.fg3m += player.fg3m;
			draftVm.league.teams[pickTeam].stats.fgm += player.fgm;
			draftVm.league.teams[pickTeam].stats.fga += player.fga;
			draftVm.league.teams[pickTeam].stats.ftm += player.ftm;
			draftVm.league.teams[pickTeam].stats.fta += player.fta;
			draftVm.league.teams[pickTeam].stats.tov += player.tov;
			draftVm.league.teams[pickTeam].stats.count++;

			// draftVm.league.teams[pickTeam].players.push(player);
			
			draftVm.league.draftedPlayers.push(player);

			if(draftVm.curPick % draftVm.numTeams == (draftVm.numTeams-1) && draftVm.curRound != 12){
				draftVm.curRound++;
				$http.put('api/league/'+draftVm.league.id, {teams:draftVm.league.teams,draftedPlayers:draftVm.league.draftedPlayers})
			}
			if(draftVm.curPick == ((draftVm.numTeams * 13) - 1)){
				console.log(draftVm.done)
				$http.put('api/league/'+draftVm.league.id, {teams:draftVm.league.teams,draftedPlayers:draftVm.league.draftedPlayers})
					.then(function(res){
						console.log("saved league as:");
						console.log(res);
						draftVm.done = true;
						$timeout(function() {
                    		$location.path('/review/' + $routeParams.leagueId);
            			}, 1000);
					})
				
				

				//console.log(draftVm.league)

			}else{
				draftVm.curPick++;
				$http.put('api/league/'+draftVm.league.id, {teams:draftVm.league.teams,draftedPlayers:draftVm.league.draftedPlayers})
			}

			// draftVm.myPick = false;
			
			//refilter players remaining
			// checkSelected();
			removePlayer(player);

			//repopulate player info box with top remaining scorer
			var __post = {
				player:player,
				team:draftVm.league.teams[(draftVm.userPick - 1)]
			}
			$http.post('/api/draft/',__post)
				.then(function(res){
					//console.log(res);
					draftVm.playerStats = res.data.players;
					draftVm.suggested = res.data.suggest;
					
					if(player == draftVm.filtered[0]){
						draftVm.playerSelect = draftVm.filtered[1];
					}else{
						draftVm.playerSelect = draftVm.filtered[0];
					}
					// return $http.put('/api/draft/' + (draftVm.userPick - 1),draftVm.league.teams[(draftVm.userPick - 1)])
				})
				.then(function(){
					draftVm.show(draftVm.playerSelect);
					draftVm.drafting = false;
				})	

			if(draftVm.done == true){
				$timeout(function() {
                    	$location.path('/review/' + $routeParams.leagueId);
            	}, 1500);
			}		

		}

		function teamTotals(players){
			var totals = {
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
				tov:0
			}
			for(var pos in players){
				if(players[pos] != ""){
					totals.pts += players[pos].pts;
					totals.ast += players[pos].ast;
					totals.reb += players[pos].reb;
					totals.stl += players[pos].stl;
					totals.blk += players[pos].blk;
					totals.fg3m += players[pos].fg3m;
					totals.fgm += players[pos].fgm;
					totals.fga += players[pos].fga;
					totals.ftm += players[pos].ftm;
					totals.fta += players[pos].fta;
					totals.tov += players[pos].tov;
				}
			}
			//console.log(totals)
			return totals;
		}

		function resumeProgress(){
			
			draftVm.numTeams = draftVm.league.teams.length;
			draftVm.userPick = draftVm.league.userPosition;
			draftVm.curPick = draftVm.league.draftedPlayers.length;
			draftVm.curRound = Math.floor(draftVm.curPick/draftVm.numTeams);
			if(draftVm.curPick == draftVm.numTeams * 13){
				draftVm.done = true;
				$timeout(function() {
                    $location.path('/review/' + $routeParams.leagueId);
            	}, 2000);
			}
			console.log(draftVm.curPick)
			console.log(draftVm.numTeams * 13)
		}

		function isSuggest(player){
			if(player){
				for(var i = 0;i < draftVm.suggested.length;i++){

					if(player.nba_id == draftVm.suggested[i].nba_id){
						return i;
					}
				}
			}
			return -1;
		}

		function colourScale(value, goal)
		{
			var style = {'font-weight':'bold'}
			// console.log(value,goal)
			//for shooting pcts
			if(goal >= 70){
				style.opacity = (0.5 +  0.05 * Math.min(Math.abs(value-goal),10));
			}else if(goal >= 40){
				style.opacity = (0.5 +  0.1 * Math.min(Math.abs(value-goal),5));
			}else{
				style.opacity = (0.5 +  Math.min(0.5 * Math.abs((value-goal)/goal),0.5));
			}
			//change color based on which is higher
			if(value < goal){
				style.color = 'red';
			}else{
				style.color = 'green';
			}
			return style;
		}

		function drawPlayerChart(){
			draftVm.avg = playerSrv.avgStats[draftVm.playerSelect.position];
			draftVm.std = playerSrv.stdDev[draftVm.playerSelect.position].dev;
			draftVm.options = {
			    chart: {
			        type: 'discreteBarChart',
			        height: 150,
			        //width: 400,
			        margin : {
			            top: 5,
			            right: 0,
			            bottom: 45,
			            left: 55
			        },
			        showControls:false,
			        reduceXTicks:false,
			        x: function(d){ return d.label; },
			        y: function(d){ return d.value; },
			        showValues: true,
			        forceY:[-2,2],
			        valueFormat: function(d){
			            return d3.format(',.1f')(d);
			        },
			        transitionDuration: 500,
			        xAxis: {
			            axisLabel: 'Standard Fantasy Categories',
			            axisLabelDistance: -5
			        },
			        yAxis: {
			            axisLabel: 'Std Dev. vs '+draftVm.playerSelect.position,
			            axisLabelDistance: -5,
			            tickFormat: d3.format(',.1f')
			        }
			    }
			};

			draftVm.data = [{
			    key: draftVm.playerSelect.name,
			    // values: [
			    //     { "label" : "PTS" , "value" : (draftVm.playerSelect.pts-draftVm.avg.pts)/draftVm.avg.pts},
			    //     { "label" : "AST" , "value" : (draftVm.playerSelect.ast-draftVm.avg.ast)/draftVm.avg.ast},
			    //     { "label" : "REB" , "value" : (draftVm.playerSelect.reb-draftVm.avg.reb)/draftVm.avg.reb},
			    //     { "label" : "STL" , "value" : (draftVm.playerSelect.stl-draftVm.avg.stl)/draftVm.avg.stl},
			    //     { "label" : "BLK" , "value" : (draftVm.playerSelect.blk-draftVm.avg.blk)/draftVm.avg.blk},
			    //     { "label" : "3PT" , "value" : (draftVm.playerSelect.fg3m-draftVm.avg.fg3m)/draftVm.avg.fg3m},
			    //     { "label" : "FG%" , "value" : ((draftVm.playerSelect.fga == 0 ? 0 : draftVm.playerSelect.fgm/draftVm.playerSelect.fga) - draftVm.avg.fgp)/draftVm.avg.fgp},
			    //     { "label" : "FT%" , "value" : ((draftVm.playerSelect.fta == 0 ? 0 : draftVm.playerSelect.ftm/draftVm.playerSelect.fta) - draftVm.avg.ftp)/draftVm.avg.ftp},
			    //     { "label" : "TO"  , "value" : (draftVm.avg.tov-draftVm.playerSelect.tov)/draftVm.avg.tov}
			    // ]
			    values: [
			        { "label" : "PTS" , "value" : (draftVm.playerSelect.pts-draftVm.avg.pts)/draftVm.std.pts},
			        { "label" : "AST" , "value" : (draftVm.playerSelect.ast-draftVm.avg.ast)/draftVm.std.ast},
			        { "label" : "REB" , "value" : (draftVm.playerSelect.reb-draftVm.avg.reb)/draftVm.std.reb},
			        { "label" : "STL" , "value" : (draftVm.playerSelect.stl-draftVm.avg.stl)/draftVm.std.stl},
			        { "label" : "BLK" , "value" : (draftVm.playerSelect.blk-draftVm.avg.blk)/draftVm.std.blk},
			        { "label" : "3PT" , "value" : (draftVm.playerSelect.fg3m-draftVm.avg.fg3m)/draftVm.std.fg3m},
			        { "label" : "FG%" , "value" : ((draftVm.playerSelect.fga == 0 ? 0 : draftVm.playerSelect.fgm/draftVm.playerSelect.fga) - draftVm.avg.fgp)/draftVm.std.fgp},
			        { "label" : "FT%" , "value" : ((draftVm.playerSelect.fta == 0 ? 0 : draftVm.playerSelect.ftm/draftVm.playerSelect.fta) - draftVm.avg.ftp)/draftVm.std.ftp},
			        { "label" : "TO"  , "value" : (draftVm.avg.tov-draftVm.playerSelect.tov)/draftVm.std.tov}
			    ]
			}];
			//window.dispatchEvent(new Event('resize'));
			$timeout(function() {
                    window.dispatchEvent(new Event('resize'));
            }, 75);
		}

		function drawTeamChart(){
			var __team = draftVm.teamSelect.stats;
			var __player = draftVm.playerSelect
			console.log('__team');
			console.log(__team);
			draftVm.teamOptions = {
			    chart: {
			        type: 'multiBarChart',
			        height: 200,
			        //width: 400,
			        margin : {
			            top: 5,
			            right: 0,
			            bottom: 45,
			            left: 55
			        },
			        color:(["#107c10","#5dc21e"]),
			        showControls:false,
			        reduceXTicks:false,
			        x: function(d){ return d.label; },
			        y: function(d){ return d.value; },
			        showValues: true,
			        valueFormat: function(d){
			            return d3.format(',.4%')(d);
			        },
			        transitionDuration: 500,
			        xAxis: {
			            axisLabel: 'Standard Fantasy Categories',
			            axisLabelDistance: -5
			        },
			        yAxis: {
			            axisLabel: '% Relative to Targets',
			            axisLabelDistance: -5,
			            tickFormat: d3.format(',.1%')
			        }
			    }
			};

			draftVm.teamData = [{
			    key: draftVm.teamSelect.teamName,
			    values: [
			        { "label" : "PTS" , "value" : pctDiff(__team.pts/__team.count,draftVm.targets.pts)},
			        { "label" : "AST" , "value" : pctDiff(__team.ast/__team.count,draftVm.targets.ast)},
			        { "label" : "REB" , "value" : pctDiff(__team.reb/__team.count,draftVm.targets.reb)},
			        { "label" : "STL" , "value" : pctDiff(__team.stl/__team.count,draftVm.targets.stl)},
			        { "label" : "BLK" , "value" : pctDiff(__team.blk/__team.count,draftVm.targets.blk)},
			        { "label" : "3PT" , "value" : pctDiff(__team.fg3m/__team.count,draftVm.targets.fg3m)},
			        { "label" : "FG%" , "value" : pctDiff((__team.fga == 0 ? NaN : __team.fgm/__team.fga),draftVm.targets.fgp)},
			        { "label" : "FT%" , "value" : pctDiff((__team.fta == 0 ? NaN : __team.ftm/__team.fta),draftVm.targets.ftp)},
			        { "label" : "TO"  , "value" : -1 * pctDiff(__team.tov/__team.count,draftVm.targets.tov)}
			    ]}
			,{
			    key: 'w/ Added Player',
			    values: [
			        { "label" : "PTS" , "value" : pctDiff((__team.pts+__player.pts)/(__team.count+1),draftVm.targets.pts)},
			        { "label" : "AST" , "value" : pctDiff((__team.ast+__player.ast)/(__team.count+1),draftVm.targets.ast)},
			        { "label" : "REB" , "value" : pctDiff((__team.reb+__player.reb)/(__team.count+1),draftVm.targets.reb)},
			        { "label" : "STL" , "value" : pctDiff((__team.stl+__player.stl)/(__team.count+1),draftVm.targets.stl)},
			        { "label" : "BLK" , "value" : pctDiff((__team.blk+__player.blk)/(__team.count+1),draftVm.targets.blk)},
			        { "label" : "3PT" , "value" : pctDiff((__team.fg3m+__player.fg3m)/(__team.count+1),draftVm.targets.fg3m)},
			        { "label" : "FG%" , "value" : pctDiff((__team.fgm+__player.fgm)/(__team.fga+__player.fga),draftVm.targets.fgp)},
			        { "label" : "FT%" , "value" : pctDiff((__team.ftm+__player.ftm)/(__team.fta+__player.fta),draftVm.targets.ftp)},
			        { "label" : "TO"  , "value" : -1 * pctDiff((__team.tov+__player.tov)/(__team.count+1),draftVm.targets.tov)},
			    ]
			}
				];

			$timeout(function() {
                    window.dispatchEvent(new Event('resize'));
            }, 75);
		}

		function pctDiff(x1,x2){
			if(isNaN(x1)){
				return 0;
			}
			return (x1-x2)/x2;
		}

	}
})();
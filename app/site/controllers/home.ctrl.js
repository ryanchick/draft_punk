(function(){
	angular
		.module('draftApp')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($http, $location, $timeout, $uibModal,playerSrv,demo,demo2,raptors){
		var homeVm = this;

		homeVm.players = demo.data;
		homeVm.players2 = demo2.data;
		homeVm.raptors = raptors.data;
		homeVm.demoTeam = teamTotals(homeVm.raptors)
		// console.log(homeVm.demoTeam)
		homeVm.playerSelect;
		homeVm.addedPlayer = {};
		// homeVm.avg = playerSrv.avgStats[homeVm.playerSelect.position];
		homeVm.targets = {
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
	
		//variables
		if (localStorage.user != undefined){
			var user = JSON.parse(localStorage.user);
			homeVm.username = user.username;
		}

		changePlayer(homeVm.players[0]);
		drawTeamChart({});


		//function bindings
		homeVm.route = route;
		homeVm.get = get;
		homeVm.changePlayer = changePlayer;
		homeVm.drawTeamChart = drawTeamChart;
		homeVm.draftOpen = draftOpen;

		//functions
		function route(path){
			$location.path('/' + path);
		}

		function get(){
			$http.get('api/stats/demo')
				.then(function(res){
					// console.log(res);
					return res.data
				})
		}

		function changePlayer(player){
			homeVm.playerSelect = player;
			homeVm.avg = playerSrv.avgStats[player.position]
			homeVm.options = {
			    chart: {
			        type: 'discreteBarChart',
			        height: 450,
			        margin : {
			            top: 20,
			            right: 20,
			            bottom: 60,
			            left: 55
			        },
			        showControls:false,
			        reduceXTicks:false,
			        x: function(d){ return d.label; },
			        y: function(d){ return d.value; },
			        showValues: true,
			        valueFormat: function(d){
			            return d3.format(',.1f')(d);
			        },
			        transitionDuration: 800,
			        xAxis: {
			            axisLabel: 'Standard Fantasy Categories'
			        },
			        yAxis: {
			            axisLabel: '% Relative to Average ' + homeVm.playerSelect.position,
			            axisLabelDistance: -5
			        }
			    }
			};
			homeVm.data = [{
			    key: homeVm.playerSelect.name,
			    values: [
			        { "label" : "PTS" , "value" : (homeVm.playerSelect.pts-homeVm.avg.pts)/homeVm.avg.pts*100},
			        { "label" : "AST" , "value" : (homeVm.playerSelect.ast-homeVm.avg.ast)/homeVm.avg.ast*100},
			        { "label" : "REB" , "value" : (homeVm.playerSelect.reb-homeVm.avg.reb)/homeVm.avg.reb*100},
			        { "label" : "STL" , "value" : (homeVm.playerSelect.stl-homeVm.avg.stl)/homeVm.avg.stl*100},
			        { "label" : "BLK" , "value" : (homeVm.playerSelect.blk-homeVm.avg.blk)/homeVm.avg.blk*100},
			        { "label" : "3PT" , "value" : (homeVm.playerSelect.fg3m-homeVm.avg.fg3m)/homeVm.avg.fg3m*100},
			        { "label" : "FG%" , "value" : ((homeVm.playerSelect.fga == 0 ? 0 : homeVm.playerSelect.fgm/homeVm.playerSelect.fga) - homeVm.avg.fgp)/homeVm.avg.fgp*100},
			        { "label" : "FT%" , "value" : ((homeVm.playerSelect.fta == 0 ? 0 : homeVm.playerSelect.ftm/homeVm.playerSelect.fta) - homeVm.avg.ftp)/homeVm.avg.ftp*100},
			        { "label" : "TO"  , "value" : (homeVm.avg.tov-homeVm.playerSelect.tov)/homeVm.avg.tov*100}
			    ]
			}];
		}

		function teamTotals(players){
			var __team = {pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgm:0,fga:0,ftm:0,fta:0,tov:0}
			for(var i = 0; i < players.length;i++){
				for(var stat in __team){
					__team[stat] += players[i][stat];
				}
			}
			return __team;

		}

		function drawTeamChart(player){
			
			var __team = homeVm.demoTeam;
			__team.count = 5;
			if(homeVm.addedPlayer == player){
				homeVm.addedPlayer = {};
			}else{
				homeVm.addedPlayer = player;
			}
			
			var __player = homeVm.addedPlayer;
			// console.log('__team');
			// console.log(__team);
			// console.log(homeVm.targets)
			homeVm.teamOptions = {
			    chart: {
			        type: 'multiBarChart',
			        height: 450,
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
			        valueFormat: function(d){
			            return d3.format(',.4%')(d);
			        },
			        forceY:[-0.5,0.5],
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

			if(__player.name){
				homeVm.teamData = [{
				    key: 'Raptors Starters',
				    values: [
				        { "label" : "PTS" , "value" : pctDiff(__team.pts/__team.count,homeVm.targets.pts)},
				        { "label" : "AST" , "value" : pctDiff(__team.ast/__team.count,homeVm.targets.ast)},
				        { "label" : "REB" , "value" : pctDiff(__team.reb/__team.count,homeVm.targets.reb)},
				        { "label" : "STL" , "value" : pctDiff(__team.stl/__team.count,homeVm.targets.stl)},
				        { "label" : "BLK" , "value" : pctDiff(__team.blk/__team.count,homeVm.targets.blk)},
				        { "label" : "3PT" , "value" : pctDiff(__team.fg3m/__team.count,homeVm.targets.fg3m)},
				        { "label" : "FG%" , "value" : pctDiff((__team.fga == 0 ? NaN : __team.fgm/__team.fga),homeVm.targets.fgp)},
				        { "label" : "FT%" , "value" : pctDiff((__team.fta == 0 ? NaN : __team.ftm/__team.fta),homeVm.targets.ftp)},
				        { "label" : "TO"  , "value" : -1 * pctDiff(__team.tov/__team.count,homeVm.targets.tov)}
				    ]}
				,{
				    key: 'w/ ' + __player.name,
				    values: [
				        { "label" : "PTS" , "value" : pctDiff((__team.pts+__player.pts)/(__team.count+1),homeVm.targets.pts)},
				        { "label" : "AST" , "value" : pctDiff((__team.ast+__player.ast)/(__team.count+1),homeVm.targets.ast)},
				        { "label" : "REB" , "value" : pctDiff((__team.reb+__player.reb)/(__team.count+1),homeVm.targets.reb)},
				        { "label" : "STL" , "value" : pctDiff((__team.stl+__player.stl)/(__team.count+1),homeVm.targets.stl)},
				        { "label" : "BLK" , "value" : pctDiff((__team.blk+__player.blk)/(__team.count+1),homeVm.targets.blk)},
				        { "label" : "3PT" , "value" : pctDiff((__team.fg3m+__player.fg3m)/(__team.count+1),homeVm.targets.fg3m)},
				        { "label" : "FG%" , "value" : pctDiff((__team.fgm+__player.fgm)/(__team.fga+__player.fga),homeVm.targets.fgp)},
				        { "label" : "FT%" , "value" : pctDiff((__team.ftm+__player.ftm)/(__team.fta+__player.fta),homeVm.targets.ftp)},
				        { "label" : "TO"  , "value" : -1 * pctDiff((__team.tov+__player.tov)/(__team.count+1),homeVm.targets.tov)},
				    ]
				}];
			}else{
				homeVm.teamData = [{
				    key: 'Raptors Starters',
				    values: [
				        { "label" : "PTS" , "value" : pctDiff(__team.pts/__team.count,homeVm.targets.pts)},
				        { "label" : "AST" , "value" : pctDiff(__team.ast/__team.count,homeVm.targets.ast)},
				        { "label" : "REB" , "value" : pctDiff(__team.reb/__team.count,homeVm.targets.reb)},
				        { "label" : "STL" , "value" : pctDiff(__team.stl/__team.count,homeVm.targets.stl)},
				        { "label" : "BLK" , "value" : pctDiff(__team.blk/__team.count,homeVm.targets.blk)},
				        { "label" : "3PT" , "value" : pctDiff(__team.fg3m/__team.count,homeVm.targets.fg3m)},
				        { "label" : "FG%" , "value" : pctDiff((__team.fga == 0 ? NaN : __team.fgm/__team.fga),homeVm.targets.fgp)},
				        { "label" : "FT%" , "value" : pctDiff((__team.fta == 0 ? NaN : __team.ftm/__team.fta),homeVm.targets.ftp)},
				        { "label" : "TO"  , "value" : -1 * pctDiff(__team.tov/__team.count,homeVm.targets.tov)}
				    ]
				}];
			}

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

		function draftOpen() {
			console.log('draft start')
		    var modalInstance = $uibModal.open({
		      	animation: true,
		      	templateUrl: 'site/partials/draftModal.html',
		      	controller: 'DraftModalCtrl as ctrl',
		      	size: "",
		    });

		    modalInstance.result.then(function (selectedItem) {
		    	// $scope.selected = selectedItem;
		    }, function () {
		    	console.log('Modal dismissed at: ' + new Date());
		    });
		};

	}
	
})();
(function(){
	angular
		.module('draftApp')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($http, $location, playerSrv,demo){
		var homeVm = this;

		homeVm.players = demo.data;
		homeVm.playerSelect;
		changePlayer(homeVm.players[0]);
		homeVm.avg = playerSrv.avgStats[homeVm.playerSelect.position]
		console.log(demo)
	
		//variables
		if (localStorage.user != undefined){
			var user = JSON.parse(localStorage.user);
			homeVm.userername = user.username;
		}

		//function bindings
		homeVm.route = route;
		homeVm.get = get;
		homeVm.changePlayer = changePlayer;

		//functions
		function route(path){
			$location.path('/' + path);
		}

		function get(){
			$http.get('api/stats/demo')
				.then(function(res){
					console.log(res);
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

		// homeVm.options = {
		//     chart: {
		//         type: 'discreteBarChart',
		//         height: 450,
		//         margin : {
		//             top: 20,
		//             right: 20,
		//             bottom: 60,
		//             left: 55
		//         },
		//         showControls:false,
		//         reduceXTicks:false,
		//         x: function(d){ return d.label; },
		//         y: function(d){ return d.value; },
		//         showValues: true,
		//         valueFormat: function(d){
		//             return d3.format(',.1f')(d);
		//         },
		//         transitionDuration: 800,
		//         xAxis: {
		//             axisLabel: 'Standard Fantasy Categories'
		//         },
		//         yAxis: {
		//             axisLabel: '% Relative to Average ' + homeVm.playerSelect.position,
		//             axisLabelDistance: -5
		//         }
		//     }
		// };

		// homeVm.data = [{
		//     key: homeVm.playerSelect.name,
		//     values: [
		//         { "label" : "PTS" , "value" : (homeVm.playerSelect.pts-homeVm.avg.pts)/homeVm.avg.pts*100},
		//         { "label" : "AST" , "value" : (homeVm.playerSelect.ast-homeVm.avg.ast)/homeVm.avg.ast*100},
		//         { "label" : "REB" , "value" : (homeVm.playerSelect.reb-homeVm.avg.reb)/homeVm.avg.reb*100},
		//         { "label" : "STL" , "value" : (homeVm.playerSelect.stl-homeVm.avg.stl)/homeVm.avg.stl*100},
		//         { "label" : "BLK" , "value" : (homeVm.playerSelect.blk-homeVm.avg.blk)/homeVm.avg.blk*100},
		//         { "label" : "3PT" , "value" : (homeVm.playerSelect.fg3m-homeVm.avg.fg3m)/homeVm.avg.fg3m*100},
		//         { "label" : "FG%" , "value" : ((homeVm.playerSelect.fga == 0 ? 0 : homeVm.playerSelect.fgm/homeVm.playerSelect.fga) - homeVm.avg.fgp)/homeVm.avg.fgp*100},
		//         { "label" : "FT%" , "value" : ((homeVm.playerSelect.fta == 0 ? 0 : homeVm.playerSelect.ftm/homeVm.playerSelect.fta) - homeVm.avg.ftp)/homeVm.avg.ftp*100},
		//         { "label" : "TO"  , "value" : (homeVm.avg.tov-homeVm.playerSelect.tov)/homeVm.avg.tov*100}
		//     ]
		// }];

	}


})();
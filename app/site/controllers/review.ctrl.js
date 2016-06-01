(function(){
	angular
		.module('draftApp')
		.controller('ReviewCtrl',ReviewCtrl)

	function ReviewCtrl ($http,$routeParams,$location, playerSrv, league){
		var revVm = this;
		// console.log('review')
		
		// revVm.playerStats = stats.data;
		revVm.league=league.data;

		revVm.team = revVm.league.teams[revVm.league.userPosition - 1]
		console.log(revVm.league)
		// console.log
		
		revVm.targets = {
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
		revVm.teamPcts = {
			Points: pctDiff(revVm.team.stats.pts/revVm.team.stats.count,revVm.targets.pts),
			'Assists': pctDiff(revVm.team.stats.ast/revVm.team.stats.count,revVm.targets.ast),
			'Rebounds': pctDiff(revVm.team.stats.reb/revVm.team.stats.count,revVm.targets.reb),
			'Steals': pctDiff(revVm.team.stats.stl/revVm.team.stats.count,revVm.targets.stl),
			'Blocks': pctDiff(revVm.team.stats.blk/revVm.team.stats.count,revVm.targets.blk),
			'Threes Made' : pctDiff(revVm.team.stats.fg3m/revVm.team.stats.count,revVm.targets.fg3m),
			'Field Goal %' : pctDiff((revVm.team.stats.fga == 0 ? NaN : revVm.team.stats.fgm/revVm.team.stats.fga),revVm.targets.fgp),
			'Free Throw %' : pctDiff((revVm.team.stats.fta == 0 ? NaN : revVm.team.stats.ftm/revVm.team.stats.fta),revVm.targets.ftp),
			'Turnovers' : -1 * pctDiff(revVm.team.stats.tov/revVm.team.stats.count,revVm.targets.tov)
		}

		drawTeamChart();
		sortStats(revVm.teamPcts)

		//public methods
		revVm.colourScale = colourScale;

		function drawTeamChart(){
			var __team = revVm.team.stats;
			// var __player = revVm.playerSelect
			console.log('__team');
			console.log(__team);
			revVm.teamOptions = {
			    chart: {
			        type: 'discreteBarChart',
			        height: 230,
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

			revVm.teamData = [{
			    key: __team.teamName,
			    values: [
			        { "label" : "PTS" , "value" : pctDiff(__team.pts/__team.count,revVm.targets.pts)},
			        { "label" : "AST" , "value" : pctDiff(__team.ast/__team.count,revVm.targets.ast)},
			        { "label" : "REB" , "value" : pctDiff(__team.reb/__team.count,revVm.targets.reb)},
			        { "label" : "STL" , "value" : pctDiff(__team.stl/__team.count,revVm.targets.stl)},
			        { "label" : "BLK" , "value" : pctDiff(__team.blk/__team.count,revVm.targets.blk)},
			        { "label" : "3PT" , "value" : pctDiff(__team.fg3m/__team.count,revVm.targets.fg3m)},
			        { "label" : "FG%" , "value" : pctDiff((__team.fga == 0 ? NaN : __team.fgm/__team.fga),revVm.targets.fgp)},
			        { "label" : "FT%" , "value" : pctDiff((__team.fta == 0 ? NaN : __team.ftm/__team.fta),revVm.targets.ftp)},
			        { "label" : "TO"  , "value" : -1 * pctDiff(__team.tov/__team.count,revVm.targets.tov)}
			    ]}
			// ,{
			//     key: 'w/ Added Player',
			//     values: [
			//         { "label" : "PTS" , "value" : pctDiff((__team.pts+__player.pts)/(__team.count+1),revVm.targets.pts)},
			//         { "label" : "AST" , "value" : pctDiff((__team.ast+__player.ast)/(__team.count+1),revVm.targets.ast)},
			//         { "label" : "REB" , "value" : pctDiff((__team.reb+__player.reb)/(__team.count+1),revVm.targets.reb)},
			//         { "label" : "STL" , "value" : pctDiff((__team.stl+__player.stl)/(__team.count+1),revVm.targets.stl)},
			//         { "label" : "BLK" , "value" : pctDiff((__team.blk+__player.blk)/(__team.count+1),revVm.targets.blk)},
			//         { "label" : "3PT" , "value" : pctDiff((__team.fg3m+__player.fg3m)/(__team.count+1),revVm.targets.fg3m)},
			//         { "label" : "FG%" , "value" : pctDiff((__team.fgm+__player.fgm)/(__team.fga+__player.fga),revVm.targets.fgp)},
			//         { "label" : "FT%" , "value" : pctDiff((__team.ftm+__player.ftm)/(__team.fta+__player.fta),revVm.targets.ftp)},
			//         { "label" : "TO"  , "value" : -1 * pctDiff((__team.tov+__player.tov)/(__team.count+1),revVm.targets.tov)},
			//     ]
			// }
				];

			// $timeout(function() {
   //                  window.dispatchEvent(new Event('resize'));
   //          }, 75);
		}

		function sortStats(stats){
			var arr = [];
			for(var stat in stats){
				arr.push({stat:stat,value:stats[stat]})
			}
			arr.sort(function(a,b){
				return a.value > b.value
			})
			console.log(arr)
			revVm.strength = [arr[8],arr[7],arr[6]];
			revVm.weakness = [arr[0],arr[1],arr[2]]

		}

		function pctDiff(x1,x2){
			if(isNaN(x1)){
				return 0;
			}
			return (x1-x2)/x2;
		}

		function colourScale(value, goal)
		{
			var style = {}
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


	}
})();
(function(){
	angular
		.module('draftApp')
		.controller('PlayerCtrl', PlayerCtrl);

	function PlayerCtrl (player, playerSrv){
		playerVm = this;

		playerVm.player = player;
		playerVm.avg = playerSrv.avgStats[playerVm.player.position];

		console.log(playerVm.avg);

		playerVm.options = {
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
		        transitionDuration: 500,
		        xAxis: {
		            axisLabel: 'Standard Fantasy Categories'
		        },
		        yAxis: {
		            axisLabel: '% Relative to Average ' + player.position,
		            axisLabelDistance: -5
		        }
		    }
		};

		playerVm.data = [{
		    key: playerVm.player.name,
		    values: [
		        { "label" : "PTS" , "value" : (playerVm.player.pts-playerVm.avg.pts)/playerVm.avg.pts*100},
		        { "label" : "AST" , "value" : (playerVm.player.ast-playerVm.avg.ast)/playerVm.avg.ast*100},
		        { "label" : "REB" , "value" : (playerVm.player.reb-playerVm.avg.reb)/playerVm.avg.reb*100},
		        { "label" : "STL" , "value" : (playerVm.player.stl-playerVm.avg.stl)/playerVm.avg.stl*100},
		        { "label" : "BLK" , "value" : (playerVm.player.blk-playerVm.avg.blk)/playerVm.avg.blk*100},
		        { "label" : "3PT" , "value" : (playerVm.player.fg3m-playerVm.avg.fg3m)/playerVm.avg.fg3m*100},
		        { "label" : "FG%" , "value" : ((playerVm.player.fga == 0 ? 0 : playerVm.player.fgm/playerVm.player.fga) - playerVm.avg.fgp)/playerVm.avg.fgp*100},
		        { "label" : "FT%" , "value" : ((playerVm.player.fta == 0 ? 0 : playerVm.player.ftm/playerVm.player.fta) - playerVm.avg.ftp)/playerVm.avg.ftp*100},
		        { "label" : "TO"  , "value" : (playerVm.avg.tov-playerVm.player.tov)/playerVm.avg.tov*100}
		    ]
		}];

		

	}
	
})();
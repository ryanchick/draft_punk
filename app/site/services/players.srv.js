(function(){
	angular
		.module('draftApp')
		.service('playerSrv', PlayerService);

	function PlayerService($http){
		var self = this;

		//variables

		//function bindings
		self.getStats = getStats;

		//functions
		function getStats(){
				return $http.get('/api/stats')
					.then (function(res){
						self.stats = res.data;
						getAvg(self.stats);
						return self.stats
				})
						 
		}

		function getAvg (stats){

			var totalStats = {PG:{ count: 0, totals:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}, avg: {pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							  SG:{ count: 0, totals:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}, avg: {pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							  SF:{ count: 0, totals:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}, avg: {pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							  PF:{ count: 0, totals:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}, avg: {pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							  C:{ count: 0, totals:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}, avg: {pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}}
							 };

			var count = 0;
			for (var i = 0; i < stats.length; i++){
				if (stats[i].min > 20 && stats[i].games_played > 20){
					var pos = stats[i].position;
					totalStats[pos].count ++;
					totalStats[pos].totals.pts += stats[i].pts;
					totalStats[pos].totals.ast += stats[i].ast;
					totalStats[pos].totals.reb += stats[i].reb;
					totalStats[pos].totals.stl += stats[i].stl;
					totalStats[pos].totals.blk += stats[i].blk;
					totalStats[pos].totals.fg3m += stats[i].fg3m;
					totalStats[pos].totals.fgp += stats[i].fga == 0 ? 0 : stats[i].fgm/stats[i].fga;
					totalStats[pos].totals.ftp += stats[i].fta == 0 ? 0 : stats[i].ftm/stats[i].fta;
					totalStats[pos].totals.tov += stats[i].tov;
				}
			}
			for (var i in totalStats){
				totalStats[i].avg.pts = totalStats[i].totals.pts/totalStats[i].count;
				totalStats[i].avg.ast = totalStats[i].totals.ast/totalStats[i].count;
				totalStats[i].avg.reb = totalStats[i].totals.reb/totalStats[i].count;
				totalStats[i].avg.stl = totalStats[i].totals.stl/totalStats[i].count;
				totalStats[i].avg.blk = totalStats[i].totals.blk/totalStats[i].count;
				totalStats[i].avg.fg3m = totalStats[i].totals.fg3m/totalStats[i].count;
				totalStats[i].avg.fgp = totalStats[i].totals.fgp/totalStats[i].count;
				totalStats[i].avg.ftp = totalStats[i].totals.ftp/totalStats[i].count;
				totalStats[i].avg.tov = totalStats[i].totals.tov/totalStats[i].count;
			}

			self.avgStats = {
				PG: totalStats.PG.avg,
				SG: totalStats.SG.avg,
				SF: totalStats.SF.avg,
				PF: totalStats.PF.avg,
				C: totalStats.C.avg
			}

			//console.log(self.avgStats);
		}
	}

})();
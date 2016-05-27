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

			var totalStats = {PG:{ count: 0, totals:{min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}, avg: {min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}},
							  SG:{ count: 0, totals:{min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}, avg: {min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}},
							  SF:{ count: 0, totals:{min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}, avg: {min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}},
							  PF:{ count: 0, totals:{min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}, avg: {min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}},
							  C:{ count: 0, totals:{min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}, avg: {min:0, pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fg3a:0,fg3p:0,fgm:0,fga:0,fgp:0,ftm:0,fta:0,ftp:0,tov:0}},
							 };

			var count = 0;
			for (var i = 0; i < stats.length; i++){
				if (stats[i].min > 20 && stats[i].games_played > 20){
					var pos = stats[i].position;
					totalStats[pos].count ++;
					totalStats[pos].totals.min += stats[i].min;
					totalStats[pos].totals.pts += stats[i].pts;
					totalStats[pos].totals.ast += stats[i].ast;
					totalStats[pos].totals.reb += stats[i].reb;
					totalStats[pos].totals.stl += stats[i].stl;
					totalStats[pos].totals.blk += stats[i].blk;
					totalStats[pos].totals.fg3m += stats[i].fg3m;
					totalStats[pos].totals.fg3a += stats[i].fg3a;
					totalStats[pos].totals.fg3p += stats[i].fg3a == 0 ? 0 : stats[i].fg3m/stats[i].fg3a;
					totalStats[pos].totals.fgm += stats[i].fgm;
					totalStats[pos].totals.fga += stats[i].fga;
					totalStats[pos].totals.fgp += stats[i].fga == 0 ? 0 : stats[i].fgm/stats[i].fga;
					totalStats[pos].totals.ftm += stats[i].ftm;
					totalStats[pos].totals.fta += stats[i].fta;
					totalStats[pos].totals.ftp += stats[i].fta == 0 ? 0 : stats[i].ftm/stats[i].fta;
					totalStats[pos].totals.tov += stats[i].tov;
				}
			}
			for (var i in totalStats){
				totalStats[i].avg.min = totalStats[i].totals.min/totalStats[i].count;
				totalStats[i].avg.pts = totalStats[i].totals.pts/totalStats[i].count;
				totalStats[i].avg.ast = totalStats[i].totals.ast/totalStats[i].count;
				totalStats[i].avg.reb = totalStats[i].totals.reb/totalStats[i].count;
				totalStats[i].avg.stl = totalStats[i].totals.stl/totalStats[i].count;
				totalStats[i].avg.blk = totalStats[i].totals.blk/totalStats[i].count;
				totalStats[i].avg.fg3m = totalStats[i].totals.fg3m/totalStats[i].count;
				totalStats[i].avg.fg3a = totalStats[i].totals.fg3a/totalStats[i].count;
				totalStats[i].avg.fg3p = totalStats[i].totals.fg3p/totalStats[i].count;
				totalStats[i].avg.fgm = totalStats[i].totals.fgm/totalStats[i].count;
				totalStats[i].avg.fga = totalStats[i].totals.fga/totalStats[i].count;
				totalStats[i].avg.fgp = totalStats[i].totals.fgp/totalStats[i].count;
				totalStats[i].avg.ftm = totalStats[i].totals.ftm/totalStats[i].count;
				totalStats[i].avg.fta = totalStats[i].totals.fta/totalStats[i].count;
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
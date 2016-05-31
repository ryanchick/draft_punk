(function(){
	angular
		.module('draftApp')
		.service('playerSrv', PlayerService);

	function PlayerService($http){
		var self = this;

		getStats();

		//variables
		self.stdDev;

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

			var stdDev = {
							PG:{dev:{pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0},stats:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							SG:{dev:{pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0},stats:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							SF:{dev:{pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0},stats:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							PF:{dev:{pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0},stats:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}},
							C:{dev:{pts:0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0},stats:{pts: 0,ast:0,reb:0,stl:0,blk:0,fg3m:0,fgp:0,ftp:0,tov:0}}
						};

			// var count = 0;
			for (var i = 0; i < stats.length; i++){
				if (stats[i].min > 20 && stats[i].games_played > 20){
					var pos = stats[i].position;
					totalStats[pos].count++;

					for(var stat in totalStats[pos].totals){
						if(stat == 'fg3p'){
							totalStats[pos].totals.fg3p += stats[i].fg3p = (stats[i].fg3a == 0 ? 0 : stats[i].fg3m/stats[i].fg3a);
						} else if(stat == 'fgp'){
							totalStats[pos].totals.fgp += stats[i].fgp = (stats[i].fga == 0 ? 0 : stats[i].fgm/stats[i].fga);
						} else if(stat == 'ftp'){
							totalStats[pos].totals.ftp += stats[i].ftp = (stats[i].fta == 0 ? 0 : stats[i].ftm/stats[i].fta);
						} else {
							totalStats[pos].totals[stat] += stats[i][stat];
						}
					}
					
					for(var stat in stdDev[pos].stats){
						if(stat == 'pts'||stat == 'ast'||stat == 'reb'||stat == 'stl'||stat == 'blk'||stat == 'fg3m'||stat == 'fgp'||stat == 'ftp'||stat == 'tov'){
							if(totalStats[pos].count == 1){
								stdDev[pos].stats[stat+'2'] = 0;
								stdDev[pos].stats[stat+'K'] = stats[i][stat];
							}
							stdDev[pos].stats[stat] += stats[i][stat] - stdDev[pos].stats[stat+'K'];
							stdDev[pos].stats[stat + '2'] += (stats[i][stat] - stdDev[pos].stats[stat+'K']) * (stats[i][stat] - stdDev[pos].stats[stat+'K']);
							// stdDev[pos].stats[stat] += stats[i][stat];
							// stdDev[pos].stats[stat + '2'] += (stats[i][stat]) * (stats[i][stat]);
						}
						// console.log(stdDev[pos].stats)
					}

				}
			}
			// console.log(stdDev['SG'].stats)
			// console.log(totalStats['SG'].totals.pts)

			for (var i in totalStats){
				for(var stat in totalStats[i].totals){
					totalStats[i].avg[stat] = totalStats[i].totals[stat]/totalStats[i].count;
				}
			}
			for (var pos in stdDev){
				for(var stat in stdDev[pos].dev){
					// console.log(stat)
					stdDev[pos].dev[stat] = Math.sqrt((stdDev[pos].stats[stat+'2'] - (stdDev[pos].stats[stat] * stdDev[pos].stats[stat])/totalStats[pos].count)/totalStats[pos].count)
				}
			}
			// console.log(totalStats['SG'].avg)
			// console.log(stdDev['SG'].dev)

			/*standard deviation algorithm
			if len(data) == 0:
			  return 0
			K = data[0]
			n = 0
			sum_ = 0
			sum_sqr = 0
			for x in data:
			  n = n + 1
			  sum_ += x - K
			  sum_sqr += (x - K) * (x - K)
			variance = (sum_sqr - (sum_ * sum_)/n)/(n - 1)
			*/

			self.stdDev = stdDev;

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
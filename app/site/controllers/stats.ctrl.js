(function(){
	angular
		.module('draftApp')
		.controller('StatsCtrl', StatsCtrl);

		function StatsCtrl($location, stats){
			statsVm = this;
			statsVm.stats = stats;

			statsVm.sort = '-pts';
			statsVm.headers = [
				{label:'',sort:'name'},
				{label:'Name',sort:'name'},
				{label:'Position',sort:'position'},
				{label:'Minutes',sort:'min'},
				{label:'Points',sort:'pts'},
				{label:'Assists',sort:'ast'},
				{label:'Rebounds',sort:'reb'},
				{label:'Steals',sort:'stl'},
				{label:'Blocks',sort:'blk'},
				{label:'3 Pointers', sort:'fg3m'},
				{label:'Field Goal %',sort:'fgp'},
				{label:'Free Throw %',sort:'ftp'},
				{label:'Turnovers',sort:'tov'}
			];

			//function bindings
			statsVm.sortChange = sortChange;
			statsVm.playerProfile = playerProfile;


			// function getAvg (stats){
			// 	var totalStats = [{pts:0},{ast:0},{reb:0},{stl:0},{blk:0},{fg3m:0},{fgp:0},{ftp:0},{tov:0}];
			// 	for (var i = 0; i < stats.length; i++){
			// 		if (stats[i].min > 10 && stats[i].games_played > 20){
			// 			totalStats.pts += stats[i].pts;
			// 			totalStats.ast += stats[i].ast;
			// 			totalStats.reb += stats[i].reb;
			// 			totalStats.stl += stats[i].stl;
			// 			totalStats.blk += stats[i].blk;
			// 			totalStats.fg3m += stats[i].fg3m;
			// 			totalStats.fgp += stats[i].fga == 0 ? 0 : stats[i].fgm/stats[i].fga;
			// 			totalStats.ftp += stats[i].fta == 0 ? 0 : stats[i].ftm/stats[i].fta;
			// 			totalStats.tov += stats[i].tov;
			// 		}
			// 	}
			// 	var avgStats = [
			// 		{pts:totalStats.pts/totalStats.length},
			// 		{pts:totalStats.ast/totalStats.length},
			// 		{pts:totalStats.reb/totalStats.length},
			// 		{pts:totalStats.stl/totalStats.length},
			// 		{pts:totalStats.blk/totalStats.length},
			// 		{pts:totalStats.fg3m/totalStats.length},
			// 		{pts:totalStats.fgp/totalStats.length},
			// 		{pts:totalStats.ftp/totalStats.length},
			// 		{pts:totalStats.tov/totalStats.length}

			// 	];

			// 	return avgStats;
			// }
			
			//functions
			function sortChange(sortType){
				if(statsVm.sort.match(sortType)){
					if(statsVm.sort.charAt(0) == '-'){
						statsVm.sort = sortType;
					} else {
						statsVm.sort = '-' + sortType;
					}
				} else {
					statsVm.sort = '-' + sortType;
				}

			}

			function playerProfile(id){
				$location.path('/player/'+id);
			}



		}

})();
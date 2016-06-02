(function(){
	angular
		.module('draftApp')
		.controller('StatsCtrl', StatsCtrl);

		function StatsCtrl($location, stats){
			statsVm = this;
			statsVm.stats = stats;

			statsVm.sort = '-pts';
			statsVm.search = '';
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
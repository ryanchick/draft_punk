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
						return self.stats
				})
						 
		}
	}

})();
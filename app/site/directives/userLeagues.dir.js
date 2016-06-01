(function(){
	angular
		.module('draftApp')
		.directive('userLeagues', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userLeagues.html',
				controller: 'userLeaguesCtrl as ctrl',
				scope: {}
			};
		});

	angular 
		.module('draftApp')
		.controller('userLeaguesCtrl', userLeaguesCtrl);

	function userLeaguesCtrl(){
		leagueVm = this;

		leagueVm.test = "LEAGUES";
	}
})();
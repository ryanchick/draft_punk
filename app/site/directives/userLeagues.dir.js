(function(){
	angular
		.module('draftApp')
		.directive('userLeagues', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userLeagues.html',
				controller: 'userLeaguesCtrl as ctrl',
				scope: {
					user: "@"
				}

			};
		});

	angular 
		.module('draftApp')
		.controller('userLeaguesCtrl', userLeaguesCtrl);

	function userLeaguesCtrl($scope){
		leagueVm = this;

		leagueVm.test = "LEAGUES";
		console.log($scope.user);
		leagueVm.user = JSON.parse($scope.user);
		console.log(leagueVm.user);
	}
})();
(function(){
	angular
		.module('draftApp')
		.directive('userLeagues', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userLeagues.html',
				controller: 'userLeaguesCtrl as ctrl',
				scope: {
					user:'@'
				}
			};
		});

	angular 
		.module('draftApp')
		.controller('userLeaguesCtrl', userLeaguesCtrl);

	function userLeaguesCtrl($scope){
		leagueVm = this;
		console.log($scope.user)
		leagueVm.test = "LEAGUES";
		leagueVm.user = JSON.parse($scope.user)
	}
})();
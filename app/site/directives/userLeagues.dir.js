(function(){
	angular
		.module('draftApp')
		.directive('userLeagues', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userLeagues.html',
				controller: 'userLeaguesCtrl as ctrl',
				scope: {
					user: "@",
					leagues: "@"
				}
			};
		});

	angular 
		.module('draftApp')
		.controller('userLeaguesCtrl', userLeaguesCtrl);

	function userLeaguesCtrl($scope, $http, $location){
		leagueVm = this;
		//console.log($scope.user)
		leagueVm.test = "LEAGUES";
		leagueVm.user = JSON.parse($scope.user);
		leagueVm.leagues = JSON.parse($scope.leagues);
		leagueVm.editting = [];

		leagueVm.draftStatus = draftStatus;
		leagueVm.route = route;

		function draftStatus(id){
			for (var i = 0; i < leagueVm.leagues.length; i++){
				if (leagueVm.leagues[i].id == id){
					if (leagueVm.leagues[i].draftedPlayers.length == 0){
						return 1;
					} else if (leagueVm.leagues[i].draftedPlayers.length == leagueVm.leagues[i].teams.length * 13){
						return 3;
					} else if (leagueVm.leagues[i].draftedPlayers.length > 0){
						return 2;
					}	
				}
			}
		}

		function route(url){
			$location.path(url);
		}


	}
})();
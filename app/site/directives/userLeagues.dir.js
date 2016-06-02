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

	function userLeaguesCtrl($scope){
		leagueVm = this;
		console.log($scope.user)
		leagueVm.test = "LEAGUES";
		leagueVm.user = JSON.parse($scope.user);
		leagueVm.leagues = JSON.parse($scope.leagues);
		leagueVm.editting = [];

		leagueVm.editToggle = editToggle;
		leagueVm.editLeague = editLeague;

		function editToggle(id){
			var i = leagueVm.editting.indexOf(id);
			if (i == -1){
				leagueVm.editting.push(id);
			} else {
				console.log("splice");
				leagueVm.editting.splice(i,1);
			}
			console.log(leagueVm.editting);

		}

		function editLeague(id){
			if (leagueVm.editting.indexOf(id) == -1){
				return false
			} else {
				return true;
			}

		}
	}
})();
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

	function userLeaguesCtrl($scope, $http, $location, $uibModal){
		leagueVm = this;
		//console.log($scope.user)
		leagueVm.test = "LEAGUES";
		leagueVm.user = JSON.parse($scope.user);
		leagueVm.leagues = JSON.parse($scope.leagues);
		leagueVm.editting = [];

		leagueVm.draftStatus = draftStatus;
		leagueVm.route = route;
		leagueVm.draftOpen = draftOpen;

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

		function draftOpen(size) {
		    var modalInstance = $uibModal.open({
		      	animation: true,
		      	templateUrl: 'site/partials/draftModal.html',
		      	controller: 'DraftModalCtrl as ctrl',
		      	size: "",
		    });

		    modalInstance.result.then(function (selectedItem) {
		    	// $scope.selected = selectedItem;
		    }, function () {
		    	console.log('Modal dismissed at: ' + new Date());
		    });
		};


	}
})();
(function(){
	angular.module('draftApp')
		.controller('DraftModalCtrl', DraftModalCtrl)

		function DraftModalCtrl($location, $http,$uibModalInstance) {
			var draftmVm = this;
			draftmVm.user = {
				id:-1,
			};
			if(localStorage.draftUser){
				draftmVm.user = JSON.parse(localStorage.draftUser);
				draftmVm.logged = true;
			} 
			// var current = $location.path();
			// 	// console.log(current);
			// 	// console.log(path)
			// if(current.match('user')){
			// 	draftmVm.logged == true;
			// }
			draftmVm.route = route;
			draftmVm.createLeague = createLeague;
			draftmVm.cancel = cancel;

			function route(path){
				console.log(draftmVm.user.id)
				if(path == 'user'){
					path = path + '/' + draftmVm.user.username;
				}
				console.log(path)
				$location.path('/' + path);

			}

			function createLeague(isValid, save){
				console.log("creating")
				if(isValid == false){
					alert('Invalid')
					return;
				}
				var leagueInfo = {
						leagueName: draftmVm.leagueName,
						userId: draftmVm.user.id,
						leagueSize: draftmVm.leagueSize,
						userPosition: draftmVm.userPosition
				};
				leagueInfo = JSON.stringify(leagueInfo);
				// console.log(leagueInfo);
				$http.post('/api/league/newLeague', leagueInfo)
					.then(function(res){
						console.log("created league")
						// console.log(res.data);
						if(save == false){
							console.log('going to draft')
							$location.path('/draft/'+res.data.id);
							$uibModalInstance.close();
						} else {
							//close modal
							$uibModalInstance.close();
						}

					})
			}
			function cancel(){
			    $uibModalInstance.dismiss('cancel');
			}
	
		}
})();
	

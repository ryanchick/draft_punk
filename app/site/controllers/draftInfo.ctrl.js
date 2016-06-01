(function(){
	angular
		.module('draftApp')
		.controller('DraftInfoCtrl', DraftInfoCtrl)

	function DraftInfoCtrl($http, $location){
		var draftInfoVm = this;

		//variables
		draftInfoVm.user = {
			id:-1,
		};
		if(localStorage.draftUser){
			draftInfoVm.user = JSON.parse(localStorage.draftUser);
		} 

		draftInfoVm.createLeague = createLeague;

		function createLeague(){
			console.log("creating")
			var leagueInfo = {
					leagueName: draftInfoVm.leagueName,
					userId: draftInfoVm.user.id,
					leagueSize: draftInfoVm.leagueSize,
					userPosition: draftInfoVm.userPosition
			};
			leagueInfo = JSON.stringify(leagueInfo);
			console.log(leagueInfo);
			$http.post('/api/league/newLeague', leagueInfo)
				.then(function(res){
					console.log("created league")
					console.log(res.data);
					$location.path('/draft/'+res.data.id);
				})
		}
	}
})();
(function(){
	angular
		.module('draftApp')
		.controller('ReviewCtrl',ReviewCtrl)

	function ReviewCtrl ($http,$routeParams,$location, playerSrv, league){
		var revVm = this;
		// console.log('review')
		
		// revVm.playerStats = stats.data;
		revVm.league=league.data;
		console.log(revVm.league)


	}
})();
(function(){
	angular
		.module('draftApp')
		.controller('PlayerCtrl', PlayerCtrl);

	function PlayerCtrl ($scope, player, playerSrv){
		playerVm = this;

		playerVm.player = player;
		// console.log(playerVm.player);

		// playerVm.labels = [
		// 					'Points', 
		// 					'Assists', 
		// 					'Rebounds', 
		// 					'Steals', 
		// 					'Blocks', 
		// 					'Turnovers', 
		// 					'Threes',
		// 					'FG%',
		// 					'FT%'
		// 				   ];
  // 		playerVm.series = [''];

  // 		playerVm.data = [
		//   [
		// 	   playerVm.player.pts, 
		// 	   playerVm.player.ast, 
		// 	   playerVm.player.reb, 
		// 	   playerVm.player.stl, 
		// 	   playerVm.player.blk,
		// 	   playerVm.player.tov, 
		// 	   playerVm.player.fg3m,
		// 	   playerVm.player.fga == 0 ? 0 : playerVm.player.fgm/playerVm.player.fga,
		// 	   playerVm.player.fta == 0 ? 0 : playerVm.player.ftm/playerVm.player.fta
		//   ]
		// ];
		$scope.labels = ['1','2','3','4'];
	    $scope.data = [
	      [1,2,-3,4]
	    ];

		playerVm.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // playerVm.series = ['Series A', 'Series B'];
		playerVm.data = [
			[65, 59, 80, 81, 56, 55, 40]
		];
  
	}
	
})();
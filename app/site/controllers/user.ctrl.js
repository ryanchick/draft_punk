(function(){
	angular
		.module('draftApp')
		.controller('UserCtrl', UserCtrl);

	function UserCtrl(){
		userVm = this;

		//variables
		userVm.user = JSON.parse(localStorage.draftUser);
		
		//function bindings
		userVm.changeDir = changeDir;

		//functions
		function changeDir(n){
			if (n == 1){
				userVm.showLeagues = false;
				userVm.showProfile = true;
			} else if (n == 2){
				userVm.showProfile = false;
				userVm.showLeagues = true;
			}
		}



	}
	
})();
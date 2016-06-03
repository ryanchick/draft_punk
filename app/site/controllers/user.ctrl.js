(function(){
	angular
		.module('draftApp')
		.controller('UserCtrl', UserCtrl);

	function UserCtrl(user){
		console.log(user);
		userVm = this;

		//variables
		//userVm.user = JSON.parse(localStorage.draftUser);
		if (user.user){
			userVm.user = user.user;
			userVm.leagues = user.leagues;
		} else {
			userVm.user = user;
			// userVm.leagues = [];
		}
		
		userVm.showLeagues = true;

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
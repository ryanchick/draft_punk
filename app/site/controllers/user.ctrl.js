(function(){
	angular
		.module('draftApp')
		.controller('UserCtrl', UserCtrl);

	function UserCtrl(){
		userVm = this;

		userVm.user = JSON.parse(localStorage.draftUser);
		console.log(userVm.user);
	}
	
})();
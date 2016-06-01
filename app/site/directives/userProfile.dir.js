(function(){
	angular
		.module('draftApp')
		.directive('userProfile', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userProfile.html',
				controller: 'userProfileCtrl as ctrl',
				scope: {}
			};
		});

	angular 
		.module('draftApp')
		.controller('userProfileCtrl', userProfileCtrl);

	function userProfileCtrl(){
		profileVm = this;

		profileVm.test = "PROFILE";
	}
})();
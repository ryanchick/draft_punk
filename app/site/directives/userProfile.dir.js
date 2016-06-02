(function(){
	angular
		.module('draftApp')
		.directive('userProfile', function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/userProfile.html',
				controller: 'userProfileCtrl as ctrl',
				scope: {
					user: "@"
				}
			};
		});

	angular 
		.module('draftApp')
		.controller('userProfileCtrl', userProfileCtrl);

	function userProfileCtrl($scope){
		profileVm = this;

		profileVm.test = "PROFILE";
		profileVm.user = JSON.parse($scope.user)
		
		profileVm.changeEdit = changeEdit;

		function changeEdit(){
			profileVm.editting = !profileVm.editting;
		}
	}
})();
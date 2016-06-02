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

	function userProfileCtrl($scope, $http){
		profileVm = this;

		profileVm.test = "PROFILE";
		profileVm.user = JSON.parse($scope.user)
		
		profileVm.changeEdit = changeEdit;
		profileVm.confirm = confirm;

		function changeEdit(){
			profileVm.editting = !profileVm.editting;
		}

		function confirm(){
			console.log(profileVm.user);
			$http.put('/api/users/'+profileVm.user.id, profileVm.user);

		}
	}
})();
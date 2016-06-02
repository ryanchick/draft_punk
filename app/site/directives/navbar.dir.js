(function(){
	angular
		.module('draftApp')
		.directive('draftNavbar',function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/draftNavbar.html',
				controller: 'NavbarCtrl as ctrl',
				scope:{}
			};
		});

	angular
		.module('draftApp')	
		.controller ('NavbarCtrl', NavBarCtrl);

		function NavBarCtrl($location,$route){
			navbarVm = this;

			//variables
			navbarVm.username = '';

			//function bindings
			navbarVm.route 	  = route;
			navbarVm.loggedIn = loggedIn;
			navbarVm.logOut   = logOut;
			navbarVm.isActive = isActive;

			//functions
			function route(path){
				$location.path('/' + path);

			}

			function loggedIn(){
				if (localStorage.draftAuthToken != undefined){
					return true;
				} else {
					return false;
				}
	
			}

			function isActive(path){
				var current = $location.path()
				// console.log(current);
				// console.log(path)
				if(current.match(path)){
					return true;
				}
				return false;
			}

			function logOut(){
				localStorage.removeItem('draftAuthToken');
				$location.path('/home');
			}
		}
})();
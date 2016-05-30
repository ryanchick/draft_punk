(function(){
	angular
		.module('draftApp')
		.directive('draftNavbar',function(){
			return {
				restrict: 'E',
				templateUrl: 'site/partials/draftNavbar.html',
				controller: 'NavbarCtrl as ctrl'
			};
		});

	angular
		.module('draftApp')	
		.controller ('NavbarCtrl', NavBarCtrl);

		function NavBarCtrl($location){
			navbarVm = this;

			//variables
			

			//function bindings
			navbarVm.route 	  = route;
			navbarVm.loggedIn = loggedIn;
			navbarVm.logOut   = logOut;

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

			function logOut(){
				localStorage.removeItem('draftAuthToken');
				$location.path('/home');
			}
		}
})();
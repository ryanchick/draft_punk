(function(){
	angular
		.module('draftApp')
		.controller('HomeCtrl', HomeCtrl);

		function HomeCtrl($http, $location){
			var homeVm = this;

		
			//variables
			if (localStorage.user != undefined){
				var user = JSON.parse(localStorage.user);
				homeVm.username = user.username;
			}

			//function bindings
			homeVm.route = route;

			//functions
			function route(path){
				$location.path('/' + path);
			}

		}


})();
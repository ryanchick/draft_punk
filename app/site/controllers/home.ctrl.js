(function(){
	angular
		.module('draftApp')
		.controller('HomeCtrl', HomeCtrl);

		function HomeCtrl($http, $location){
			var homeVm = this;

			//variables
			homeVm.userId = 1;

			//function bindings
			homeVm.route = route;

			//functions
			function route(path){
				$location.path('/' + path);
			}

		}


})();
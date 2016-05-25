(function(){
	'use strict';

	angular
		.module('draftApp',['ngRoute', 'ngAnimate']);

	angular
		.module('draftApp')
		.config(function($routeProvider, $httpProvider){
			$routeProvider
				.when('/home',{
					templateUrl: 'site/partials/home.html',
					controller: 'HomeCtrl as ctrl'
				})
				.when('/login',{
					templateUrl: 'site/partials/login.html',
					controller: 'LoginCtrl as ctrl'
				})
				.when('/user',{
					templateUrl: 'site/partials/login.html',
					controller: 'LoginCtrl as ctrl'
				})
				.when('/user/:username',{
					templateUrl: 'site/partials/user.html',
					controller: 'UserCtrl as ctrl'
				})
				.when('/stats',{
					templateUrl: 'site/partials/stats.html',
					controller: 'StatsCtrl as ctrl',
					resolve: {
						stats: function($http){
							return $http.get('/api/stats');
						}
					}
				})
				.when('/draft/:leagueId',{
					templateUrl: 'site/partials/draft.html',
					controller: 'DraftCtrl as ctrl',
					resolve:{
						stats:function($http){
							return $http.get("api/draft/init");
						}
					}
				})
				.when('/review/:leagueId',{
					templateUrl: 'site/partials/review.html',
					controller: 'ReviewCtrl as ctrl'
				})
				.otherwise({
					redirectTo: '/home'
				})

				$httpProvider.interceptors.push(function(){
	    			return {
	            		request: function(config) {
	                		return config;
	            		},
	            		response: function(response) {
	              		  var auth_token = response.headers('authentication');
	                		if(localStorage.authToken == undefined && auth_token != null){
	                				localStorage.authToken = auth_token;
	                		}
	                		return response;
	            		}
	    			}
				});
		});

		
})();
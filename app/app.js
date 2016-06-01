(function(){
	'use strict';

	angular
		.module('draftApp',['ngRoute', 'nvd3']);

	angular
		.module('draftApp')
		.config(function($routeProvider, $httpProvider){
			$routeProvider
				.when('/home',{
					templateUrl: 'site/partials/home.html',
					controller: 'HomeCtrl as ctrl',
					resolve:{
						demo: function($http,playerSrv){
							if(playerSrv.stats){
								return $http.get('api/stats/demo')
							} else{
								return playerSrv.getStats()
									.then(function(res){
										return $http.get('api/stats/demo');
									})
									.then(function(res){
										console.log(res);
										return res;
									})
							}
						},
						demo2: function($http){
							return $http.get('api/stats/demo2')
						},
						raptors: function($http){
							return $http.get('api/stats/raptors')
						}
					}
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
					controller: 'UserCtrl as ctrl',
					resolve: {
						user: function($http, $route){
							return $http.get('api/users/'+$route.current.params.username);
						}
					}
				})
				.when('/stats',{
					templateUrl: 'site/partials/stats.html',
					controller: 'StatsCtrl as ctrl',
					resolve: {
						stats: function(playerSrv){
							if(playerSrv.stats){
								return playerSrv.stats;
							}else{
								return playerSrv.getStats();
							}
						}
					}
				})
				.when('/player/:playerId',{
					templateUrl: 'site/partials/player.html',
					controller: 'PlayerCtrl as ctrl',
					resolve:{
						player: function($route, playerSrv){
							if(playerSrv.stats){
								var stats = playerSrv.stats;
								var id = $route.current.params.playerId;
								var l = stats.length;

								for (var i = 0; i < l; i ++){
									if (stats[i].id == id){
										return stats[i];
									}
								}
							}else{
								return playerSrv.getStats()
									.then(function(stats){
										var id = $route.current.params.playerId;
										var l = stats.length;

										for (var i = 0; i < l; i ++){
											if (stats[i].id == id){
												return stats[i];
											}
										}
									})
							}
						}
					}
				})
				.when('/draft',{
					templateUrl: 'site/partials/draftInfo.html',
					controller: 'DraftInfoCtrl as ctrl'
				})
				.when('/draft/:leagueId',{
					templateUrl: 'site/partials/draft.html',
					controller: 'DraftCtrl as ctrl',
					resolve:{
						stats:function($http){
							return $http.get("api/draft/init");
						},
						league:function($http, $route){
							return $http.get("api/league/"+$route.current.params.leagueId);
						}
					}
				})
				.when('/review/:leagueId',{
					templateUrl: 'site/partials/review.html',
					controller: 'ReviewCtrl as ctrl',
					resolve:{
						league:function($http, $route){
							return $http.get("api/league/"+$route.current.params.leagueId);
						}
					}
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
	                		if(localStorage.draftAuthToken == undefined && auth_token != null){
	                				localStorage.draftAuthToken = auth_token;
	                		}
	                		return response;
	            		}
	    			}
				});
		});

	angular
		.module('draftApp')
		.run(function($rootScope) {
    		$rootScope.$on('$stateChangeSuccess', function() {
	   			document.body.scrollTop = document.documentElement.scrollTop = 0;
			});
		})
		
})();
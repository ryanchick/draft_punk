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

		function NavBarCtrl($location,$route,$uibModal){
			navbarVm = this;

			//variables
			navbarVm.username = '';
			if(localStorage.draftUser){
				// console.log('user')
				navbarVm.username = JSON.parse(localStorage.draftUser).username;
				// console.log(navbarVm.username);
			}
			

			//function bindings
			navbarVm.route 	  = route;
			navbarVm.loggedIn = loggedIn;
			navbarVm.logOut   = logOut;
			navbarVm.isActive = isActive;
			navbarVm.loginOpen = loginOpen;
			navbarVm.draftOpen = draftOpen;

			//functions
			function route(path){
				$location.path('/' + path);

			}

			function loggedIn(){
				if (localStorage.draftAuthToken != undefined){
					if(localStorage.draftUser){
						// console.log('user')
						navbarVm.username = JSON.parse(localStorage.draftUser).username;
						// console.log(navbarVm.username);
					}
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
				localStorage.removeItem('draftUser');
				$location.path('/home');
			}

			function loginOpen(size) {

			    var modalInstance = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'site/partials/loginModal.html',
			      	controller: 'LoginModalCtrl as ctrl',
			      	size: "",
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	// $scope.selected = selectedItem;
			    }, function () {
			    	console.log('Modal dismissed at: ' + new Date());
			    });
			};
			function draftOpen(size) {
				if(isActive('draft')){
					return;
				}
			    var modalInstance = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'site/partials/draftModal.html',
			      	controller: 'DraftModalCtrl as ctrl',
			      	size: "",
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	// $scope.selected = selectedItem;
			    }, function () {
			    	console.log('Modal dismissed at: ' + new Date());
			    });
			};

		}

	angular.module('draftApp')
		.controller('LoginModalCtrl', LoginModalCtrl)

		function LoginModalCtrl($location, $http,$uibModalInstance) {

			var loginVm     	 = this;

			//if logged-in, proceed to user page
			if(localStorage.draftAuthToken){
				var user = JSON.parse(localStorage.draftUser);
				console.log(user);
				$location.path('user/' + user.username);
			}

			//function bindings
			loginVm.addUser 	 = addUser;
			loginVm.login   	 = login;
			loginVm.toggleCreate = toggleCreate;


			//functions
			function addUser(){
				var newUser = {
								username:loginVm.username,
								password:loginVm.password,
								firstName:loginVm.firstName,
								lastName:loginVm.lastName,
								email:loginVm.email
							  };
				$http.post('/api/auth/create', newUser)
					.then(function(res){
						loginVm.login();
					});
			}

			function login(){
				var loginInfo = {
								  username:loginVm.username,
								  password:loginVm.password
								};
				$http.post('/api/auth/login', loginInfo)
					.then(function(res){
						if (res.data.username){
							console.log('logged in');
							console.log(res.data);
							localStorage.draftUser = JSON.stringify(res.data);
							$uibModalInstance.close();
							$location.path('user/' + res.data.username)
						} else {
							console.log('invalid login');
						}
					});
			}

			function toggleCreate(){
				loginVm.create = !loginVm.create;
			}
		}

	
})();
(function(){
	angular
		.module('draftApp')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($http, $location){
		var loginVm     	 = this;

		//if logged-in, proceed to user page
		if(localStorage.authToken){
			var user = JSON.parse(localStorage.user);
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
			$http.post('/api/users', newUser)
				.then(function(res){
					console.log(res);
				});
		}

		function login(){
			var loginInfo = {
							  username:loginVm.username,
							  password:loginVm.password
							};
			$http.post('/api/users/login', loginInfo)
				.then(function(res){
					if (res.data.username){
						console.log('logged in');
						console.log(res.data);
						localStorage.user = JSON.stringify(res.data);
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
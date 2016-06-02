(function(){
	angular
		.module('draftApp')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($http, $location){
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
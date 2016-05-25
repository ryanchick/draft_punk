(function(){
	angular
		.module('draftApp')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($http){
		var loginVm     	 = this;

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
					console.log(res);
				});
		}

		function toggleCreate(){
			loginVm.create = !loginVm.create;
		}
				
	}

})();
(function(){
	angular
		.module('draftApp')
		.filter('abbrevNameFilter',abbrevNameFilter)
		
	function abbrevNameFilter() {
	   return function(name) {
	   		if(name){
		        var arr = name.split(" ")
				// console.log(arr)
				//Antetokounmpo exception
				if(arr[1]){
					if(arr[1].toLowerCase() == 'antetokounmpo'){
						return 'Giannis A.';
					}
				}
				arr[0] = arr[0].charAt(0) + ".";
				var abbr = arr.reduce(function(a,b){
					return a+" "+b;
				})
				return abbr;
			}
			return;
	    };
	};

	angular
		.module('draftApp')    
		.filter('digits', function () {
            return function (input, width, leadingChar) {
                leadingChar = leadingChar || '0';
                input = input + '';
                return input.length >= width ? input : new Array(width - input.length + 1).join(leadingChar) + input;
            }
        });


})();

// angular.module('insultApp').filter('titleCaseFilter', titleCaseFilter);
var express 	= require('express');
var models	 	= require('./models');
var app 		= express();
var port 		= 8080;

// var testobj = {firstName: "Brian"};

// models.Users.create(testobj).then(function(newObj){
// 	console.log(newObj);
// });

// models.Users.findAll().then(function(res){
// 		//findall returns an array of objects
// 		console.log(res[0].dataValues.teams);
// })

models.sequelize.sync().then(function(){
	app.listen(port,function(){
		console.log('Listening on http://localhost:%s',port);
		console.log('Stop Server With CTRL + C');
	});
});
var models = require("./models");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 80;

//app config
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:false}));
app.use(express.static(__dirname + './../app/'));


var authentication = require("./middleware/auth");

//route configuration
var user_routes = require('./routes/user_routes');
var stat_routes = require('./routes/stat_routes');
var league_routes = require('./routes/league_routes');
var draft_routes = require('./routes/draft_routes')
var init_routes = require('./routes/init_routes')
var auth_routes = require('./routes/auth_routes')

//set Routes
app.use('/api/users',authentication,user_routes);
app.use('/api/stats',stat_routes);
app.use('/api/league',league_routes);
app.use('/api/draft',draft_routes);
app.use('/api/init',init_routes);
app.use('/api/auth',auth_routes);

//test user table

// var testobj = {firstName: "Brian"};

// models.Users.create(testobj).then(function(newObj){
// 	console.log(newObj);
// });

// models.Users.findAll().then(function(res){
// 		//findall returns an array of objects
// 		console.log(res[0].dataValues.teams);
// })

//start server and database

models.sequelize.sync().then(function(){
	app.listen(PORT,function(){
		console.log('Listening on http://localhost: ' + PORT);
		console.log('Stop Server With CTRL + C');
	});
})




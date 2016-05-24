var models = require("./models");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = 8080;

//app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

//route configuration
var user_routes = require('./routes/user_routes');
var stat_routes = require('./routes/stat_routes');
var team_routes = require('./routes/team_routes');
var draft_routes = require('./routes/draft_routes')

//set Routes
app.use('/api/users',user_routes);
app.use('/api/stats',stat_routes);
app.use('/api/team',team_routes);
app.use('/api/draft',draft_routes);


//start server and database
models.sequelize.sync().then(function(){
	app.listen(PORT,function(){
		console.log('Listening on http://localhost: ' + PORT);
		console.log('Stop Server With CTRL + C');
	});
})
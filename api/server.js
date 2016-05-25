var models = require("./models");
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var fs = require("fs");
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
var init_routes = require('./routes/init_routes')

//set Routes
app.use('/api/users',user_routes);
app.use('/api/stats',stat_routes);
app.use('/api/team',team_routes);
app.use('/api/draft',draft_routes);
app.use('/api/init',init_routes)

//test user table

// var testobj = {firstName: "Brian"};

// models.Users.create(testobj).then(function(newObj){
// 	console.log(newObj);
// });

// models.Users.findAll().then(function(res){
// 		//findall returns an array of objects
// 		console.log(res[0].dataValues.teams);
// })

//DATA STUFF
var mode = 'PerGame';
var season = '2015-16';
var URL = 'http://stats.nba.com/stats/leaguedashplayerstats/?PerMode=' + mode + '&Season=' + season + '&Gamescope&PlayerExperience&PlayerPosition&StarterBench&MeasureType=Base&PlusMinus=N&PaceAdjust=N&Rank=N&SeasonType=Regular%20Season&Outcome&Location&Month=0&SeasonSegment&DateFrom&DateTo&OpponentTeamId=0&VsConference&VsDivision&GameSegment&Period=0&LastNGames=0'
var positions = [];
// var file = fs.readFileSync(file_name+'.txtc');

console.log('data')

positions = JSON.parse(fs.readFileSync(__dirname + '/positions.txt','utf8'))
console.log(typeof positions)
console.log(positions[0])


// start server and database
// models.sequelize.sync().then(function(){
// 	app.listen(PORT,function(){
// 		console.log('Listening on http://localhost: ' + PORT);
// 		console.log('Stop Server With CTRL + C');
// 	});
// })

var playerStats = [];

app.get('/stats',function(req,res){
	request(URL, function (error, response, body) {
		if(error){
			console.log(error)
		}else{
			
			body = JSON.parse(body)
			// console.log(body.resultSets[0].rowSet)
			for(var i = 0; i< body.resultSets[0].rowSet.length; i++){
				var player = body.resultSets[0].rowSet[i];
				// console.log(player);

				//find position from text file
				var __position = '';
				for(var j = 0; j < positions.length; j++){
					// console.log()
					if (positions[j].nba_id == player[0]){
						__position = positions[j].position;
					}
				}
				var urlname = player[1].toLowerCase().replace(/[.']/g,'').replace(/\s/g,"_");
				// console.log(urlname)
				var url = "http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/" + urlname +".png"
				// console.log(url)
				var __player = {
					name: player[1],
				    nba_id: player[0],
				    team: player[3],
					age: player[4],
				    img_url: url,
				    position: __position,
				    min: player[9],
				    pts: player[29],
				    ast: player[22],
				    reb: player[21],
				    stl: player[24],
				    blk: player[25],
				    tov: player[23],
				    fgm: player[10],
				    fga: player[11],
				    fg3m: player[13],
				    fg3a: player[14],
				    ftm: player[16],
				    fta: player[17],
				    dd2: player[31],
				    td3: player[32],
				    games_played: player[5]
				}
				playerStats.push(__player)
				models.Stats.create(__player)
					.then(function(ret){
						// console.log(ret.dataValues)
					})

			}
			console.log(playerStats.length)
			console.log(playerStats[1])
			// res.json(playerStats)
		}
	});
})


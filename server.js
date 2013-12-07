var express = require("express");
var fs = require("fs");
var exec = require("child_process").exec;
var cons = require('consolidate')

console.log("Starting");

var app = express();
app.engine('dust',cons.dust);

app.use(app.router);
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.get("/", function(request, response){
        var child = exec("cat ./fake.data", function (error, stdout, stderr) {
            var tempData = stdout.toString().split('\n')[1];
            var temp = parseInt(tempData.split('=')[1]) / 1000;
            response.render('index', {
		    temperature: temp
	     });
        });
});

app.listen(8000);

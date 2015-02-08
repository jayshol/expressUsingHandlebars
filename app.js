var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var hbs= exphbs.create({
	extname :".hbs",
	defaultLayout :"main.hbs",
	helpers :{
		calculateAvg : function(student, options){
			var htmlString = " ";
			for(var i=0;i<student.length;i++){
				var objArr = student[i].score;
				var avg = objArr.reduce(function(a,b){ return a + b; }) / objArr.length;
				htmlString += "<li><p>" + student[i].firstName + " " + student[i].lastName + " - " + avg + "</p></li>";
			}
			return htmlString;
		}
	}	
});

var dataObject = [

						{
							firstName : "Sam",
							lastName : "Michaels",
							score : [20,34,40,67]
						},
						{
							firstName : "Bruce",
							lastName : "Kasparov",
							score : [33,45,68,90]
						},
						{
							firstName : "Zoe",
							lastName : "Jackson",
							score : [45,67,89,90]
						}
]; 

function getData(){
	return {locations : [  {
							name : "Los Angeles",
							weather: "sunny"
					},
					{
						name : "Portland",
						weather: "cloudy"
					},
					{
						name: "Memphis",
						weather:"Partly cloudy"
					}
	]}

}

app.use(function(req, res, next){
	if(!res.locals.partials) { 
		res.locals.partials = {};
	}
	res.locals.partials.weather = getData();
	next();
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");

app.get("/", function(req, res){
	res.render('report', {title:"Report Card", student: dataObject});
});

app.get("/new", function(req, res){
	/* overriding layout  */
	res.render('report', {title:"New Layout", student: dataObject, layout: "new.hbs"});
})

app.listen(9000, function(){
	console.log("listening at 9000");
});
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

//mongoose.connect('mongodb://localhost/travelplan');
mongoose.connect('mongodb://admin:admin>@ds157487.mlab.com:57487/travelplan');


var destinationSchema = new mongoose.Schema({

	city: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'City'
		}
	}

});

var citySchema = new mongoose.Schema({
	thecity: String,
	coolplaces: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Coolplace'
		}
	]
});

var coolplaceSchema = new mongoose.Schema({
	theplacename: String,
	theplaceaddress: String
});


var Destination = mongoose.model('Destination', destinationSchema);
var City = mongoose.model('City', citySchema);
var CoolPlace = mongoose.model('Coolplace', coolplaceSchema)


app.get('/', function(req, res){
	City.find({}).populate('coolplaces').exec(function(err, theCities){
		if(err){
			console.log(err);
		} else {
			res.render('homepage', {City: theCities})
		}
	});
});

app.get('/test', function(req, res){
	City.findOne({'thecity': 'Auckland'}).populate('coolplaces').exec(function(err, thecoolplace){
		if(err){
			console.log(err);
		} else {
			res.send(thecoolplace);
		}
	});
});

app.post('/testpost', function(req, res){
	City.findOne({'thecity': req.body.thecity}).populate('coolplaces').exec(function(err, thecoolplace){
		if(err){
			console.log(err);
		} else {
			//res.send(thecoolplace);
			// res.render('test', {thecoolplace: thecoolplace});
			res.send(thecoolplace);
		}
	});
});


app.post('/hoy', function(req, res){
	console.log('hhh' + req.body.thecity);


})

app.post('/', function(req, res){
	console.log(req.body);
	res.send(req.body);
});

app.post('/addcity', function(req, res){
	var newCity = {
		thecity: req.body.city
	}

	City.create(newCity, function(err, createdCity){
		res.redirect('/');
	});
});



app.post('/addcoolplace', function(req, res){
	console.log(req.body.cityname + 'citynameeeeeeeeeeeeeeeeeeeeeo');
	var thePlace = {
		theplacename: req.body.placename,
		theplaceaddress: req.body.placeaddress
	}
	var theCity = {
		cityname: req.body.cityname
	}

	var Ccity = theCity.toString();
	console.log(req.body.cityname + 'CCCCCC')

	CoolPlace.create(thePlace, function(err, newCoolplace){
		if(err){
			console.log(err);
		} else {
			City.findOne({thecity: req.body.cityname }, function(err, newPlaceCity){
				console.log('-----------' + newPlaceCity);
				if(err){
					console.log(err);
				} else {
					newPlaceCity.coolplaces.push(newCoolplace);
					newPlaceCity.save();
					res.redirect('back');
				}
			});
		}
	});
});

app.listen('3000', function(req, res){
	console.log('server started at PORT 3000');
});
 var car = [
	'Mercedes',
	'Volvo',
	'BMW',
	'Porsche'
];

var phone = [
	'Samsung',
	'Nokia',
	'Iphone'
]


// car = new Array('mercedes');
// phone = new Array('Nokia');


populateSelect();

$(function(){

	$('#addCityBTN').click(function(){
		newCity();
	});

	$('#cat').change(function(){
		populateSelect();
	});


	$('#fromcity').change(function(){
		popFromPlaces();
	});

	$('#fromplace').change(function(){
		generateFromMap();
	});

	$('#toplace').change(function(){
		generateToMap();
	});

	$('#tocity').change(function(){
		popToPlaces();
	});


	$('#distanceBTN').click(function(){
		distanceShow();
	});



	//test
	$('#fromplace').change(function(){
		console.log($('#fromplace').val());
	});


});


function populateSelect(){
	cat = $('#cat').val();
	$('#item').html('');

	// if(cat === 'car'){
	// 	cars.forEach(function(theCars){
	// 		$('#item').append('<option>' + theCars + '</option>');
	// 	});
	// }

	// if(cat === 'phone'){
	// 	phones.forEach(function(thePhones){
	// 		$('#item').append('<option>' + thePhones +'</option>');
	// 	});
	// }

	eval(cat).forEach(function(t){
		$('#item').append('<option>' + t + '</option>');
	});
}

function fillupPlaces(){
	var $coolplaces = $('#coolplace');

	$.ajax({
		url: '/test',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(typeof data)
			data.coolplaces.forEach(function(thecoolplaces){
				$coolplaces.append('<option>' + thecoolplaces.theplacename + '</option>');
			});
		}
	});
}



function distanceShow(){
	$('.googlemaps2').remove();
	$('.fromplacegooglemap').remove();
	$('.toplacegooglemap').remove();

	var theDistance = {
		fromplace: $('#fromplace').val(),
		toplace:  $('#toplace').val()
	}



	var code1 = '<iframe class="googlemaps2" width="100%" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDt1ugu_lMqa5w_awcfwZ26ubW2EjvhY0M&origin=';
	var code2 = $('#fromplace').val();
	var code3 = '&destination=' + $('#toplace').val();
	var code4 = '&mode=driving' + '"' + ' allowfullscreen></iframe>';
	var code5 = code1 + code2 + code3 + code4;

	$('#toshowmap').append(code5);

	$.ajax({
		type: 'POST',
		url: '/mapgoogle',
		data: JSON.stringify(theDistance),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			console.log(JSON.stringify(data.distance.text + ' ' + data.duration.text));
			$('#distanceTime').append('<h1>' + JSON.stringify(data.distance.text + ' ' + data.duration.text) + '</h1>')
		},
		error: function(error){
			console.log(error);
		}
	});
}



function popFromPlaces(){
	$('.fromThePlace').remove();
	var thedata = {
		'thecity': $('#fromcity').val()
	};



	$.ajax({
		type: 'POST',
		url: '/testpost',
		data: JSON.stringify(thedata),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			data.coolplaces.forEach(function(place){
					var code1 = '<option class="fromThePlace" value="';
					var code2 = place.googleValidSearch + '">';
					var code3 = place.theplacename + '</option>';
					var code4 = code1 + code2 + code3;
				$('#fromplace').append(code4);
				
			});
		},
		error: function(){
			alert('No data');
		}
	});
}

function popToPlaces(){
	$('.toThePlace').remove();
	var thedata = {
		'thecity': $('#tocity').val()
	};


	$.ajax({
		type: 'POST',
		url: '/testpost',
		data: JSON.stringify(thedata),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			data.coolplaces.forEach(function(place){
				$('#toplace').append('<option class="toThePlace">' + place.theplacename + '</option>');
				
			});
		},
		error: function(){
			alert('No data');
		}
	});
}


function generateFromMap(){
	$('.fromplacegooglemap').remove();
	var fromPlace = $('#fromplace').val();

	var code1 = '<iframe class="fromplacegooglemap" width="100%" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDt1ugu_lMqa5w_awcfwZ26ubW2EjvhY0M&q=';
	var code2 = fromPlace + '"';
	var code4 = ' allowfullscreen> </iframe>'
	var allcode = code1 + code2 + code4;
	$('#themap1').append(allcode);
}

function generateToMap(){
	$('.toplacegooglemap').remove();
	var toPlace = $('#toplace').val();

	var code1 = '<iframe class="toplacegooglemap" width="100%" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDt1ugu_lMqa5w_awcfwZ26ubW2EjvhY0M&q=';
	var code2 = toPlace + '"';
	var code4 = ' allowfullscreen> </iframe>'
	var allcode = code1 + code2 + code4;
	$('#themap2').append(allcode);
}

function newCity(){

	var createCity = {
		cityNew: $('#cityInput').val() 
	}

	var theCity = JSON.stringify(createCity);

	$.ajax({
		url: '/addcity',
		type: 'POST',
		data: theCity,
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			alert(JSON.stringify(data));
		},
		error: function(err){
			alert(err);
		}
	});

	$('#cityInput').val('');
}
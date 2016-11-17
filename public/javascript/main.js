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



	$('#cat').change(function(){
		populateSelect();
	});

	$('#cities').change(function(){
		popPlaces();
	});

	$('#coolplace').change(function(){
		mapReveal();
	});


	$('#fromcity').change(function(){
		popFromPlaces();
	});

	$('#tocity').change(function(){
		popToPlaces();
	});


	$('#distanceBTN').click(function(){
		distanceShow();
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


function popPlaces(){
	$('.dank').remove();
	var thedata = {
		'thecity': $('#cities').val()
	};


	$.ajax({
		type: 'POST',
		url: '/testpost',
		data: JSON.stringify(thedata),
		contentType: 'application/json',
		dataType: 'json',
		success: function(data){
			data.coolplaces.forEach(function(place){
				$('#coolplace').append('<option class="dank">' + place.theplacename + '</option>');
				
			});
		},
		error: function(){
			alert('No data');
		}
	});
}


function mapReveal(){
	$('.googlemap').remove();
	var loc = $('#coolplace').val();

	var code1 = '<iframe class="googlemap" width="100%" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDt1ugu_lMqa5w_awcfwZ26ubW2EjvhY0M&q=';
	var code2 = loc + '"';
	var code4 = ' allowfullscreen> </iframe>'
	var allcode = code1 + code2 + code4;
	$('#showmap').append(allcode);

	}


function distanceShow(){
	$('.googlemaps2').remove();

	var code1 = '<iframe class="googlemaps2" width="100%" height="600" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDt1ugu_lMqa5w_awcfwZ26ubW2EjvhY0M&origin=';
	var code2 = $('#fromplace').val();
	var code3 = '&destination=' + $('#toplace').val();
	var code4 = '&mode=driving' + '"' + ' allowfullscreen></iframe>';
	var code5 = code1 + code2 + code3 + code4;

	$('#toshowmap').append(code5);
	
	
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
				$('#fromplace').append('<option class="fromThePlace">' + place.theplacename + '</option>');
				
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
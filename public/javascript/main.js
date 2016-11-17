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
		theAjax();
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


function theAjax(){
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
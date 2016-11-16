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
$(function() {
	getLocation();
	$('.about').on('click', showAbout);
	$('.close').on('click', hideAbout);
});

function showAbout() {
	$('.overlay').fadeIn('slow');
}

function hideAbout() {
	$('.overlay').fadeOut('slow');
}

function getUsersMapCode(position) {
	var result = '';
	var isocode = '';
	var tc = iso2ccode(isocode);
	var y = position.coords.latitude;
	var x = position.coords.longitude;

	for(var run = 1; run <= 2; run++) if ((run == 1) == (tc == ct))
	{
		for (var ct = 0; ct < MAX_CCODE; ct++) {
			var results = master_encode(y, x, ct);
			if (results.length)
				console.log(ccode2iso(results[0][1], 2));
			if (run == 1 || results.length) {
				result += '<p><h2>' + fullname(ct)
				if(results.length)
					result += '<small> (' + ccode2iso(results[0][1], 2) + ')</small>';
				result +='</h2>';
				for(var i = 0; i < results.length; i++) {
					result += '<b>' + results[i][0] + '</b><br>';
				}
			}
		}
	}
	$("#results").slideUp('slow');
	$("#results")[0].innerHTML = result;
	$("#results").slideDown('slow');
}

function getLocation() {
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
		navigator.geolocation.getCurrentPosition(
			getUsersMapCode,
			displayError,
			{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		);
	}
	else {
		$("#results")[0].innerHTML = "Geolocation is not supported by this browser";
	}
}

function displayError(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  $("#results")[0].innerHTML = "Location Error: " + errors[error.code];
}

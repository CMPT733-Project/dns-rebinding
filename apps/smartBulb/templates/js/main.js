let button = document.querySelector('.btn');
let background = document.querySelector('body');
//let audio = document.querySelector('#audio');

const config = {
	on: background.classList.add('on'),
	off: background.classList.remove('on')
};

/*
button.onclick = function(){
	//background.classList.toggle('on');
	//audio.play();
	renderStatus();
}
*/

function renderStatus() {
	currentvalue = document.getElementById("stat").value;
	if (currentvalue == "off"){
	    document.getElementById("stat").value="on";
	    background.classList.remove('on');
	}else{
	    document.getElementById("stat").value="off";
	    background.classList.add('on');
	}
	console.log("rendering: ", currentvalue);
}

function updateStatus() {
	$.get('/password', function(data) {
		$.post('/temperature?value=' + currentvalue + '&password=' + data.password, function(data) {
			console.debug('response from the server: ');
			console.debug(data);
			renderStatus();
		});
	});
}

button.addEventListener("click", updateStatus);


function pollStatus() {
	$.get('/temperature', function(data) {
		if (!data.hasOwnProperty('temperature')) {
			console.error('server does not send the correct data');
		} else {
			let newTemperature = data.temperature;
			if (newTemperature !== Number(range.value)) {
				console.log('newTemperature is [' + newTemperature + '], range.value is [' + range.value + ']');
				console.log('set temperature to ' + newTemperature + ' as informed by the server.');
				range.value = newTemperature;
			}
			renderStatus();
		}
	});
}

setInterval(pollStatus, 1000);





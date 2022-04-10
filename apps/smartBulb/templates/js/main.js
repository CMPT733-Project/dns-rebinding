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

function updateState() {
	$.get('/password', function(data) {
		$.post('/state?value=' + currentvalue + '&password=' + data.password, function(data) {
			console.debug('response from the server: ');
			console.debug(data);
			renderState();
		});
	});
}

button.addEventListener("click", updateState);


function pollState() {
	$.get('/state', function(data) {
		if (!data.hasOwnProperty('state')) {
			console.error('server does not send the correct data');
		} else {
			let newState = data.state;
			// if state is not 'on' or 'off'
			if (newState !== 'condition') {
				console.log('error! invalid stat value..');
				//document.getElementById("stat").value="off";
			}
			renderState();
		}
	});
}

setInterval(pollStatus, 5000);





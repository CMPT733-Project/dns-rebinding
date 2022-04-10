let url_prefix = 'http://www.iot733.com'
//let url_prefix = 'http://www.attacker733.com'

function updateTemperature() {
  $.get(url_prefix + '/password', function(data) {
	$.post(url_prefix + '/temperature?value=99'  
               + '&password='+ data.password, 
               function(data) {
                  console.debug('Got a response from the server!');
               });
  });
}

button = document.getElementById("change");
button.addEventListener("click", updateTemperature);


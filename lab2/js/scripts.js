// Location
var lat = 0
var long = 0

// Weather Data 
var cityName = ""
var windSpeed = ""
var windDir = ""
var weatherDesc = ""
var humidity = ""
var currentTemp = ""


var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

navigator.geolocation.getCurrentPosition(function( position ) {
	lat = position.coords.latitude;
	long = position.coords.longitude;

	var currentWeatherEndpoint = "http://api.openweathermap.org/data/2.5/weather?lat="+Math.round(lat)+"&lon="+Math.round(long)+"&units=imperial&APPID=cf202a9a7ce705018f58aad72b27ec76";
	var forecastEndpoint = "http://api.openweathermap.org/data/2.5/forecast?lat="+Math.round(lat)+"&lon="+Math.round(long)+"&units=imperial&APPID=cf202a9a7ce705018f58aad72b27ec76";

	var today = new Date();

	// Populate the Weather
	$.ajax({
	  	dataType: "jsonp",
	  	url: currentWeatherEndpoint,

	  	success: function(data) {
	  		var cityName = data.name;
	  		var windSpeed = data.wind.speed;
	  		var windDir = data.wind.deg;
	  		var weatherDesc = data.weather[0].description;
	  		var humidity = data.main.humidity;
	  		var currentTemp = data.main.temp;

	  	  	var newHtml = "<li id=\"location\"></p>"+cityName+"</p></li>";	

	  	  	newHtml += "<li class=\"date\"></p>" + days[today.getDay()]+" "+today.getDate()+", "+months[today.getMonth()]+"</p></li>";
	  	  	newHtml += "<li class=\"currentWeather\"><p>"+Math.round(currentTemp)+"<sup>o</sup>F | " + weatherDesc + "</p></li>";
	  	  	newHtml += "<li><p>Wind Speed: "+windSpeed+" MPH</p></li>";
	  	  	newHtml += "<li><p>Humidity: "+Math.round(humidity)+"%</p></li>";
	  	  	newHtml += "";

	  		$("#weather").append(newHtml);	
	    }
	});

	// Populate the forecast
	$.ajax({
	  	dataType: "jsonp",
	  	url: forecastEndpoint,

	  	success: function(data) {


	  		$.each(data.list, function(key,val) {3
				var tempMax = val.main.temp_max;
				var tempMin = val.main.temp_min;
				var thisDate = val.dt_txt;


				var thisDayNum = thisDate.substring(9,10)
				var thisDayEng = days[thisDayNum];

				var thisTime = thisDate.substring(10,13)
				var thisTimeModifier = "am";
				if (thisTime > 12) {
					thisTimeModifier = "pm";
					thisTime -= 12;
				} 

				thisTime += thisTimeModifier;

				var prettyDate = thisDate.substring(5).substring(0,5) + " | " + thisTime;
				var prettyDate = prettyDate.replace("-","/");

	  			var newHtml = "<li><div class=\"forecast\"><div class=\"day\">";
	  			newHtml += "<p>"+ thisDayEng + " - "+ prettyDate +"</p></div><div class=\"forecast-content\">";
	  			newHtml += "<p><strong>" + Math.round(tempMax)+"<sup>o</sup>F</strong> - <span class=\"silva\">"+Math.round(tempMin)+"<sup>o</sup>F</span></p></div></div></li>";
	  			
	  			$("#forecast").append(newHtml);
	  			ticker()
	  		});
	    } 
	});
});

function ticker() {
	$("#forecast").animate({
	scrollTop:$("#forecast")[0].scrollHeight - $("#forecast").height()
	},2000)
}

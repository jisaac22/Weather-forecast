//added variables to call from html
var tempDisplay = document.getElementById("temp");
var windDisplay = document.getElementById("wind");
var humidityDisplay = document.getElementById("humidity");
var uvDisplay = document.getElementById("uv");
var currentcityDisplay = document.getElementById("currentCity");
var searchBtn = document.getElementById("searchBtn");
var APIKey = "b51fcaf152e8e2ce22a35e2bab44157b";
var city = document.querySelector(".city");
var futureDates = document.getElementById("futureForecast");
// added function to display weather for searched city
function todayWeather(){
 fetch ("http://api.openweathermap.org/geo/1.0/direct?q="+city.value+"&limit=5&appid="+APIKey+"")
    .then(function (response){
      return response.json();
  })
    .then(function (data){
     console.log(data) 
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+data[0].lat+"&lon="+data[0].lon+"&units=imperial&appid="+APIKey+"")
    .then (function (response){
       return response.json();
   })
    .then(function(data){
        console.log(data)
        tempDisplay.textContent = "Temp: " + data.current.temp + " F";
        windDisplay.textContent = "Wind: " + data.current.wind_speed +" MPH"
        humidityDisplay.textContent = "Humidity: " + data.current.humidity + " %";
        uvDisplay.textContent = "UV Index: " + data.current.uvi;
// added function to pull 5 days of weather
    for ( i = 0; i < 5; i++){
        var futureTemp = document.createElement("p");
        var futureWind = document.createElement("p");
        var futureHumidity = document.createElement("p");
        futureTemp.textContent = "Temp: " + data.daily[i].temp.day + " F";
        futureHumidity.textContent = "Humidity " + data.daily[i].feels_like.humidity + " %";
        futureWind.textContent = "Wind " + data.daily[i].weather.wind_speed + " MPH";
        futureDates.appendChild(futureTemp);
        futureDates.appendChild(futureWind);
        futureDates.appendChild(futureHumidity);
    }
    });
     
});
};


// added event listener for button
searchBtn.addEventListener("click", function(){
    todayWeather()
})




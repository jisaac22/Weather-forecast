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
var currentCity = document.getElementById("currentCity")
var date = moment().format("MMM Do YYYY")

// added function to display weather for searched city
function todayWeather(){
 fetch ("https://api.openweathermap.org/geo/1.0/direct?q="+city.value+"&limit=5&appid="+APIKey+"")
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
        currentCity.textContent = "Current City: " + city.value + " " + date;
        localStorage.setItem("city", JSON.stringify(city.value));
 //added if statements to color code uv index 
        if (data.current.uvi == 0 && data.current.uvi < 2 ){
            uvDisplay.classList.add("favorable")
        } else if (data.current.uvi > 2 && data.current.uvi < 5 ){
            uvDisplay.classList.add("moderate")
        } else if (data.current.uvi > 5){
            uvDisplay.classList.add("severe")
        };
// added function to pull 5 days of weather
    for ( i = 0; i < 5; i++){
       var futureForecastEL = document.getElementById("futureForecast").children;
       console.log(futureForecastEL);
    
       var currentDay = futureForecastEL[i];
       console.log(currentDay);
       
    //    var currentDayDate = currentDay.children[0];
       var futureTemp = currentDay.children[1];    
       var futureHumidity = currentDay.children[2];
       var futureWind = currentDay.children[3];

        futureTemp.textContent = "Temp: " + data.daily[i].temp.day + " F";
        futureHumidity.textContent = "Humidity " + data.daily[i].humidity + " %";
        futureWind.textContent = "Wind " + data.daily[i].wind_speed + " MPH";


      
        
    }
    });
     
});
};

function renderLast(){
   
    var recentCity = JSON.parse(localStorage.getItem("city"));
    var citySearched = document.getElementById("recent-city")
    citySearched.textContent = recentCity
}
// added event listener for button
searchBtn.addEventListener("click", function(){
    todayWeather()
    renderLast()
});

renderLast()




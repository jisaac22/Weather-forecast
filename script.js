//added variables to call from html
var tempDisplay = document.getElementById("temp");
var windDisplay = document.getElementById("wind");
var humidityDisplay = document.getElementById("humidity");
var uvDisplay = document.getElementById("uv");
var currentcityDisplay = document.getElementById("currentCity");
var searchBtn = document.getElementById("searchBtn");
var APIKey = "b51fcaf152e8e2ce22a35e2bab44157b";
var city = document.querySelector(".city");
// added function to display weather for searched city
function todayWeather(){
fetch ("https://api.openweathermap.org/data/2.5/weather?q="+city.value+"&units=imperial&appid=b51fcaf152e8e2ce22a35e2bab44157b")

  .then(function (response){
      return response.json();
  })
 .then(function (data){
     console.log(data)
    tempDisplay.textContent = "Temp: " + data.main.temp +" F";
    windDisplay.textContent = "Wind: " + data.wind.speed +" MPH"
    humidityDisplay.textContent = "Humidity: " + data.main.humidity + " %";
    uvDisplay.textContent = "UV Index: " + data.main.temp;
});
};
// added function to pull 5 days of weather
function futureWeather(){
    fetch("https://api.openweathermap.org/data/2.5/forecast/daily?id="+city.value+"&units=imperial&mode=json&cnt=5&appid=b51fcaf152e8e2ce22a35e2bab44157b")

    .then(function (response){
     return response.json();
    })
    .then(function (data){
        console.log(data)
    })
};
// added event listener for button
searchBtn.addEventListener("click", function(){
    todayWeather()
    futureWeather()
})




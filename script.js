
var tempDisplay = document.getElementById("temp");
var windDisplay = document.getElementById("wind");
var humidityDisplay = document.getElementById("humidity");
var uvDisplay = document.getElementById("uv");
var currentcityDisplay = document.getElementById("currentCity");
var searchBtn = document.getElementById("searchBtn");
var APIKey = "b51fcaf152e8e2ce22a35e2bab44157b";
var city = document.querySelector(".searchInput");
var futureDates = document.getElementById("futureForecast");
var currentCity = document.getElementById("currentCity")
var date = moment().format("MMM Do YYYY")
var img = document.createElement("img");
var src = document.getElementById("icon")
let currentDate = document.querySelector('.currentDate')

// added function to display weather for searched city
function getWeather(){
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
        currentWeather(data)
        fiveDayWeather(data)

        });

    })};


function currentWeather(data){
    let date2 = moment.unix(data.current.dt).format("MMM Do")
    tempDisplay.textContent = "Temp: " + data.current.temp + " F";
    windDisplay.textContent = "Wind: " + data.current.wind_speed +" MPH"
    humidityDisplay.textContent = "Humidity: " + data.current.humidity + " %";
    uvDisplay.textContent = "UV Index: " + data.current.uvi;
    currentCity.textContent = "Current City: " + city.value;
    currentDate.textContent = date2
    img.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
    src.appendChild(img);
    localStorage.setItem("city", JSON.stringify(city.value));

    if (data.current.uvi > 0 && data.current.uvi < 2) {
        uvDisplay.classList.add("favorable")
    } else if (data.current.uvi > 2 && data.current.uvi < 5) {
        uvDisplay.classList.add("moderate")
    } else if (data.current.uvi > 5) {
        uvDisplay.classList.add("severe")
}}

function fiveDayWeather(data){
    for ( i = 1; i < 6; i++){
    console.log(data.daily[i])
    console.log(data.daily[i].temp.day)
    var div = document.createElement('div')
    div.classList.add('box')
    div.textContent = data.daily[i].temp.day
    futureDates.appendChild(div)
    var futureImg = document.createElement('img')
    futureImg.src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
    div.appendChild(futureImg)
    var h3 = document.createElement('h3')
    h3.textContent = moment.unix(data.daily[i].dt).format("MMM Do")
    div.appendChild(h3)
    }
}

function renderLast(){
   
    var recentCity = JSON.parse(localStorage.getItem("city"));
    var citySearched = document.querySelector(".recent-city")
    citySearched.textContent = recentCity
}
// added event listener for button
searchBtn.addEventListener("click", function(){
  getWeather()
  renderLast()
});

renderLast()



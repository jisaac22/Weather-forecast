let tempDisplay = document.getElementById("temp");
let windDisplay = document.getElementById("wind");
let humidityDisplay = document.getElementById("humidity");
let uvDisplay = document.getElementById("uv");
let currentcityDisplay = document.getElementById("currentCity");
let searchBtn = document.getElementById("searchBtn");
let APIKey = "b51fcaf152e8e2ce22a35e2bab44157b";
let city = document.querySelector(".searchInput");
let futureDates = document.getElementById("futureForecast");
let currentCity = document.getElementById("currentCity")
let date = moment().format("MMM Do YYYY")
let img = document.getElementById('icon')
// let src = document.getElementById("icon")
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
    localStorage.setItem("city", JSON.stringify(city.value));

    if (data.current.uvi > 0 && data.current.uvi < 2) {
        uvDisplay.classList.add("favorable")
    } else if (data.current.uvi > 2 && data.current.uvi < 5) {
        uvDisplay.classList.add("moderate")
    } else if (data.current.uvi > 5) {
        uvDisplay.classList.add("severe")
    }

    
}

let futureDay1 = document.getElementById('box1')
let futureDay2 = document.getElementById('box2')
let futureDay3 = document.getElementById('box3')
let futureDay4 = document.getElementById('box4')
let futureDay5 = document.getElementById('box5')

function fiveDayWeather(data){
    for ( i = 1; i < 6; i++){
    console.log(data.daily[i])
    console.log(data.daily[i].temp.day)
    
    let futureDays = document.getElementById(`futureDay${i}`)
    let futureDayTemp = document.getElementById(`futureTemp${i}`)
    let futureDayImage = document.getElementById(`futureImg${i}`)
    futureDays.textContent = moment.unix(data.daily[i].dt).format("MMM Do")
    futureDayTemp.textContent = "Temp: " +  data.daily[i].temp.day
    futureDayImage.src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
    }
}

const city1 = document.querySelector('.city1')
const city2 = document.querySelector('.city2')
const city3 = document.querySelector('.city3')
const city4 = document.querySelector('.city4')
const city5 = document.querySelector('.city5')
var recentCities = [];

function renderLast(){
    let citySearched = city.value
    recentCities.unshift(citySearched)
    city1.textContent = recentCities[0]
    city2.textContent = recentCities[1]
    city3.textContent = recentCities[2]
    city4.textContent = recentCities[3]
    city5.textContent = recentCities[4]
    if ( recentCities.length === 5 ){
        recentCities.pop()
    }
}

let hidden = document.querySelector('.hide')
// added event listener for button
searchBtn.addEventListener("click", function(){
  hidden.classList.remove('hide')
  getWeather()
  renderLast()
});

renderLast()



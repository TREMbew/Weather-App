// Tutorial by http://youtube.com/CodeExplained
// api key : a721f06f4775d274b876f3c4c9d67785

//Select Elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

//App data 
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//App const and var
const KELVIN = 273;
//API key
const key = "a721f06f4775d274b876f3c4c9d67785";

//Check if browser supports geolocation 
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else{
    notificationElement.style.display= "block";
    notificationElement.innerHTML = "<p>Browser don't support Geolocation</p>";
}

//Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//Show error
function showError(error){
    notificationElement.style.display= "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//Get weather from API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
            .then(function(data){
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
                .then(function(){
                    displayWeather();
                });               
}

//Display weather 
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F conversion and click 
function cToF(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", () => {
    if (weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = cToF(weather.temperature.value);
        fahrenheit = Math.round(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});



















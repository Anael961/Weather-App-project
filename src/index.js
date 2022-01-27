function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#placeholder-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather.description;
}

function searchcity(city) {
  let apiKey = "400257005fd84b55505351ed05840af2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function locationInput(event) {
  event.preventDefault();
  let city = document.querySelector("#input-value").value;
  searchcity(city);
}

function searchLocation(position) {
  let apiKey = "400257005fd84b55505351ed05840af2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function toFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#placeholder-temp");
  fahrenheitTemp.innerHTML = 25;
}
function toCelcius(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#placeholder-temp");
  celciusTemp.innerHTML = -3;
}

//day and time
let h3 = document.querySelector("h3");
let currentTime = new Date();
h3.innerHTML = formatDate(currentTime);

//city search input
let form = document.querySelector("#search-input");
form.addEventListener("submit", locationInput);

// current location
let currentlocation = document.querySelector("#current-location-button");
currentlocation.addEventListener("click", getCurrentLocation);

// default city
searchcity("Toronto");

//fahrenheit to celcius
let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", toFahrenheit);

//celcius to fahrenheit
let celciusLink = document.querySelector("#celcius-temp");
celciusLink.addEventListener("click", toCelcius);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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

function formatforecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
            <div class="weather-forecast-date">${formatforecastDay(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="45"
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span>
              <div class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}° </div>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "400257005fd84b55505351ed05840af2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#placeholder-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celciusTemp = response.data.main.temp;

  getForecast(response.data.coord);
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
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let maintemp = document.querySelector("#placeholder-temp");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  maintemp.innerHTML = Math.round(fahrenheitTemp);
}
function toCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let maintemp = document.querySelector("#placeholder-temp");
  maintemp.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

//city search input
let form = document.querySelector("#search-input");
form.addEventListener("click", locationInput);

// current location
let currentlocation = document.querySelector("#current-location-button");
currentlocation.addEventListener("click", getCurrentLocation);

//celcius to fahrenheit
let celciusLink = document.querySelector("#celcius-temp");
celciusLink.addEventListener("click", toCelcius);

//fahrenheit to celcius
let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", toFahrenheit);

// default city
searchcity("Toronto");

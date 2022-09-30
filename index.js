function changeDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minute = `0${minutes}`;
  }
  let dayDate = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayDate];
  return `${day} ${hour}:${minutes}`;
}

function weatherUpdate(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function newCity(city) {
  let apiKey = "0c22eee41ca4fa953376041bc23d61ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherUpdate);
}

function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  newCity(city);
}
function getCity(position) {
  let apiKey = "0c22eee41ca4fa953376041bc23d61ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherUpdate);
}

function updateCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCity);
}

let dateStamp = document.querySelector("#date");
let newDate = new Date();
dateStamp.innerHTML = changeDate(newDate);

let sendSearch = document.querySelector("#searchBar");
sendSearch.addEventListener("submit", searching);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", updateCity);
newCity("Vancouver");

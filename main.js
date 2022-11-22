let weather;

async function loadWeather(city) {
  document.querySelector("#spinner").classList.remove("d-none");
  document.querySelector("#spinner").classList.add("d-block");

  document.querySelector("#container-weather").classList.remove("d-block");
  document.querySelector("#container-weather").classList.add("d-none");

  setTimeout(displayWeather, 2000);
  let res = await fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`);
  weather = await res.json();

  console.log(weather);
}

const searchValue = document.querySelector("#search-bar");
searchValue.addEventListener("change", (e) => {
  loadWeather(searchValue.value.toLowerCase());
});

// const searchBar = () => {
//   loadWeather(searchValue.value.toLowerCase());
// };

const displaySky = () => {
  const skyCoverIconEL = document.querySelector("#sky-cover-icon");
  const weatherSky = weather.currentConditions.comment.toLowerCase();

  if (weatherSky === "clear" || weatherSky === "sunny") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-sun"></i>`;
  } else if (weatherSky === "cloudy") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-clouds"></i>`;
  } else if (weatherSky === "partly cloudy" || weatherSky === "clear with periodic clouds" || weatherSky === "mostly cloudy") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-cloud-sun"></i>`;
  } else if (weatherSky === "light rain showers") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-cloud-drizzle"></i>`;
  } else if (weatherSky === "snow showers") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-cloud-snow"></i>`;
  } else if (weatherSky === "rain") {
    skyCoverIconEL.innerHTML = `<i class="bi bi-cloud-rain"></i>`;
  } else {
    skyCoverIconEL.innerHTML = `<i class="bi bi-cloud-lightning-rain"></i>`;
  }
};

const displayWeather = () => {
  document.querySelector("#container-weather").classList.add("border", "rounded");

  document.querySelector("#container-weather").classList.remove("d-none");
  document.querySelector("#container-weather").classList.add("d-block");

  document.querySelector("#spinner").classList.add("d-none");
  document.querySelector("#spinner").classList.remove("d-block");

  const tempEl = document.querySelector("#temp");
  const precipitationEl = document.querySelector("#precipitation");
  const humidityEl = document.querySelector("#humidity");
  const windEL = document.querySelector("#wind");

  const cityEL = document.querySelector("#city");
  const cityDateHourEL = document.querySelector("#city-date-hour");
  const citySkyCoverEL = document.querySelector("#city-sky-cover");

  tempEl.innerHTML = `<span class="fs-1">${weather.currentConditions.temp.c}</span><span>ºC</span>`;
  precipitationEl.innerHTML = `Precipitation: ${weather.currentConditions.precip}</span>`;
  humidityEl.innerHTML = `Humidity: ${weather.currentConditions.humidity}`;
  windEL.innerHTML = `Wind: ${weather.currentConditions.wind.km} km/h</span>`;
  cityEL.innerHTML = `${weather.region}`;
  cityDateHourEL.innerHTML = `${weather.currentConditions.dayhour}`;
  citySkyCoverEL.innerHTML = `${weather.currentConditions.comment}`;

  displaySky();
};

loadWeather("lisbon");

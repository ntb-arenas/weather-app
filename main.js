let weather;

async function loadWeather(city) {
  document.querySelector("#spinner").classList.remove("d-none");
  document.querySelector("#spinner").classList.add("d-block");

  document.querySelector("#container-weather").classList.remove("d-block");
  document.querySelector("#container-weather").classList.add("d-none");

  let res = await fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`);
  weather = await res.json();

  setTimeout(displayWeather, 500);

  console.log(weather);
}

const searchValue = document.querySelector("#search-bar");
searchValue.addEventListener("change", (e) => {
  if (searchValue.value === "") {
    loadWeather("lisbon");
  } else {
    loadWeather(searchValue.value.toLowerCase());
  }
});

const displaySky = () => {
  const skyCoverIconEL = document.querySelector("#sky-cover-icon");

  skyCoverIconEL.innerHTML = `<img src="${weather.currentConditions.iconURL}" class="img-fluid" alt="">`;
};

const displayDailyForecast = () => {
  const htmlString = weather.next_days
    .map((weather) => {
      return `
        <div class="col-1 border rounded py-3"> 
          <p class="text-center">${weather.day}</p>
          <div class="text-center">
            <img src="${weather.iconURL}" class="img-fluid" alt="" />
          </div>
          <div class="text-center">
            <span>${weather.max_temp.c}º</span>
            <span>${weather.min_temp.c}º</span>
          </div>
        </div>
        `;
    })
    .join("");

  document.querySelector("#daily-forecast").innerHTML = htmlString;
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
  displayDailyForecast();
};

loadWeather("lisbon");

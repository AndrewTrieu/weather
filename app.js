const apiKey = "YOUR_API_KEY";
const weatherForm = document.querySelector("#weather-form");
const weatherInfo = document.querySelector("#weather-info");

fetchCurrent = async () => {
  const current = {};
  await fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      current["city"] = data.city;
      current["state"] = data.region;
      current["country"] = data.country_name;
    })
    .catch((error) => {
      console.log(error);
      weatherInfo.innerHTML = "<p>An error occurred</p>";
    });
  return current;
};

fetchCountry = async (country_code) => {
  let country;
  await fetch(`https://restcountries.com/v3.1/alpha/${country_code}`)
    .then((response) => response.json())
    .then((data) => {
      country = data[0];
    })
    .catch((error) => {
      console.log(error);
      weatherInfo.innerHTML = "<p>An error occurred</p>";
    });
  return country.name.common;
};

fetchLocation = async (city, region, country_name, apiKey) => {
  let location;
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${region},${country_name}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      location = data[0];
    })
    .catch((error) => {
      console.log(error);
      weatherInfo.innerHTML = "<p>An error occurred</p>";
    });
  if (!location) {
    location = { lat: 0, lon: 0 };
  } else {
    location["country"] = await fetchCountry(location.country);
  }
  return location;
};

fetchWeather = async (city, region, country_name, apiKey) => {
  const location = await fetchLocation(city, region, country_name, apiKey);
  let weather;
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      weather = data;
    })
    .catch((error) => {
      console.log(error);
      weatherInfo.innerHTML = "<p>An error occurred</p>";
    });
  if (location.state)
    weather[
      "destination"
    ] = `${location.name}, ${location.state}, ${location.country}`;
  else weather["destination"] = `${location.name}, ${location.country}`;
  return weather;
};

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  let country = document.querySelector("#country").value;

  if (city === "") {
    const current = await fetchCurrent();
    city = current.city;
    state = current.state;
    country = current.country;
  }
  const weather = await fetchWeather(city, state, country, apiKey);

  if (weather.coord.lat === 0 && weather.coord.lon === 0) {
    weatherInfo.innerHTML = `
    <div class="card-header">
        <h2>Location not found!</h2>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-3 text-center">
                <img src="https://icons.veryicon.com/png/o/commerce-shopping/jkd_wap/no-result.png" alt="Not found" width="100" height="100">
            </div>
        </div>
    </div>
    `;
  } else {
    weatherInfo.innerHTML = `
    <div class="card-header">
        <h2>Weather in ${weather.destination}</h2>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-3 text-center">
                <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather icon" width="100" height="100">
            </div>
            <div class="col-md-9">
                <p>Weather: ${weather.weather[0].main} (${weather.weather[0].description})</p>
                <p>Temperature: ${weather.main.temp}°C</p>
                <p>Feels like: ${weather.main.feels_like}°C</p>
                <p>Pressure: ${weather.main.pressure}hPa</p>
                <p>Humidity: ${weather.main.humidity}%</p>
                <p>Visibility: ${weather.visibility}m</p>
                <p>Wind speed: ${weather.wind.speed}m/s</p>
                <p>Cloudiness: ${weather.clouds.all}%</p>
            </div>
        </div>
    </div>
    `;
  }
});

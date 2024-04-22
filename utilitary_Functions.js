// import { configDotenv } from "dotenv";
// import './node_modules/dotenv/config';
// require('dotenv').config();

// variables
const searchField = document.querySelector("#SearchZone");
const sendButton = document.querySelector(".send");
const diagnosticExplanation = document.querySelector(".diagnostic_explanation");

const temperatureIcon = document.querySelector("#icon");
const weatherIndicator = document.querySelector("#weather");
const diagnosticVerdict = document.querySelector(".diagnostic_verdict");

const temperature = document.querySelectorAll(".temperature");
const temperature2 = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const precipitation = document.getElementById("precipitaion");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const lightIntensity = document.getElementById("light_intensity");

const weather = document.getElementById("weather");
const cityInfo = document.getElementById("cityInfo");
const HistoryDisplay = document.querySelector(".historyDisplay");
const noDataStatement = document.getElementById("noData");
const atmos_pressure = document.getElementById("atmos_pressure");
//Fin variables

function infoDisplay(
  temp,
  humi,
  windInt,
  visib,
  weatheForecast,
  pressure,
  city
) {
  try {
    parseFloat(temp);
    var temp = Math.round(temp - 273.15); // Kelvin to celcius

    temperature[1].textContent = `${temp} °C`;
    temperature[0].textContent = `${temp} °C`;
    humidity.innerText = `${humi} %`;
    wind.innerText = `${windInt} m/s`;
    visibility.innerText = `${visib} m`;
    weather.innerText = `${weatheForecast}`;
    atmos_pressure.innerText = `${pressure} hPa`;
    cityInfo.innerText = `${city}`;
  } catch (error) {
    console.error(error);
  }
}

export function getWeather(city) {
  return new Promise((resolve, reject) => {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "45539c1454mshe2988be1e97c2cfp173326jsn950d6de2fb8f",
        "X-RapidAPI-Host": "weather-api138.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        console.log(
          `Le problème est au niveau de getWeather() ; l'API retourne le code suivant : ${error} , veuillez consulter l'index.`
        );
        reject(error);
      });
  });
}

// fonction permettant de creer l'historique
// Le tableau qui acceuile les noms doit être déclaré l'exterieur de la fonction à l'exterieur de la fonction
export function RecordInCityHistory(citiesArray, cityName) {
  citiesArray.push(cityName);
  const historyContainer = document.createElement("ul");
  HistoryDisplay.appendChild(historyContainer);

  for (let i = 0; i < citiesHistory.length; i++) {
    const li = document.createElement("li");
    li.textContent = citiesHistory[i];
    historyContainer.appendChild(li);
  }
}

export async function cityWeatherDisplay(city) {
  searchField.textContent = ""; // pour reinitialiser le input
  try {
    await getWeather(city).then((cityWeatherData) => {
      /**debugg */ console.log(`voila les données ${cityWeatherData}`);
      infoDisplay(
        cityWeatherData.main.temp,
        cityWeatherData.main.humidity,
        cityWeatherData.wind.speed,
        cityWeatherData.visibility,
        cityWeatherData.weather[0].main,
        cityWeatherData.main.pressure,
        city
      );
    });
  } catch (error) {
    /**debug */ console.error(error);
  }
}

/** Utiliser ce bout de code dans la fonction cityWeatherDisplay 
 * 
 * // modification du background et des icone en fonction de la prévision
        switch (response2.weather[0].main) {
          case "clouds":
            // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
            temperatureIcon.setAttribute(
              "src",
              "assets/icones/icons8-rain-96.png"
            );
            weatherIndicator.setAttribute("src");
            break;
          case "clear":
            // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
            temperatureIcon.setAttribute(
              "src",
              "assets/icones/icons8-summer-96.png"
            );
            break;
        }
        
        
        il s'agit du code permettant de modifier le background / */

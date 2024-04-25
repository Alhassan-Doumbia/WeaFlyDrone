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

const temperature = document.getElementsByClassName("temperature");
const mainTemperature = document.getElementById("main_Temp");
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
const background = document.getElementById("background");

const verdict = document.querySelector(".diagostic_explanation");
//Fin variables

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

      /** debug */ console.log(
        `modification du Background , type : ${cityWeatherData.weather[0].main}`
      );
      switch (cityWeatherData.weather[0].main) {
        case "clouds":
          background.style.backgroundImage =
            "url('assets/images/cloudy_sky.jpg')";
          temperatureIcon.setAttribute(
            "src",
            "assets/icones/icons8-rain-96.png"
          );
          break;
        case "clear":
          background.style.backgroundImage =
            "url('assets/images/clear_sky.jpg')";
          temperatureIcon.setAttribute(
            "src",
            "assets/icones/icons8-summer-96.png"
          );
          break;
      }
    });
  } catch (error) {
    /**debug */ console.error(error);
  }
}

/**Fonction de chatGPT
 * L'API que j'utiliserai est lente asf ,mais bon c'est pour les test
 */

// Comme paramètre , il recevra les données de temperatures etc et il est intégré à infoDisplay plus haut
function getVerdict(temp, humi, windInt, visib, weatheForecast, pressure) {
  let needed_content = `You are a weather AI designed for drone enthusiasts. You provide recommendations on whether it\'s safe to fly based on data, offering clear explanations for your decisions. what do you think of those  conditions ? ${humi},${temp},${windInt},${visib},${weatheForecast},${pressure},try to write your diagnostic in 4line max`;
  return new Promise((resolve, reject) => {
    const url = "https://open-ai21.p.rapidapi.com/chatgpt";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key":
          "45539c1454mshe2988be1e97c2cfp173326jsn950d6de2fb8f" /**Eviter d'utiliser l'API sauf en demo */,
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: needed_content,
          },
        ],
        web_access: false,
      }),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Réponse d'API non réussie : ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.log(
          `il ya une erreur au niveau de la fonction de GPT  : ${error}`
        );
        reject(error);
      });
  });
}

async function infoDisplay(
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

    await getVerdict(
      temp,
      humi,
      windInt,
      visib,
      weatheForecast,
      pressure,
      city
    ).then((response) => {
      /**debug */ console.log(JSON.stringify(response));
      verdict.innerHTML = response.result;
    });

    /**Animation
     */
    // temperature[0].classList.remove("temperatureSideOut");
    // temperature[0].classList.add("temperatureSideIn");
  } catch (error) {
    console.error(error);
  }
}

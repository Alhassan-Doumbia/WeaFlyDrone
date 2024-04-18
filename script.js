import {
  getWeather,
  getWeatherByCords,
  getCurrentPositionWeather,
  RecordInCityHistory,
  currentWeatherDisplay,
} from "./utilitary_Functions.js";
// variables
const searchField = document.querySelector("#SearchZone");
const sendButton = document.querySelector(".send");
const diagnosticExplanation = document.querySelector(".diagnostic_explanation");

const temperatureIcon = document.querySelector("#icon");
const weatherIndicator = document.querySelector("#weather");
const diagnosticVerdict = document.querySelector(".diagnostic_verdict");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const precipitation = document.getElementById("precipitaion");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const lightIntensity = document.getElementById("light_intensity");

const weather = document.getElementById("weather");
const cityInfo = document.getElementById("cityInfo");
const HistoryDisplay = document.querySelector(".historyDisplay");
const noDataStatement = document.getElementById("noData");
//Fin variables

//currentPositon weather function to get  the user current position  and then
//dislay the user current position Weather Inof

function infoDisplay(temp, humi, precip, windInt, visib, lightInt) {
  temperature.innerText = temp;
  humidity.innerText = humi;
  precipitation.innerText = precip;
  wind.innerText = windInt;
  visibility.innerText = visib;
  lightIntensity.innerText = lightInt;

  // on ameliorera l'affichage au niveau de l'interface plus tard
}

// Manipulatio de l'historique sinon on passera notre temps à reinitialiser l'historique
let citiesHistory = [];
//Tableau de l'historique

window.addEventListener("load", () => {
  currentWeatherDisplay();
});

//le code à partir du else ligne 142

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("la bouton envoyé a été clické ");
  let searchFieldContent = document.querySelector("#SearchZone").value; // J'avais mis value. Faudrit que je recherche comment recuperer le contenu d'un input d etype text
  if (searchFieldContent === "") {
    currentWeatherDisplay();
  } else {
    //à factoriser
    try {
      const response2 = getWeather(searchFieldContent);
      searchField.value = ""; //reinitialiser l'input
      /*debug*/ console.log(
        "le champs est vidé, prêt pour une nouvelle requête"
      );
      if (citiesHistory.length === 0) {
        noDataStatement.style.display = "block";
      } else {
        RecordInCityHistory(citiesHistory, searchFieldContent);
        noDataStatement.style.display = "none";
        infoDisplay(
          response2.main.temp,
          response2.main.humidity,
          "???",
          response2.wind.speed,
          response2.main.humidity,
          response2.main.visibility
        );
        // modification du background et des icone en fonction de la prévision
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
        //on va commencer à display les informations maintenant

        weather.innerText = response2.weather[0].main;
        cityInfo.innerText = `${response2.sys.name},${response2.sys.country}`;
      }
      // à factoriser
    } catch (error) {
      console.log(
        `erreur au niveau du code principal ,l'erreur retourné est la suivante : ${error}`
      );
    }
  }
});

// event si on presse entrer , on lance une requête

searchField.addEventListener("keydown", function (e) {
  if (e.keycode === 13) {
    // debug feature
    console.log("le bouton entrer a été pressé ");
    e.preventDefault();
    let searchFieldContent = document.querySelector("#searchZone").value;
    if (searchFieldContent === "") {
      currentWeatherDisplay();
    } else {
      //à factoriser
      const response = getWeather(searchFieldContent);
      searchField.textContent = "";
      //on va commencer à display les informations maintenant
      infoDisplay(
        response.main.temp,
        response.main.humidity,
        "???",
        response.wind.speed,
        response.main.humidity,
        response.main.visibility
      );
      // modification du background et des icone en fonction de la prévision
      switch (response.weather[0].main) {
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

      weather.innerText = response.weather[0].main;
      cityInfo.innerText = `${response.sys.name},${response.sys.country}`;
    }
    // à factoriser
  }
  // création de l'historique+verification
  if (citiesHistory.length === 0) {
    noDataStatement.style.display = "block";
  } else {
    RecordInCityHistory(citiesHistory, searchFieldContent);
    noDataStatement.style.display = "none";
  }
});

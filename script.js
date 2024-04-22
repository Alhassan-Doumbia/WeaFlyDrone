import { cityWeatherDisplay } from "./utilitary_Functions.js";

// variables
const searchField = document.querySelector("#SearchZone");
const sendButton = document.querySelector(".send");
const diagnosticExplanation = document.querySelector(".diagnostic_explanation");

const temperatureIcon = document.querySelector("#icon");
const weatherIndicator = document.querySelector("#weather");
const diagnosticVerdict = document.querySelector(".diagnostic_verdict");

const temperature = document.getElementsByClassName("temperature");
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
//Fin variables

//currentPositon weather function to get  the user current position  and then
//dislay the user current position Weather Inof

function infoDisplay(temp, humi, windInt, visib) {
  temperature[1].textContent = temp;
  temperature[0].textContent = `${temp}°C`;
  humidity.innerText = humi;
  wind.innerText = windInt;
  visibility.innerText = visib;
}

// Manipulatio de l'historique sinon on passera notre temps à reinitialiser l'historique
let citiesHistory = [];
const historyContainer = document.createElement("ul");
//Tableau de l'historique

window.addEventListener("load", () => {
  cityWeatherDisplay("Abidjan");
});

//le code à partir du else ligne 142

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("la bouton envoyé a été clické ");
  let searchFieldContent = document.querySelector("#SearchZone").value; // J'avais mis value. Faudrit que je recherche comment recuperer le contenu d'un input d etype text
  if (searchFieldContent === "") {
    try {
      cityWeatherDisplay("Abidjan");
    } catch (error) {
      /**JE VAIS APPLIQUER ICI MA NOUVELLE FONCTION */
    }
  } else {
    //à factoriser
    try {
      cityWeatherDisplay(searchFieldContent);
      let li = document.createElement("li");
      li.textContent = searchFieldContent;
      citiesHistory.push(li);
      searchField.value = ""; //reinitialiser l'input
      /*debug*/ console.log(
        "le champs est vidé, prêt pour une nouvelle requête"
      );
      if (citiesHistory.length === 0) {
        noDataStatement.style.display = "block";
      } else {
        noDataStatement.style.display = "none";
        HistoryDisplay.appendChild(historyContainer);
        for (let i = 0; i < citiesHistory.length; i++) {
          historyContainer.appendChild(citiesHistory[i]);
        }
      }
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
      cityWeatherDisplay("Abidjan");
    } else {
      cityWeatherDisplay(searchFieldContent);
      let li = document.createElement("li");
      li.textContent = searchFieldContent;
      citiesHistory.push(li);
      searchField.value = ""; //reinitialiser l'input
      /*debug*/ console.log(
        "le champs est vidé, prêt pour une nouvelle requête"
      );

      if (citiesHistory.length === 0) {
        noDataStatement.style.display = "block";
      } else {
        noDataStatement.style.display = "none";
        HistoryDisplay.appendChild(historyContainer);
        for (let i = 0; i < citiesHistory.length; i++) {
          historyContainer.appendChild(citiesHistory[i]);
        }

        // création de l'historique+verification
        if (citiesHistory.length === 0) {
          noDataStatement.style.display = "block";
        } else {
          noDataStatement.style.display = "none";
        }
      }
    }
  }
});

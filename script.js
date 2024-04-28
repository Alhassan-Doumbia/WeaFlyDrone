/*
  Created by Doumbia Al Hassan, AKA Caprisunpapy
  Abidjan, Côte d'Ivoire
*/

import { cityWeatherDisplay } from "./utilitary_Functions.js";
// variables
const SearchInput = document.querySelector("#SearchZone");
const sendButton = document.querySelector(".send");

const HistoryDisplay = document.querySelector(".historyDisplay");
const noDataStatement = document.getElementById("noData");
//Fin variables

// History
let citiesHistory = [];
const historyContainer = document.createElement("ul");

window.addEventListener("load", () => {
  cityWeatherDisplay("Abidjan");
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("la bouton envoyé a été clické ");
  let SearchInputContent = document.querySelector("#SearchZone").value;
  if (SearchInputContent === "") {
    try {
      cityWeatherDisplay("Abidjan");
    } catch (error) {
      console.error(
        "Erreur lors de l'affichage de la météo pour la ville par defaut(Abidjan):",
        error
      );
    }
  } else {
    try {
      cityWeatherDisplay(SearchInputContent);
      let li = document.createElement("li");
      li.textContent = SearchInputContent;
      citiesHistory.push(li);
      SearchInput.value = "";
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
      console.error(
        "Erreur lors de l'affichage de la météo pour la ville recherchée:",
        error
      );
    }
  }
});

SearchInput.addEventListener("keydown", function (e) {
  if (e.keycode === 13) {
    // debug feature

    console.log("le bouton entrer a été pressé ");
    e.preventDefault();
    let SearchInputContent = document.querySelector("#searchZone").value;
    if (SearchInputContent === "") {
      try {
        cityWeatherDisplay("Abidjan");
      } catch (error) {
        console.error(
          "Erreur lors de l'affichage de la météo pour la ville par defaut(Abidjan):",
          error
        );
      }
    } else {
      try {
        cityWeatherDisplay(SearchInputContent);
        let li = document.createElement("li");
        li.textContent = SearchInputContent;
        citiesHistory.push(li);
        SearchInput.value = "";
        /*debug*/ console.log(
          "le champs est vidé, prêt pour une nouvelle requête"
        );
      } catch (error) {
        console.error(
          "Erreur lors de l'affichage de la météo pour la ville recherchée:",
          error
        );
      }

      if (citiesHistory.length === 0) {
        noDataStatement.style.display = "block";
      } else {
        noDataStatement.style.display = "none";
        HistoryDisplay.appendChild(historyContainer);
        for (let i = 0; i < citiesHistory.length; i++) {
          historyContainer.appendChild(citiesHistory[i]);
        }
        if (citiesHistory.length === 0) {
          noDataStatement.style.display = "block";
        } else {
          noDataStatement.style.display = "none";
        }
      }
    }
  }
});

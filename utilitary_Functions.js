// import { configDotenv } from "dotenv";
// import './node_modules/dotenv/config';
// require('dotenv').config();

function infoDisplay(temp, humi, precip, windInt, visib, lightInt) {
  temperature.innerText = temp;
  humidity.innerText = humi;
  precipitation.innerText = precip;
  wind.innerText = windInt;
  visibility.innerText = visib;
  lightIntensity.innerText = lightInt;
}
export async function getWeather(city) {
  const url = `https://open-weather13.p.rapidapi.com/city/${city}/FR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "45539c1454mshe2988be1e97c2cfp173326jsn950d6de2fb8f", //process.env.API_KEY, // Utliser le fichier.env
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    // console.log(response); debug
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(
      `le problème est au niveau de getWeather() ; l'API retourne le code suivant : ${error} , veuillez consulter l'index.`
    );
    return error;
  }
}

export async function getWeatherByCords(lat, long) {
  const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "45539c1454mshe2988be1e97c2cfp173326jsn950d6de2fb8f", //process.env.API_KEY,
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    //handlig of the error
  }
}

export function getCurrentPositionWeather() {
  if ("geolocation" in navigator) {
    try {
      /*Debug*/ console.log("recherche de la longitude et de la lattitude ");
      navigator.geolocation.getCurrentPosition((positon) => {
        getWeatherByCords(positon.coords.latitude, positon.coords.longitude);
      }),
        (error) => {
          console.log(
            `il ya une erreur ${error.code}, qui signifie ${error.message}`
          );
        };
    } catch (error) {
      console.log(error);
      //Va integrer des données dummy dans l'interface si il ya erreur
    }
  } else {
    console.log("l'API geolocation n'est pas disponible sur votre naviigteur");
    alert("la géolocalisation n'est pas disponible sur votre ordinateur ");
    // L'on ferra afficher des données Dummy
  }
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

export function currentWeatherDisplay() {
  /*debug*/ console.log("affichage de la météo selon la position géographique");
  const response = getCurrentPositionWeather(); // fonctionne
  // const weatherObject = JSON.parse(response); //pour transformer en objet
  // en fait on est pas obligé de transformer en objet
  //on va commencer à display les informations maintenant

  /*debug*/ console.log(`voilà les données ${response}`);

  weather.innerText = response.weather[0].main;
  cityInfo.innerText = `${response.sys.name},${response.sys.country}`;
  infoDisplay(
    response.main.temp,
    weatherObject.main.humidity,
    "???",
    response.wind.speed,
    response.main.humidity,
    response.main.visibility
  );
  // modification du background et des icone en fonction de la prévision
  switch (response.weather[0].main) {
    case "clouds":
      // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
      temperatureIcon.setAttribute("src", "assets/icones/icons8-rain-96.png");
      weatherIndicator.setAttribute("src");
      break;
    case "clear":
      // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
      temperatureIcon.setAttribute("src", "assets/icones/icons8-summer-96.png");
      break;
  }
}

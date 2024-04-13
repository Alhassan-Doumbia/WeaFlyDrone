require("dotenv").config(); // pour pouvoir utiliser le fichier secret.env

async function getWeather(city) {
  const url = `https://open-weather13.p.rapidapi.com/city/${city}/FR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY, // Utliser le fichier.env
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(
      `le problème est au niveau de getWeather() ; l'API retourne le code suivant : ${error} , veuillez consulter l'index.`
    );
    return error;
  }
}

async function getWeatherByCords(lat, long) {
  const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
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

function getCurrentPositionWeather() {
  if ("geolocation" in navigator) {
    try {
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
    // L'on ferra afficher des données Dummy
  }
}

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

const weather=document.getElementById("weather");
const cityInfo=document.getElementById('cityInfo');
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
window.addEventListener("load", () => {
  const response=getCurrentPositionWeather();
  const weatherObject = JSON.parse(response); //pour transformer en objet

  //on va commencer à display les informations maintenant
  infoDisplay(
    weatherObject.main.temp,
    weatherObject.main.humidity,
    "???",
    weatherObject.wind.speed,
    weatherObject.main.humidity,
    weatherObject.main.visibility
  );
// modification du background et des icone en fonction de la prévision
switch(weatherObject.weather[0].main){
    case "clouds":
        // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
        temperatureIcon.setAttribute('src',"assets/icones/icons8-rain-96.png");
        weatherIndicator.setAttribute('src',)
    break;
    case "sunny":
        // document.body.style.backgroundImage="url('../assets/images/Cloudy) à utiliser plus tard
        temperatureIcon.setAttribute('src',"assets/icones/icons8-summer-96.png");
    break;
}

weather.innerText=weatherObject.weather[0].main;
cityInfo.innerText=`${weatherObject.sys.name},${weatherObject.sys.country}`

// je vais reflechir à mettre en place une fonction pour faire tout ça ; comme ça quand je ferrai l'interraction avec le champs de recherche , je coderai pas des max 
});

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
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      try {
        console.log("Recherche de la longitude et de la latitude");
        navigator.geolocation.getCurrentPosition(
          (positon) => {
            const weatherData = getWeatherByCords(
              positon.coords.latitude,
              positon.coords.longitude
            );
            resolve(weatherData);
          },
          (error) => {
            console.log(
              `Il y a une erreur ${error.code}, qui signifie ${error.message}`
            );
            reject(error);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
        // Va intégrer des données dummy dans l'interface si il y a une erreur
      }
    } else {
      console.log(
        "L'API geolocation n'est pas disponible sur votre navigateur"
      );
      alert("La géolocalisation n'est pas disponible sur votre ordinateur");
      reject("Géolocalisation non disponible");
      // L'on fera afficher des données Dummy
    }
  });
}

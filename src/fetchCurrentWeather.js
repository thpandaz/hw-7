import { URL } from "node:url";
import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {
  // I think it would be more readable to just use a template string than to construct the URL using this class, but the assignment says to use it
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  // add search params
  [
    ['latitude', latitude],
    ['longitude', longitude],
    ['hourly', 'temperature_2m'],
    ['temperature_unit', 'fahrenheit']
  ]
  .forEach(([name, val]) => url.searchParams.append(name, val));

  return fetch(url.toString())
    .then(r => r.ok ? Promise.resolve(r) : Promise.reject(new Error(r.statusText)))
    .then(r => r.json())
    .then(json => {return { time: json.hourly.time, temperature_2m: json.hourly.temperature_2m }});
}
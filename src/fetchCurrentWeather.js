import { URL } from "node:url";
import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`)
      .then(r => r.ok ? Promise.resolve(r) : Promise.reject(new Error(r.statusText)))
      .then(r => r.json())
      .then(json => {return { time: json.hourly.time, temperature_2m: json.hourly.temperature_2m }});
}
    
// export async function fetchCurrentWeather(longitude, latitude) {
//     const searchURL = new URL('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+ longitude+'&hourly=temperature_2m&temperature_unit=fahrenheit');
//     const respone = await fetch(searchURL.toString());

//     if(respone.ok){
//         const data = await respone.json()
//         if(data.hasOwnProperty('error')){
//             return new Error(data.reason);
//         }
//         return {
//             time: data.time,
//             temperature_2m: data.temperature_2m
//         }

//     }else{
//         return new Error(respone.status)
//     }

// }

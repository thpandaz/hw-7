import { URL } from "node:url";
import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  const searchURL = new URL("https://geocode.maps.co/search");
  searchURL.searchParams.append("q", query);
  return fetch(searchURL.toString())
    .then(respone => respone.ok ? respone.json() : new Error(respone.status))
    .then(data => data.length === 0 ? new Error("No results found for query."): {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
          });
}


// export async function fetchLongitudeAndLatitude(query) {
//   const searchURL = new URL("https://geocode.maps.co/search");
//   searchURL.searchParams.append("q", query);
//   const respone = await fetch(searchURL.toString());
//   if(respone.ok){

//     const data = await respone.json()
//     if(data.length === 0){return new Error("No results found for query.");}

//     return {
//       lat: parseFloat(data[0].lat),
//       lon: parseFloat(data[0].lon)
//     }
//   }else{
//     return new Error(respone.status);
//   }
  

// }

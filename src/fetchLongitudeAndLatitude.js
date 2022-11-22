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
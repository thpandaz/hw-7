import { URL } from "node:url";
import fetch from "node-fetch";

export async function fetchUniversities(query) {
  const searchURL = new URL(" https://university-web-api.herokuapp.com/search");
  searchURL.searchParams.append("name", query);
  return fetch(searchURL.toString())
          .then(respone => respone.ok ? respone.json() : new Error(respone.statusText))
          .then(data => data.map(university => university.name));
}
